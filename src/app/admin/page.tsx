import { auth } from "@/auth"
import { notFound, redirect } from "next/navigation"
import { db } from "@/database"
import { revalidatePath } from "next/cache"
import { Button } from "@/components/ui/button"
import { guestEntries } from "@/database/schema/guest-entries"
import { eq } from "drizzle-orm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const Admin = async () => {
  // const session = await auth()

  // if (!session) redirect("/")

  // if (session?.user?.email !== "benjoquilario@gmail.com") notFound()

  const guestbookEntries = await db.query.guestEntries.findMany({
    orderBy: (guestEntries, { desc }) => desc(guestEntries.createdAt),
  })

  const emails = await db.query.emailSent.findMany({
    orderBy: (emailSent, { desc }) => desc(emailSent.sentAt),
  })

  return (
    <div className="space-y-4">
      <Button
        onClick={async () => {
          "use server"
          revalidatePath("/admin")
        }}
      >
        Refresh
      </Button>
      <Tabs defaultValue="guestbook" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="guestbook">Guestbook</TabsTrigger>
          <TabsTrigger value="emails">Emails</TabsTrigger>
        </TabsList>
        <TabsContent value="guestbook">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Guestbook Entries</h1>
          </div>

          {guestbookEntries.map((entry) => (
            <div
              key={entry.id}
              className="hover:bg-muted flex w-full justify-between break-words text-sm"
            >
              <div>
                <span className="text-muted-foreground">{entry.createdBy}</span>{" "}
                : {entry.body}
              </div>
              <form
                className="ml-10 inline-flex mt-2"
                action={async () => {
                  "use server"
                  await db
                    .select()
                    .from(guestEntries)
                    .where(eq(guestEntries.id, entry.id))
                    .limit(1)
                  revalidatePath("/admin")
                  revalidatePath("/guestbook")
                }}
              >
                <Button type="submit" size="sm">Delete</Button>
              </form>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="emails">
          <h1 className="text-2xl font-bold">Emails</h1>
          {emails.map((email) => (
            <div
              key={email.id}
              className="hover:bg-muted flex w-full justify-between break-words text-sm"
            >
              <div>
                <span className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: email.email }}></span> :{" "}
                <span dangerouslySetInnerHTML={{ __html: email.body }}></span>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
export default Admin
