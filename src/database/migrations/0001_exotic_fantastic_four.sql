CREATE TABLE "emailSent" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"subject" text NOT NULL,
	"body" text NOT NULL,
	"sentAt" timestamp DEFAULT now() NOT NULL
);
