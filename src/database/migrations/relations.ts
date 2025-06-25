import { relations } from "drizzle-orm/relations";
import { user, session, account, authenticator, guestEntry } from "./schema";

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({many}) => ({
	sessions: many(session),
	accounts: many(account),
	authenticators: many(authenticator),
	guestEntries: many(guestEntry),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const authenticatorRelations = relations(authenticator, ({one}) => ({
	user: one(user, {
		fields: [authenticator.userId],
		references: [user.id]
	}),
}));

export const guestEntryRelations = relations(guestEntry, ({one}) => ({
	user: one(user, {
		fields: [guestEntry.userId],
		references: [user.id]
	}),
}));