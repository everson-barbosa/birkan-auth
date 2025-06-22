-- CreateEnum
CREATE TYPE "OutboxStatus" AS ENUM ('PENDING', 'PROCESSED');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('CREATED', 'ACTIVED', 'INACTIVED');

-- CreateTable
CREATE TABLE "OutBoxEvent" (
    "id" TEXT NOT NULL,
    "topic" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" TIMESTAMP(3),
    "status" "OutboxStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "OutBoxEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "UserStatus" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OutBoxEvent_processedAt_idx" ON "OutBoxEvent"("processedAt");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
