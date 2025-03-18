import { Controller, Post, Body, Param, Get, HttpCode, Query } from '@nestjs/common';
import { TestAttemptsService } from './test-attempts.service';
import { CreateTestAttemptDto } from './dto/create-test-attempt.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('api/v1/test-attempts')
export class TestAttemptsController {
  constructor(private readonly testAttemptsService: TestAttemptsService) {}

  @Get()
  findAll(
    @Query('testId') testId?: string,
    @Query('testTakerId') testTakerId?: string,
    @Query('isSubmitted') isSubmitted?: boolean,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    return this.testAttemptsService.findAll({
      testId,
      testTakerId,
      isSubmitted,
      skip: skip ? +skip : undefined,
      take: take ? +take : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.testAttemptsService.findOne(id);
  }

  @Post()
  create(@Body() createTestAttemptDto: CreateTestAttemptDto) {
    return this.testAttemptsService.create(createTestAttemptDto);
  }

  @Post(':id/answers')
  submitAnswer(
    @Param('id') id: string,
    @Body() submitAnswerDto: SubmitAnswerDto,
  ) {
    return this.testAttemptsService.submitAnswer(id, submitAnswerDto);
  }

  @Post(':id/submit')
  @HttpCode(200)
  submit(@Param('id') id: string) {
    return this.testAttemptsService.submitAttempt(id);
  }

  @Get(':id/status')
  getStatus(@Param('id') id: string) {
    return this.testAttemptsService.getAttemptStatus(id);
  }
} 