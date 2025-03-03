import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto} from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionDifficulty, QuestionType } from '@prisma/client';

@Controller('/api/v1/questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll(
    @Query('courseId') courseId?: string,
    @Query('chapterId') chapterId?: string,
    @Query('lessonId') lessonId?: string,
    @Query('type') type?: QuestionType,
    @Query('difficulty') difficulty?: QuestionDifficulty,
  ) {
    if (courseId || chapterId || lessonId || type || difficulty) {
      return this.questionsService.findByFilters({
        courseId,
        chapterId,
        lessonId,
        type,
        difficulty,
      });
    }
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
} 