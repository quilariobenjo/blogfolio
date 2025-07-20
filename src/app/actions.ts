"use server"

import { db } from "@/database"
import { emailSent } from "@/database/schema"
import { Ratelimit } from "@upstash/ratelimit"
import { kv } from "@vercel/kv"
import { Resend } from "resend"

import { siteConfig } from "@/config/site"

// Validate Resend API key
if (!process.env.RESEND_API_KEY) {
  console.error("RESEND_API_KEY environment variable is not set")
}

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
  // Input validation
  if (!emailAddress || !body || !messageBy || !action) {
    return {
      ok: false,
      data: "Missing required fields",
    }
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailAddress)) {
    return {
      ok: false,
      data: "Invalid email address",
    }
  }

  // Rate limiting
  const ratelimit = new Ratelimit({
    redis: kv,
    limiter: Ratelimit.fixedWindow(3, "3 m"),
  })

  const { success, reset } = await ratelimit.limit(emailAddress)

  if (!success) {
    const retryAfterSeconds = Math.ceil((reset - Date.now()) / 1000)
    return {
      ok: false,
      data: `Rate limit exceeded. Try again in ${retryAfterSeconds} seconds!`,
    }
  }

  try {
    // Validate environment
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return {
        ok: false,
        data: "Email service is not configured",
      }
    }

    if (process.env.NODE_ENV === "production") {
      // Send email using Resend
      const emailResult = await resend.emails.send({
        from: `${action}@benjoquilario.site`, // Fixed: Use proper domain instead of siteConfig object
        to: [siteConfig.email], // Use email from siteConfig for consistency
        subject: `${messageBy} messaged you!`, // Fixed grammar
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New ${action} message from ${messageBy}</h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>From:</strong> ${emailAddress}</p>
              <p><strong>Name:</strong> ${messageBy}</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                ${body.replace(/\n/g, "<br>")}
              </div>
            </div>
            <p style="color: #666; font-size: 12px;">
              This email was sent from your website's ${action} form.
            </p>
          </div>
        `,
        text: `New ${action} message from ${messageBy}\n\nFrom: ${emailAddress}\nName: ${messageBy}\n\nMessage:\n${body}`, // Add plain text version
      })

      console.log("Email sent successfully:", emailResult.data?.id)

      // Check if email was sent successfully
      if (emailResult.error) {
        console.error("Resend API error:", emailResult.error)
        return {
          ok: false,
          data: "Failed to send email. Please try again later.",
        }
      }

      // Save to database
      await db.insert(emailSent).values({
        email: emailAddress,
        subject: `${messageBy} messaged you!`,
        body: `<p>Email: ${emailAddress}</p><p>Message: ${body}</p>`,
      })
    } else {
      // In development, just log the email details
      console.log("Development mode - Email would be sent:", {
        from: `${action}@benjoquilario.site`,
        to: siteConfig.email,
        subject: `${messageBy} messaged you!`,
        emailAddress,
        messageBy,
        body,
      })
    }
  } catch (error) {
    console.error("Failed to send email:", error)

    // More detailed error logging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
    }

    return {
      ok: false,
      data: "Failed to send message. Please try again later.",
    }
  }

  return { ok: true, data: "Thank you for your message!" }
}

// Test function to verify email configuration (for development/debugging)
export async function testEmailConfiguration() {
  try {
    console.log("Testing email configuration...")
    console.log("NODE_ENV:", process.env.NODE_ENV)
    console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY)
    console.log(
      "RESEND_API_KEY format:",
      process.env.RESEND_API_KEY?.startsWith("re_")
        ? "Valid format"
        : "Invalid format"
    )
    console.log("Site config email:", siteConfig.email)

    if (process.env.NODE_ENV === "production") {
      // Test with a simple email
      const testResult = await resend.emails.send({
        from: "test@benjoquilario.site",
        to: [siteConfig.email],
        subject: "Test Email Configuration",
        html: "<p>This is a test email to verify the configuration.</p>",
        text: "This is a test email to verify the configuration.",
      })

      console.log("Test email result:", testResult)
      return { success: true, result: testResult }
    } else {
      console.log("Skipping actual email send in development mode")
      return { success: true, result: "Development mode - no email sent" }
    }
  } catch (error) {
    console.error("Email configuration test failed:", error)
    return { success: false, error }
  }
}
