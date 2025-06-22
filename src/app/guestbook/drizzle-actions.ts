"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { db } from "@/database"
import { guestEntries } from "@/database/schema/guest-entries"
import { eq, desc } from "drizzle-orm"
import { z } from "zod"
import { kv } from "@vercel/kv"
import { Ratelimit } from "@upstash/ratelimit"

const guestbookSchema = z.object({
  entry: z
    .string()
    .min(1, { message: "Message must be at least 1 character." })
    .max(500, { message: "Message must be less than 500 characters." }),
})

export async function saveGuestbookEntryDrizzle(formData: string) {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      data: "You must be signed in to leave a message.",
    }
  }

  const email = session.user.email || ""

  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(2, "1 m"),
  })

  const { success, reset } = await ratelimit.limit(email)

  if (!success) {
    const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
    return {
      ok: false,
      data: `Try again in ${retryAfterSeconds} seconds!`,
    }
  }

  const validatedFields = guestbookSchema.safeParse({
    entry: formData,
  })

  if (!validatedFields.success) {
    return {
      ok: false,
      data: "Invalid message. Please check your input.",
    }
  }

  const { entry } = validatedFields.data

  const body = entry.slice(0, 500)

  try {
    await db.insert(guestEntries).values({
      body: body,
      createdBy: session.user.name || "Anonymous",
      email: session.user.email || "",
      userId: session.user.id || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath("/guestbook")
    return {
      ok: true,
      data: "Message sent successfully! 🎉",
    }
  } catch (error) {
    console.error("Error saving guestbook entry:", error)
    return {
      ok: false,
      data: "Something went wrong. Please try again.",
    }
  }
}

export async function deleteGuestbookEntryDrizzle(id: string) {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      data: "You must be signed in to delete a message.",
    }
  }

  try {
    const entry = await db
      .select()
      .from(guestEntries)
      .where(eq(guestEntries.id, id))
      .limit(1)

    if (!entry.length) {
      return {
        ok: false,
        data: "Message not found.",
      }
    }

    // Only allow deletion if the user created the entry
    if (entry[0].email !== session.user.email) {
      return {
        ok: false,
        data: "You can only delete your own messages.",
      }
    }

    await db.delete(guestEntries).where(eq(guestEntries.id, id))

    revalidatePath("/guestbook")
    return {
      ok: true,
      data: "Message deleted successfully.",
    }
  } catch (error) {
    console.error("Error deleting guestbook entry:", error)
    return {
      ok: false,
      data: "Something went wrong. Please try again.",
    }
  }
}

export async function getGuestbookEntriesDrizzle() {
  try {
    const result = await db
      .select({
        id: guestEntries.id,
        body: guestEntries.body,
        createdBy: guestEntries.createdBy,
        email: guestEntries.email,
        createdAt: guestEntries.createdAt,
      })
      .from(guestEntries)
      .orderBy(desc(guestEntries.createdAt))
      .limit(100)

    return result
  } catch (error) {
    console.error("Error fetching guestbook entries:", error)
    return []
  }
}
