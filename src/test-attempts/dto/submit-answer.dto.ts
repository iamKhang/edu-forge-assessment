import { IsUUID, IsNotEmpty } from 'class-validator';

export class SubmitAnswerDto {
  @IsUUID()
  questionId: string;

  @IsNotEmpty()
  answerData: any; // This will be JSON data containing the answer
} 