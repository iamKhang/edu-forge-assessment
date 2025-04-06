import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestAttemptDto } from './dto/create-test-attempt.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TestAttemptsService {
  constructor(private prisma: PrismaService) {}

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async findOne(id: string) {
    return this.prisma.testAttempt.findUnique({
      where: { id },
      include: {
        test: true,
        answers: true,
        scoreDetails: true,
      },
    });
  }

  async getTestResult(attemptId: string) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            testQuestions: {
              include: {
                question: {
                  include: {
                    options: true,
                    referenceAnswers: true,
                  },
                },
              },
            },
          },
        },
        answers: true,
        scoreDetails: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Test attempt not found');
    }

    if (!attempt.submittedAt) {
      throw new BadRequestException('Test attempt not submitted yet');
    }

    // Check if review is allowed
    const canReview = attempt.test.allowReview;

    // Basic result information
    const result = {
      id: attempt.id,
      testId: attempt.testId,
      testTitle: attempt.test.title,
      testType: attempt.test.testType,
      attemptNumber: attempt.attemptNumber,
      totalScore: attempt.totalScore,
      maxScore: attempt.test.maxScore,
      startedAt: attempt.startedAt,
      submittedAt: attempt.submittedAt,
      canReview,
      questions: [],
    };

    // If review is not allowed, return basic information only
    if (!canReview) {
      return result;
    }

    // If review is allowed, include detailed question information
    const questionOrder = attempt.questionOrder as string[];
    const questions = [];

    for (const questionId of questionOrder) {
      const testQuestion = attempt.test.testQuestions.find(
        (tq) => tq.questionId === questionId
      );

      if (!testQuestion) continue;

      const answer = attempt.answers.find((a) => a.questionId === questionId);
      const scoreDetail = attempt.scoreDetails.find((s) => s.questionId === questionId);

      questions.push({
        id: questionId,
        question: testQuestion.question,
        maxScore: testQuestion.maxScore,
        earnedScore: scoreDetail?.earnedScore || 0,
        feedback: scoreDetail?.feedback || '',
        userAnswer: answer?.answerData || null,
        optionOrder: attempt.optionOrders?.[questionId] || [],
        referenceAnswer: testQuestion.question.referenceAnswers,
      });
    }

    result.questions = questions;
    return result;
  }
  async create(createTestAttemptDto: CreateTestAttemptDto) {
    // Get the test details
    const test = await this.prisma.test.findUnique({
      where: { id: createTestAttemptDto.testId },
      include: {
        testQuestions: {
          include: {
            question: {
              include: {
                options: true,
              },
            },
          },
        },
      },
    });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    // Check if test has started and not ended (only if enforceTimeLimit is true)
    const now = new Date();
    if (test.enforceTimeLimit && (now < test.testStart || (test.testEnd && now > test.testEnd))) {
      throw new BadRequestException('Test is not active');
    }

    // Check attempt limits
    if (test.maxAttempts) {
      const attemptCount = await this.prisma.testAttempt.count({
        where: {
          testId: test.id,
          testTakerId: createTestAttemptDto.testTakerId,
        },
      });

      if (attemptCount >= test.maxAttempts) {
        throw new BadRequestException('Maximum attempts reached');
      }
    }

    // Get the next attempt number if not provided
    const attemptNumber = createTestAttemptDto.attemptNumber || await this.getNextAttemptNumber(
      test.id,
      createTestAttemptDto.testTakerId,
    );

    // Prepare question and option orders
    let questionOrder = test.testQuestions.map(tq => tq.questionId);
    let optionOrders = {};

    if (test.shuffleQuestions) {
      questionOrder = this.shuffleArray([...questionOrder]);

      // Shuffle options for each question
      test.testQuestions.forEach(tq => {
        if (tq.question.options.length > 0) {
          optionOrders[tq.questionId] = this.shuffleArray(
            tq.question.options.map(opt => opt.id)
          );
        }
      });
    }

    // Create the test attempt
    return this.prisma.testAttempt.create({
      data: {
        testId: test.id,
        testTakerId: createTestAttemptDto.testTakerId,
        attemptNumber,
        questionOrder: questionOrder,
        optionOrders: optionOrders,
      }
    });
  }

  private async getNextAttemptNumber(testId: string, testTakerId: string): Promise<number> {
    const lastAttempt = await this.prisma.testAttempt.findFirst({
      where: {
        testId,
        testTakerId,
      },
      orderBy: {
        attemptNumber: 'desc',
      },
    });

    return lastAttempt ? lastAttempt.attemptNumber + 1 : 1;
  }

  async submitAnswer(attemptId: string, submitAnswerDto: SubmitAnswerDto) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: true,
        answers: {
          where: {
            questionId: submitAnswerDto.questionId,
          },
        },
      },
    });

    if (!attempt) {
      throw new NotFoundException('Test attempt not found');
    }

    // Check if test has ended (only if enforceTimeLimit is true)
    if (attempt.test.enforceTimeLimit && attempt.test.testEnd && new Date() > attempt.test.testEnd) {
      throw new BadRequestException('Test has ended');
    }

    // Update or create answer
    if (attempt.answers.length > 0) {
      return this.prisma.userAnswer.update({
        where: {
          attemptId_questionId: {
            attemptId,
            questionId: submitAnswerDto.questionId,
          },
        },
        data: {
          answerData: submitAnswerDto.answerData,
          updatedAt: new Date(),
        },
      });
    }

    return this.prisma.userAnswer.create({
      data: {
        attemptId,
        questionId: submitAnswerDto.questionId,
        answerData: submitAnswerDto.answerData,
      },
    });
  }

  async submitAttempt(attemptId: string) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: {
          include: {
            testQuestions: {
              include: {
                question: {
                  include: {
                    options: true,
                    referenceAnswers: true,
                  },
                },
              },
            },
          },
        },
        answers: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Test attempt not found');
    }

    if (attempt.submittedAt) {
      throw new BadRequestException('Test attempt already submitted');
    }

    // Calculate scores for each question
    const scoreDetails = await Promise.all(
      attempt.test.testQuestions.map(async (testQuestion) => {
        const answer = attempt.answers.find(
          (a) => a.questionId === testQuestion.questionId
        );

        let earnedScore = 0;
        let feedback = 'No answer submitted';

        if (answer) {
          // For multiple choice questions
          if (testQuestion.question.type === 'SINGLE_CHOICE' ||
              testQuestion.question.type === 'MULTIPLE_CHOICE') {
            const correctOptions = testQuestion.question.options
              .filter((opt) => opt.isCorrect)
              .map((opt) => opt.id);

            const userOptions = Array.isArray(answer.answerData)
              ? answer.answerData
              : [answer.answerData];

            const isCorrect = correctOptions.length === userOptions.length &&
              correctOptions.every((opt) => userOptions.includes(opt));

            earnedScore = isCorrect ? testQuestion.maxScore : 0;
            feedback = isCorrect ? 'Correct answer' : 'Incorrect answer';
          }
          // For essay questions - mark as pending review
          else if (testQuestion.question.type === 'ESSAY') {
            earnedScore = 0;
            feedback = 'Pending review';
          }
          else if (testQuestion.question.type === 'TRUE_FALSE') {
            // Lấy tất cả các mệnh đề (options) của câu hỏi
            const options = testQuestion.question.options;

            // Lấy câu trả lời của học sinh
            const userAnswers = answer.answerData || {};

            // Số mệnh đề đúng
            let correctCount = 0;

            // Kiểm tra từng mệnh đề
            options.forEach(option => {
              // Lựa chọn của học sinh cho mệnh đề này (true/false)
              const userChoice = userAnswers[option.id];

              // Đáp án đúng của mệnh đề (true nếu isCorrect=true, false nếu isCorrect=false)
              const correctAnswer = option.isCorrect;

              // Nếu học sinh chọn đúng
              if (userChoice === correctAnswer) {
                correctCount++;
              }
            });

            // Tính điểm dựa trên tỷ lệ mệnh đề đúng
            const scorePerOption = testQuestion.maxScore / options.length;
            earnedScore = correctCount * scorePerOption;

            // Phản hồi
            if (correctCount === options.length) {
              feedback = 'All statements answered correctly';
            } else if (correctCount === 0) {
              feedback = 'All statements answered incorrectly';
            } else {
              feedback = `${correctCount} out of ${options.length} statements answered correctly`;
            }
          }
        }

        return this.prisma.scoreDetail.create({
          data: {
            attemptId,
            questionId: testQuestion.questionId,
            earnedScore,
            feedback,
          },
        });
      })
    );

    // Calculate total score
    const totalScore = scoreDetails.reduce(
      (sum, detail) => sum + detail.earnedScore,
      0
    );

    // Update test attempt
    return this.prisma.testAttempt.update({
      where: { id: attemptId },
      data: {
        submittedAt: new Date(),
        totalScore,
      },
      include: {
        scoreDetails: true,
        answers: true,
      },
    });
  }

  async getAttemptStatus(attemptId: string) {
    const attempt = await this.prisma.testAttempt.findUnique({
      where: { id: attemptId },
      include: {
        test: true,
        answers: true,
        scoreDetails: true,
      },
    });

    if (!attempt) {
      throw new NotFoundException('Test attempt not found');
    }

    const now = new Date();
    const timeRemaining = (attempt.test.enforceTimeLimit && attempt.test.testEnd)
      ? Math.max(0, attempt.test.testEnd.getTime() - now.getTime())
      : null;

    return {
      id: attempt.id,
      testId: attempt.testId,
      attemptNumber: attempt.attemptNumber,
      questionOrder: attempt.questionOrder,
      optionOrders: attempt.optionOrders,
      answeredQuestions: attempt.answers.length,
      totalQuestions: (attempt.questionOrder as string[]).length,
      timeRemaining,
      isSubmitted: !!attempt.submittedAt,
      totalScore: attempt.totalScore,
      scoreDetails: attempt.scoreDetails,
    };
  }

  async findAll(params: {
    testId?: string;
    testTakerId?: string;
    isSubmitted?: boolean;
    skip?: number;
    take?: number;
  }) {
    const { testId, testTakerId, isSubmitted, skip = 0, take = 10 } = params;

    const where: Prisma.TestAttemptWhereInput = {};

    if (testId) {
      where.testId = testId;
    }

    if (testTakerId) {
      where.testTakerId = testTakerId;
    }

    if (isSubmitted !== undefined) {
      where.submittedAt = isSubmitted ? { not: null } : null;
    }

    const [attempts, total] = await Promise.all([
      this.prisma.testAttempt.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: 'desc'
        },
        include: {
          test: {
            select: {
              title: true,
              testType: true,
              maxScore: true,
              testStart: true,
              testEnd: true
            }
          },
          answers: {
            select: {
              questionId: true,
              answerData: true,
              score: true
            }
          },
          scoreDetails: true
        }
      }),
      this.prisma.testAttempt.count({ where })
    ]);

    return {
      attempts,
      pagination: {
        total,
        skip,
        take,
        hasMore: skip + take < total
      }
    };
  }
}
