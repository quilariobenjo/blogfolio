import { timestamp, pgTable, text } from "drizzle-orm/pg-core"
import { relations } from "drizzle-orm"
import { users } from "./users"

export const guestEntries = pgTable("guestEntry", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  body: text("body").notNull(),
  createdBy: text("created_by").notNull(), // User's name
  email: text("email").notNull(), // User's email
  userId: text("userId").references(() => users.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
})

export const guestEntryRelations = relations(guestEntries, ({ one }) => ({
  user: one(users, {
    fields: [guestEntries.userId],
    references: [users.id],
  }),
}))
