import { IsEnum, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QuestionDifficulty, QuestionType } from '@prisma/client';


export class AnswerOptionDto {
  @IsString()
  content: any; // JSON content

  @IsOptional()
  @IsString()
  order?: number;

  @IsString()
  isCorrect: boolean;
}

export class ReferenceAnswerDto {
  @IsString()
  content: any; // JSON content

  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateQuestionDto {
  @IsEnum(QuestionType)
  type: QuestionType;

  content: any; // JSON content

  @IsOptional()
  @IsString()
  questionSetterId?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  chapterId?: string;

  @IsOptional()
  @IsUUID()
  lessonId?: string;

  @IsEnum(QuestionDifficulty)
  difficulty: QuestionDifficulty;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionDto)
  options?: AnswerOptionDto[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ReferenceAnswerDto)
  referenceAnswer?: ReferenceAnswerDto;
} 