import { PrismaClient, QuestionType, QuestionDifficulty } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface AnswerOption {
  id: string;
  questionId: string;
  content: any;
  isCorrect: boolean;
  order: number;
}

interface ReferenceAnswer {
  id: string;
  questionId: string;
  content: any;
  notes?: string;
}

interface QuestionSeed {
  id: string;
  questionSetterId?: string;
  type: QuestionType;
  content: any;
  explanation?: string;
  courseId?: string;
  chapterId?: string;
  lessonId?: string;
  difficulty: QuestionDifficulty;
}

interface SeedData {
  questions: QuestionSeed[];
  answerOptions: AnswerOption[];
  referenceAnswers: ReferenceAnswer[];
}

async function main(): Promise<void> {
  try {
    console.log('Starting seed process...');

    // Load question seed data
    const questionSeedPath = path.join(__dirname, 'seeds', 'questions-seed.json');
    const questionSeedData: SeedData = JSON.parse(fs.readFileSync(questionSeedPath, 'utf8'));

    // Process questions and their related data
    for (const questionData of questionSeedData.questions) {
      console.log(`Processing question: ${questionData.id}`);

      // Find related answer options for this question
      const options = questionSeedData.answerOptions.filter(
        option => option.questionId === questionData.id
      );

      // Find reference answer for this question
      const referenceAnswer = questionSeedData.referenceAnswers.find(
        ref => ref.questionId === questionData.id
      );

      // Create the question with its options and reference answer
      await prisma.question.upsert({
        where: { id: questionData.id },
        update: {
          questionSetterId: questionData.questionSetterId,
          type: questionData.type,
          content: questionData.content,
          explanation: questionData.explanation,
          courseId: questionData.courseId,
          chapterId: questionData.chapterId,
          lessonId: questionData.lessonId,
          difficulty: questionData.difficulty
        },
        create: {
          id: questionData.id,
          questionSetterId: questionData.questionSetterId,
          type: questionData.type,
          content: questionData.content,
          explanation: questionData.explanation,
          courseId: questionData.courseId,
          chapterId: questionData.chapterId,
          lessonId: questionData.lessonId,
          difficulty: questionData.difficulty
        }
      });

      // Handle answer options separately
      if (options.length > 0) {
        // Delete existing options
        await prisma.answerOption.deleteMany({
          where: { questionId: questionData.id }
        });

        // Create new options
        for (const option of options) {
          await prisma.answerOption.create({
            data: {
              id: option.id,
              questionId: questionData.id,
              content: option.content,
              isCorrect: option.isCorrect,
              order: option.order
            }
          });
        }
      }

      // Handle reference answer separately
      if (referenceAnswer) {
        // Check if reference answer exists
        const existingRefAnswer = await prisma.referenceAnswer.findUnique({
          where: { questionId: questionData.id }
        });

        if (existingRefAnswer) {
          // Update existing reference answer
          await prisma.referenceAnswer.update({
            where: { id: existingRefAnswer.id },
            data: {
              content: referenceAnswer.content,
              notes: referenceAnswer.notes
            }
          });
        } else {
          // Create new reference answer
          await prisma.referenceAnswer.create({
            data: {
              id: referenceAnswer.id,
              questionId: questionData.id,
              content: referenceAnswer.content,
              notes: referenceAnswer.notes
            }
          });
        }
      }

      console.log(`Question ${questionData.id} processed successfully`);
    }

    // Load other seed files if they exist
    // For example, test-attempts.json could be loaded here

    console.log('Seed process completed successfully');
  } catch (error) {
    console.error('Error during seed process:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });