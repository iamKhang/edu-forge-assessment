import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionType } from '@prisma/client';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const { options, referenceAnswer, ...questionData } = createQuestionDto;

    // Create the question with its options and reference answer if provided
    return this.prisma.question.create({
      data: {
        ...questionData,
        options: options ? {
          create: options.map(option => ({
            content: option.content,
            isCorrect: option.isCorrect,
            order: option.order || 0,
          }))
        } : undefined,
        referenceAnswers: referenceAnswer ? {
          create: {
            content: referenceAnswer.content,
            notes: referenceAnswer.notes,
          }
        } : undefined,
      },
      include: {
        options: true,
        referenceAnswers: true,
      },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      include: {
        options: true,
        referenceAnswers: true,
      },
    });
  }

  async findOne(id: string) {
    const question = await this.prisma.question.findUnique({
      where: { id },
      include: {
        options: true,
        referenceAnswers: true,
      },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    return question;
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    const { options, referenceAnswer, ...questionData } = updateQuestionDto;

    // First check if the question exists
    const existingQuestion = await this.prisma.question.findUnique({
      where: { id },
      include: { options: true, referenceAnswers: true },
    });

    if (!existingQuestion) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    // Update the question and related data
    return this.prisma.question.update({
      where: { id },
      data: {
        ...questionData,
        options: options ? {
          deleteMany: {}, // Delete existing options
          create: options.map(option => ({
            content: option.content,
            isCorrect: option.isCorrect,
            order: option.order || 0,
          }))
        } : undefined,
        referenceAnswers: referenceAnswer ? {
          upsert: {
            create: {
              content: referenceAnswer.content,
              notes: referenceAnswer.notes,
            },
            update: {
              content: referenceAnswer.content,
              notes: referenceAnswer.notes,
            },
          }
        } : undefined,
      },
      include: {
        options: true,
        referenceAnswers: true,
      },
    });
  }

  async remove(id: string) {
    // First check if the question exists
    const question = await this.prisma.question.findUnique({
      where: { id },
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }

    // Delete the question and all related data (Prisma will handle cascading deletes)
    return this.prisma.question.delete({
      where: { id },
    });
  }

  // Additional helper methods

  async findByFilters(filters: {
    courseId?: string;
    chapterId?: string;
    lessonId?: string;
    type?: QuestionType;
  }) {
    return this.prisma.question.findMany({
      where: filters,
      include: {
        options: true,
        referenceAnswers: true,
      },
    });
  }
} 