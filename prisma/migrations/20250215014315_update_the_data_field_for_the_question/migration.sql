/*
  Warnings:

  - You are about to drop the column `userId` on the `Question` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TestAttempt` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "userId",
ADD COLUMN     "questionSetterId" TEXT;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "testCreator" TEXT;

-- AlterTable
ALTER TABLE "TestAttempt" DROP COLUMN "userId",
ADD COLUMN     "testTakerId" TEXT;
