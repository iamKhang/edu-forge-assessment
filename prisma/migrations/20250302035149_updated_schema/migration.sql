/*
  Warnings:

  - You are about to drop the `AnswerOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Question` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReferenceAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ScoreDetail` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestAttempt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AnswerOption" DROP CONSTRAINT "AnswerOption_question_id_fkey";

-- DropForeignKey
ALTER TABLE "ReferenceAnswer" DROP CONSTRAINT "ReferenceAnswer_question_id_fkey";

-- DropForeignKey
ALTER TABLE "ScoreDetail" DROP CONSTRAINT "ScoreDetail_attempt_id_fkey";

-- DropForeignKey
ALTER TABLE "ScoreDetail" DROP CONSTRAINT "ScoreDetail_question_id_fkey";

-- DropForeignKey
ALTER TABLE "TestAttempt" DROP CONSTRAINT "TestAttempt_test_id_fkey";

-- DropForeignKey
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_question_id_fkey";

-- DropForeignKey
ALTER TABLE "TestQuestion" DROP CONSTRAINT "TestQuestion_test_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_attempt_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAnswer" DROP CONSTRAINT "UserAnswer_question_id_fkey";

-- DropTable
DROP TABLE "AnswerOption";

-- DropTable
DROP TABLE "Question";

-- DropTable
DROP TABLE "ReferenceAnswer";

-- DropTable
DROP TABLE "ScoreDetail";

-- DropTable
DROP TABLE "Test";

-- DropTable
DROP TABLE "TestAttempt";

-- DropTable
DROP TABLE "TestQuestion";

-- DropTable
DROP TABLE "UserAnswer";

-- CreateTable
CREATE TABLE "questions" (
    "id" TEXT NOT NULL,
    "question_setter_id" TEXT,
    "question_type" "QuestionType" NOT NULL DEFAULT 'SINGLE_CHOICE',
    "content" JSONB NOT NULL,
    "explanation" TEXT,
    "course_id" TEXT,
    "chapter_id" TEXT,
    "lesson_id" TEXT,
    "difficulty" "QuestionDifficulty" NOT NULL DEFAULT 'REMEMBERING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reference_answers" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reference_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tests" (
    "id" TEXT NOT NULL,
    "test_creator" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "course_id" TEXT,
    "chapter_id" TEXT,
    "lesson_id" TEXT,
    "duration" INTEGER,
    "max_score" DOUBLE PRECISION NOT NULL DEFAULT 100,
    "test_type" "TestType" NOT NULL DEFAULT 'PRACTICE',
    "shuffle_questions" BOOLEAN NOT NULL DEFAULT false,
    "max_attempts" INTEGER DEFAULT 1,
    "cooldown_period" INTEGER,
    "scoring_policy" "ScoringPolicy" NOT NULL DEFAULT 'HIGHEST',
    "question_order" JSONB,
    "allow_review" BOOLEAN NOT NULL DEFAULT false,
    "test_start" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "test_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_attempts" (
    "id" TEXT NOT NULL,
    "test_taker_id" TEXT,
    "test_id" TEXT NOT NULL,
    "attemptNumber" INTEGER NOT NULL DEFAULT 1,
    "question_order" JSONB,
    "option_orders" JSONB,
    "total_score" DOUBLE PRECISION,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submitted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "answer_options" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "answer_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test_questions" (
    "id" TEXT NOT NULL,
    "test_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "test_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_answers" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer_data" JSONB NOT NULL,
    "isGraded" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_answers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "score_details" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "earned_score" DOUBLE PRECISION NOT NULL,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "score_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "questions_course_id_idx" ON "questions"("course_id");

-- CreateIndex
CREATE INDEX "questions_chapter_id_idx" ON "questions"("chapter_id");

-- CreateIndex
CREATE INDEX "questions_lesson_id_idx" ON "questions"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "reference_answers_question_id_key" ON "reference_answers"("question_id");

-- CreateIndex
CREATE INDEX "tests_course_id_idx" ON "tests"("course_id");

-- CreateIndex
CREATE INDEX "tests_chapter_id_idx" ON "tests"("chapter_id");

-- CreateIndex
CREATE INDEX "tests_lesson_id_idx" ON "tests"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "tests_course_id_chapter_id_lesson_id_title_key" ON "tests"("course_id", "chapter_id", "lesson_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "test_questions_test_id_question_id_key" ON "test_questions"("test_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_answers_attempt_id_question_id_key" ON "user_answers"("attempt_id", "question_id");

-- AddForeignKey
ALTER TABLE "reference_answers" ADD CONSTRAINT "reference_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answer_options" ADD CONSTRAINT "answer_options_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "test_questions" ADD CONSTRAINT "test_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "test_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_answers" ADD CONSTRAINT "user_answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score_details" ADD CONSTRAINT "score_details_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "test_attempts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score_details" ADD CONSTRAINT "score_details_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
