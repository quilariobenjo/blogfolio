"use client"

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Mail, LogOut, Loader2 } from "lucide-react"
// import { signInWithGitHub, signInWithGoogle, signOutAction } from "@/app/guestbook/actions"
import { motion } from "framer-motion"
import { signIn, signOut } from "next-auth/react"

export function SignIn() {
  const [isPending, startTransition] = useTransition()
  const [signingInWith, setSigningInWith] = useState<
    "github" | "google" | null
  >(null)

  const handleGitHubSignIn = () => {
    // setSigningInWith('github')
    startTransition(() => signIn("github"))
  }

  const handleGoogleSignIn = () => {
    // setSigningInWith('google')
    startTransition(() => signIn("google"))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 border-dashed">
        <CardContent className="p-2">
          <div className="space-y-2 text-center">
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                onClick={handleGitHubSignIn}
                disabled={isPending}
                variant="outline"
                className="flex-1"
              >
                {signingInWith === "github" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Github className="mr-2 h-4 w-4" />
                )}
                Sign in with GitHub
              </Button>
              <Button
                onClick={handleGoogleSignIn}
                disabled={isPending}
                variant="outline"
                className="flex-1"
              >
                {signingInWith === "google" ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 h-4 w-4" />
                )}
                Sign in with Google
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function SignOut({ userName }: { userName?: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-muted/50 flex items-center justify-between rounded-lg p-3"
    >
      <span className="text-sm">
        Signed in as <span className="font-medium">{userName}</span>
      </span>
      <Button
        onClick={() => startTransition(() => signOut())}
        disabled={isPending}
        variant="ghost"
        size="sm"
        className="h-8 px-3"
      >
        {isPending ? (
          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
        ) : (
          <LogOut className="mr-1 h-3 w-3" />
        )}
        Sign out
      </Button>
    </motion.div>
  )
}
