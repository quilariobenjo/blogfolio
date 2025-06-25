import { pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const emailSent = pgTable("emailSent", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  body: text("body").notNull(),
  sentAt: timestamp("sentAt", { mode: "date" }).notNull().defaultNow(),
})
