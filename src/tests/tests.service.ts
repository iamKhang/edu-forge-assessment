import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestsService {
  constructor(private prisma: PrismaService) {}

  private async validateHierarchy(courseId?: string, chapterId?: string, lessonId?: string) {
    if (lessonId) {
      if (!chapterId || !courseId) {
        throw new BadRequestException('When lessonId is provided, both chapterId and courseId are required');
      }
    }
    if (chapterId && !courseId) {
      throw new BadRequestException('When chapterId is provided, courseId is required');
    }
  }

  async create(createTestDto: CreateTestDto) {
    await this.validateHierarchy(
      createTestDto.courseId,
      createTestDto.chapterId,
      createTestDto.lessonId,
    );

    const { testQuestions, ...testData } = createTestDto;

    const data: any = {
      ...testData,
      testQuestions: testQuestions ? {
        create: testQuestions.map(q => ({
          questionId: q.questionId,
          maxScore: q.maxScore,
        }))
      } : undefined
    };

    return this.prisma.test.create({
      data,
      include: {
        testQuestions: true,
      },
    });
  }

  async findAll(courseId?: string, chapterId?: string, lessonId?: string) {
    const where: any = {};
    
    if (lessonId) {
      where.lessonId = lessonId;
      where.chapterId = chapterId;
      where.courseId = courseId;
    } else if (chapterId) {
      where.chapterId = chapterId;
      where.courseId = courseId;
      where.lessonId = null;
    } else if (courseId) {
      where.courseId = courseId;
      where.chapterId = null;
      where.lessonId = null;
    }

    return this.prisma.test.findMany({
      where,
      include: {
        testQuestions: true,
      },
    });
  }

  async findOne(id: string) {
    const test = await this.prisma.test.findUnique({
      where: { id },
      include: {
        testQuestions: true,
      },
    });

    if (!test) {
      throw new NotFoundException(`Test with ID ${id} not found`);
    }

    return test;
  }

  async update(id: string, updateTestDto: UpdateTestDto) {
    const existingTest = await this.findOne(id);

    if (updateTestDto.courseId || updateTestDto.chapterId || updateTestDto.lessonId) {
      await this.validateHierarchy(
        updateTestDto.courseId ?? existingTest.courseId,
        updateTestDto.chapterId ?? existingTest.chapterId,
        updateTestDto.lessonId ?? existingTest.lessonId,
      );
    }

    // Check for ongoing attempts if updating questions
    if (updateTestDto.testQuestions || updateTestDto.questionOrder) {
      const ongoingAttempts = await this.prisma.testAttempt.findMany({
        where: {
          testId: id,
          submittedAt: null,
        },
      });

      if (ongoingAttempts.length > 0) {
        throw new BadRequestException('Cannot update test questions while there are ongoing attempts');
      }
    }

    const { testQuestions, ...testData } = updateTestDto;

    const data: any = {
      ...testData,
      testQuestions: testQuestions ? {
        deleteMany: {
          testId: id,
        },
        create: testQuestions.map(q => ({
          questionId: q.questionId,
          maxScore: q.maxScore,
        }))
      } : undefined
    };

    return this.prisma.test.update({
      where: { id },
      data,
      include: {
        testQuestions: true,
      },
    });
  }

  async remove(id: string) {
    const ongoingAttempts = await this.prisma.testAttempt.findMany({
      where: {
        testId: id,
        submittedAt: null,
      },
    });

    if (ongoingAttempts.length > 0) {
      throw new BadRequestException('Cannot delete test while there are ongoing attempts');
    }

    return this.prisma.test.delete({
      where: { id },
    });
  }
} 