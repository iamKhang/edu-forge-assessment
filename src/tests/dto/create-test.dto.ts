import { IsString, IsOptional, IsInt, IsNumber, IsBoolean, IsEnum, IsDate, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TestType, ScoringPolicy } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestQuestionDto {
  @IsString()
  @ApiProperty()
  questionId: string;

  @IsNumber()
  @Min(0)
  @ApiProperty()
  maxScore: number;
}

export class CreateTestDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  courseId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  chapterId?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  lessonId?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  duration?: number;

  @IsNumber()
  @ApiProperty({ default: 100 })
  maxScore: number = 100;

  @IsEnum(TestType)
  @ApiProperty({ enum: TestType, default: TestType.PRACTICE })
  testType: TestType = TestType.PRACTICE;

  @IsBoolean()
  @ApiProperty({ default: false })
  shuffleQuestions: boolean = false;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false, default: 1 })
  maxAttempts?: number = 1;

  @IsOptional()
  @IsInt()
  @ApiProperty({ required: false })
  cooldownPeriod?: number;

  @IsEnum(ScoringPolicy)
  @ApiProperty({ enum: ScoringPolicy, default: ScoringPolicy.HIGHEST })
  scoringPolicy: ScoringPolicy = ScoringPolicy.HIGHEST;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTestQuestionDto)
  @ApiProperty({ type: [CreateTestQuestionDto], required: false })
  testQuestions?: CreateTestQuestionDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ type: [String], required: false })
  questionOrder?: string[];

  @IsBoolean()
  @ApiProperty({ default: false })
  allowReview: boolean = false;

  @IsDate()
  @Type(() => Date)
  @ApiProperty()
  testStart: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({ required: false })
  testEnd?: Date;

  @IsBoolean()
  @ApiProperty({ default: true, description: 'Whether to enforce time limits for this test' })
  enforceTimeLimit: boolean = true;

  @IsBoolean()
  @ApiProperty({ default: false, description: 'Whether to allow unlimited attempts for this test' })
  unlimitedAttempts: boolean = false;
}