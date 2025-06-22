import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { type ReadingTime } from "./blog"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const lowerCaseName = (name: string) => {
  if (name) {
    const names = name.split(" ")
    const namesUpper = []

    for (const name of names) {
      namesUpper.push(name.replace(name[0] as string, name[0]?.toLowerCase()))
    }

    return namesUpper.join("")
  }
}

export function calculateReadingTime(content: string): ReadingTime {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  const time = minutes * 60 * 1000 // milliseconds

  return {
    text: `${minutes} min read`,
    minutes,
    time,
    words,
  }
}
