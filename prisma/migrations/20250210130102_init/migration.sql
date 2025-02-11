-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "cooldownPeriod" INTEGER,
ADD COLUMN     "maxAttempts" INTEGER DEFAULT 1,
ADD COLUMN     "scoringPolicy" TEXT NOT NULL DEFAULT 'HIGHEST',
ADD COLUMN     "shuffleQuestions" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TestAttempt" ADD COLUMN     "attemptNumber" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "questionOrder" TEXT[];
