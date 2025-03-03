-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'TRUE_FALSE', 'ESSAY');

-- CreateEnum
CREATE TYPE "TestType" AS ENUM ('PRACTICE', 'QUIZ', 'FINAL', 'ASSIGNMENT');

-- CreateEnum
CREATE TYPE "ScoringPolicy" AS ENUM ('HIGHEST', 'AVERAGE', 'LATEST');

-- CreateEnum
CREATE TYPE "QuestionDifficulty" AS ENUM ('REMEMBERING', 'UNDERSTANDING', 'APPLYING', 'ANALYZING', 'EVALUATING', 'CREATING');

-- CreateTable
CREATE TABLE "Question" (
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

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReferenceAnswer" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Test" (
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

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestAttempt" (
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

    CONSTRAINT "TestAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnswerOption" (
    "id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "AnswerOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TestQuestion" (
    "id" TEXT NOT NULL,
    "test_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "answer_data" JSONB NOT NULL,
    "isGraded" BOOLEAN NOT NULL DEFAULT false,
    "score" DOUBLE PRECISION,
    "feedback" TEXT,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScoreDetail" (
    "id" TEXT NOT NULL,
    "attempt_id" TEXT NOT NULL,
    "question_id" TEXT NOT NULL,
    "earned_score" DOUBLE PRECISION NOT NULL,
    "feedback" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScoreDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_course_id_idx" ON "Question"("course_id");

-- CreateIndex
CREATE INDEX "Question_chapter_id_idx" ON "Question"("chapter_id");

-- CreateIndex
CREATE INDEX "Question_lesson_id_idx" ON "Question"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceAnswer_question_id_key" ON "ReferenceAnswer"("question_id");

-- CreateIndex
CREATE INDEX "Test_course_id_idx" ON "Test"("course_id");

-- CreateIndex
CREATE INDEX "Test_chapter_id_idx" ON "Test"("chapter_id");

-- CreateIndex
CREATE INDEX "Test_lesson_id_idx" ON "Test"("lesson_id");

-- CreateIndex
CREATE UNIQUE INDEX "Test_course_id_chapter_id_lesson_id_title_key" ON "Test"("course_id", "chapter_id", "lesson_id", "title");

-- CreateIndex
CREATE UNIQUE INDEX "TestQuestion_test_id_question_id_key" ON "TestQuestion"("test_id", "question_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserAnswer_attempt_id_question_id_key" ON "UserAnswer"("attempt_id", "question_id");

-- AddForeignKey
ALTER TABLE "ReferenceAnswer" ADD CONSTRAINT "ReferenceAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAttempt" ADD CONSTRAINT "TestAttempt_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnswerOption" ADD CONSTRAINT "AnswerOption_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_test_id_fkey" FOREIGN KEY ("test_id") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestQuestion" ADD CONSTRAINT "TestQuestion_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "TestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreDetail" ADD CONSTRAINT "ScoreDetail_attempt_id_fkey" FOREIGN KEY ("attempt_id") REFERENCES "TestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScoreDetail" ADD CONSTRAINT "ScoreDetail_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
