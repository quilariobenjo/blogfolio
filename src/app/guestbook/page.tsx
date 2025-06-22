import { Metadata } from "next"
import { Suspense } from "react"
import { auth } from "@/auth"
import { getGuestbookEntriesDrizzle } from "./drizzle-actions"
import { SignIn, SignOut } from "@/components/guestbook/auth-buttons"
import { GuestbookForm } from "@/components/guestbook/guestbook-form"
import { GuestbookEntries } from "@/components/guestbook/guestbook-entries"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TypographyH2 } from "@/components/typography"

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Sign my guestbook and leave your mark.",
}

export const dynamic = "force-dynamic"

async function getGuestbookEntries() {
  return await getGuestbookEntriesDrizzle()
}

export default async function GuestbookPage() {
  const session = await auth()
  const entries = await getGuestbookEntries()

  return (
    <div className="mx-auto">
      {/* Header */}
      <TypographyH2 className="mb-8 text-3xl font-bold tracking-tighter">
        <span className="text-4xl">S</span>ign my guestbook
      </TypographyH2>

      {/* Auth Section */}
      <div className="space-y-4">
        {session?.user ? (
          <>
            <SignOut userName={session.user.name || "Anonymous"} />
            <GuestbookForm />
          </>
        ) : (
          <SignIn />
        )}
      </div>

      {/* Entries Section */}
      <Suspense fallback={<></>}>
        <GuestbookEntries
          entries={entries}
          currentUserEmail={session?.user?.email || undefined}
        />
      </Suspense>
    </div>
  )
}
