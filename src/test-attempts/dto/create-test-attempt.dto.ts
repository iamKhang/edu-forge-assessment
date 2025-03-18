import { IsString, IsUUID, IsOptional, IsInt, IsPositive } from 'class-validator';

export class CreateTestAttemptDto {
  @IsUUID()
  testId: string;

  @IsString()
  testTakerId: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  attemptNumber?: number;
} 