/*
  Warnings:

  - You are about to drop the column `weight` on the `TestQuestion` table. All the data in the column will be lost.
  - Made the column `maxScore` on table `Test` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Test" ALTER COLUMN "maxScore" SET NOT NULL,
ALTER COLUMN "maxScore" SET DEFAULT 100;

-- AlterTable
ALTER TABLE "TestQuestion" DROP COLUMN "weight",
ALTER COLUMN "maxScore" SET DEFAULT 1.0;
