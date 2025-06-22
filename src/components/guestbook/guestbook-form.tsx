"use client"

import { useState, useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { saveGuestbookEntryDrizzle } from "@/app/guestbook/drizzle-actions"
import { motion } from "framer-motion"
import { toast } from "@/components/ui/use-toast"
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { AiOutlineSend } from "react-icons/ai"
import { FaSpinner } from "react-icons/fa"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Send } from "lucide-react"

const guestBookSchema = z.object({
  entry: z.string().min(1, { message: "Message must be atleast 1 character." }),
})

type Input = z.infer<typeof guestBookSchema>

export function GuestbookForm() {
  const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(guestBookSchema),
    defaultValues: {
      entry: "",
    },
  })

  const { reset, formState } = form
  const { isSubmitting } = formState

  const handleSubmit = async (values: Input) => {
    if (!values.entry.trim()) {
      toast({
        title: "Message required",
        description: "Please enter a message before submitting.",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const result = await saveGuestbookEntryDrizzle(values.entry.trim())

      if (result.ok) {
        reset()
        toast({
          title: "Success! 🎉",
          description: result.data,
        })
      } else {
        toast({
          title: "Error",
          description: result.data,
          variant: "destructive",
        })
      }
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="entry"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative flex flex-col">
                    <textarea
                      {...field}
                      placeholder="Share your thoughts..."
                      className="border-border bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-[80px] w-full resize-none rounded-lg border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      disabled={isPending || isSubmitting}
                      rows={3}
                    />
                    <Button
                      className="mt-2 self-end"
                      type="submit"
                      size="sm"
                      variant="default"
                      disabled={
                        isPending || isSubmitting || !field.value.trim()
                      }
                    >
                      {isPending || isSubmitting ? (
                        <>
                          <FaSpinner className="h-3 w-3 animate-spin" />{" "}
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <AiOutlineSend className="h-3 w-3" />
                          <span>Send</span>
                        </>
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </motion.div>
  )
}
