import { Module } from '@nestjs/common';
import { TestAttemptsService } from './test-attempts.service';
import { TestAttemptsController } from './test-attempts.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TestAttemptsController],
  providers: [TestAttemptsService],
  exports: [TestAttemptsService],
})
export class TestAttemptsModule {} 