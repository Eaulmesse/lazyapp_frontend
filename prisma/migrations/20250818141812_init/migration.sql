-- CreateTable
CREATE TABLE "public"."waitlist" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "preferences" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waitlist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "waitlist_email_key" ON "public"."waitlist"("email");
