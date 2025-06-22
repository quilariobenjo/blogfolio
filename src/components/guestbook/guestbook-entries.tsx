"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, User, Calendar } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { deleteGuestbookEntryDrizzle } from "@/app/guestbook/drizzle-actions"
import { toast } from "@/components/ui/use-toast"
import { formatDistanceToNow } from "date-fns"

interface GuestbookEntry {
  id: string
  body: string
  createdBy: string
  email: string
  createdAt: Date
}

interface GuestbookEntriesProps {
  entries: GuestbookEntry[]
  currentUserEmail?: string
}

export function GuestbookEntries({
  entries,
  currentUserEmail,
}: GuestbookEntriesProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)

    try {
      const result = await deleteGuestbookEntryDrizzle(id)

      if (result.ok) {
        toast({
          title: "Success",
          description: result.data,
        })
      } else {
        toast({
          title: "Error",
          description: result.data,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      })
    } finally {
      setDeletingId(null)
    }
  }

  if (!entries.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-12 text-center"
      >
        <div className="space-y-3">
          <div className="text-6xl">📝</div>
          <h3 className="text-lg font-medium">No messages yet</h3>
          <p className="text-muted-foreground">
            Be the first to sign the guestbook!
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="mt-2 space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-semibold">
          Messages ({entries.length})
        </h3>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              layout: { duration: 0.3 },
            }}
            layout
          >
            <Card className="transition-shadow duration-200 hover:shadow-md">
              <CardContent className="p-2">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="text-muted-foreground flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4" />
                      <span className="font-medium">{entry.createdBy}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">
                          {formatDistanceToNow(new Date(entry.createdAt), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    {currentUserEmail === entry.email && (
                      <Button
                        onClick={() => handleDelete(entry.id)}
                        disabled={deletingId === entry.id}
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <p className="break-words text-sm leading-relaxed">
                    {entry.body}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
