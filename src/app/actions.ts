"use server"

import { kv } from "@vercel/kv"
import { Ratelimit } from "@upstash/ratelimit"
import { db } from "@/database"
import { emailSent } from "@/database/schema"
import { Resend } from "resend"
import { siteConfig } from "@/config/site"

const resend = new Resend(process.env.RESEND_API_KEY)

interface ISendEmail {
  emailAddress: string
  body: string
  messageBy: string
  action: string
}

export async function sendEmail({
  emailAddress,
  body,
  messageBy,
  action,
}: ISendEmail) {
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(3, "3 m"),
  })

  const { success, reset } = await ratelimit.limit(emailAddress)

  if (!success) {
    const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
    return {
      ok: false,
      data: `Try again in ${retryAfterSeconds} seconds!`,
    }
  }

  if (process.env.NODE_ENV === "production") {
    // await sendMail({
    //   from: `${action}@benjoquilario.site`,
    //   to: "benjoquilario@gmail.com",
    //   subject: `${messageBy} message you!`,
    //   html: `<p>Email: ${emailAddress}</p><p>Message: ${body}</p>`,
    // })

    await resend.emails.send({
      from: `${action}@${siteConfig}`,
      to: ["benjoquilario@gmail.com"],
      subject: `${messageBy} message you!`,
      html: `<p>Email: ${emailAddress}</p><p>Message: ${body}</p>`,
    })

    await db.insert(emailSent).values({
      email: emailAddress,
      subject: `${messageBy} message you!`,
      body: `<p>Email: ${emailAddress}</p><p>Message: ${body}</p>`,
    })
  }

  return { ok: true, data: "Thank you for your message!" }
}
