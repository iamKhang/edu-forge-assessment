import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TestsController } from './tests.controller';
import { TestsService } from './tests.service';

@Module({
  imports: [PrismaModule],
  controllers: [TestsController],
  providers: [TestsService],
  exports: [TestsService],
})
export class TestsModule {} 