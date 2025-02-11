/*
  Warnings:

  - You are about to drop the column `text` on the `Question` table. All the data in the column will be lost.
  - The `scoringPolicy` column on the `Test` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questionOrder` column on the `TestAttempt` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `order` on the `TestQuestion` table. All the data in the column will be lost.
  - You are about to drop the `CorrectAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `content` on the `AnswerOption` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `content` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ScoringPolicy" AS ENUM ('HIGHEST', 'AVERAGE', 'LATEST');

-- DropForeignKey
ALTER TABLE "CorrectAnswer" DROP CONSTRAINT "CorrectAnswer_questionId_fkey";

-- AlterTable
ALTER TABLE "AnswerOption" DROP COLUMN "content",
ADD COLUMN     "content" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Question" DROP COLUMN "text",
ADD COLUMN     "content" JSONB NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "allowReview" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "questionOrder" JSONB,
DROP COLUMN "scoringPolicy",
ADD COLUMN     "scoringPolicy" "ScoringPolicy" NOT NULL DEFAULT 'HIGHEST';

-- AlterTable
ALTER TABLE "TestAttempt" DROP COLUMN "questionOrder",
ADD COLUMN     "questionOrder" JSONB;

-- AlterTable
ALTER TABLE "TestQuestion" DROP COLUMN "order";

-- DropTable
DROP TABLE "CorrectAnswer";

-- CreateTable
CREATE TABLE "ReferenceAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceAnswer_questionId_key" ON "ReferenceAnswer"("questionId");

-- AddForeignKey
ALTER TABLE "ReferenceAnswer" ADD CONSTRAINT "ReferenceAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
