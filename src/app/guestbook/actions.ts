"use server"

import { redirect } from "next/navigation"
import { signIn, signOut } from "@/auth"

export async function signInWithGitHub() {
  try {
    await signIn("github", { 
      redirectTo: "/guestbook",
      redirect: false 
    })
  } catch (error) {
    // Handle the redirect that NextAuth throws
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }
    console.error("GitHub sign-in error:", error)
    throw new Error("Failed to sign in with GitHub")
  }
  redirect("/guestbook")
}

export async function signInWithGoogle() {
  try {
    await signIn("google", { 
      redirectTo: "/guestbook",
      redirect: false 
    })
  } catch (error) {
    // Handle the redirect that NextAuth throws
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }
    console.error("Google sign-in error:", error)
    throw new Error("Failed to sign in with Google")
  }
  redirect("/guestbook")
}

export async function signOutAction() {
  try {
    await signOut({ 
      redirectTo: "/",
      redirect: false 
    })
  } catch (error) {
    // Handle the redirect that NextAuth throws
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error
    }
    console.error("Sign out error:", error)
    throw new Error("Failed to sign out")
  }
  redirect("/")
}