import { Controller, Post, Body, Param, Get, HttpCode, Query, ParseUUIDPipe } from '@nestjs/common';
import { TestAttemptsService } from './test-attempts.service';
import { CreateTestAttemptDto } from './dto/create-test-attempt.dto';
import { SubmitAnswerDto } from './dto/submit-answer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('test-attempts')
@Controller('api/v1/test-attempts')
export class TestAttemptsController {
  constructor(private readonly testAttemptsService: TestAttemptsService) {}

  @Get('highest-score')
  @ApiOperation({ summary: 'Get the highest score attempt for a specific test and test taker' })
  @ApiQuery({ name: 'testId', required: true })
  @ApiQuery({ name: 'testTakerId', required: true })
  @ApiResponse({ status: 200, description: 'Returns the highest score attempt' })
  @ApiResponse({ status: 404, description: 'No attempts found' })
  async getHighestScoreAttempt(
    @Query('testId', ParseUUIDPipe) testId: string,
    @Query('testTakerId') testTakerId: string,
  ) {
    console.log('Getting highest score attempt with params:', { testId, testTakerId });
    const result = await this.testAttemptsService.getHighestScoreAttempt(testId, testTakerId);
    console.log('Result:', result);
    return result;
  }

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