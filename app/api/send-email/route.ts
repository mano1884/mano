import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

// Force this route to be dynamic
export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  console.log("📧 Email API route called")

  try {
    const formData = await request.formData()
    console.log("📋 Form data received")

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const sessionDetails = formData.get("sessionDetails") as string
    const totalAmount = formData.get("totalAmount") as string
    const sessionType = formData.get("sessionType") as string
    const numberOfSessions = formData.get("numberOfSessions") as string
    const notes = formData.get("notes") as string

    console.log(`👤 Booking for: ${name} (${email})`)

    // Check if environment variables exist
    if (!process.env.EMAIL_SERVER_HOST || !process.env.EMAIL_SERVER_USER || !process.env.EMAIL_SERVER_PASSWORD) {
      console.error("❌ Missing email environment variables")
      return NextResponse.json(
        {
          success: false,
          error: "Email configuration missing",
        },
        { status: 500 },
      )
    }

    console.log(`📡 Connecting to email server: ${process.env.EMAIL_SERVER_HOST}:${process.env.EMAIL_SERVER_PORT}`)

    // Handle file attachments
    const files = formData.getAll("files") as File[]
    const attachments = []
    for (const file of files) {
      if (file.size > 0) {
        const buffer = Buffer.from(await file.arrayBuffer())
        attachments.push({
          filename: file.name,
          content: buffer,
        })
      }
    }

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    })

    console.log("🔧 Transporter created, testing connection...")

    // Test the connection
    try {
      await transporter.verify()
      console.log("✅ Email server connection successful")
    } catch (verifyError) {
      console.error("❌ Email server connection failed:", verifyError)
      return NextResponse.json(
        {
          success: false,
          error: "Cannot connect to email server",
        },
        { status: 500 },
      )
    }

    // Customer email HTML
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>UniTutors Booking Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px;">
    <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #000000, #2d1810); border-radius: 8px; margin-bottom: 20px;">
      <h1 style="color: #f59e0b; margin: 0; font-size: 24px;">UniTutors</h1>
      <p style="color: #ffffff; margin: 10px 0 0 0;">Booking Confirmation</p>
    </div>
    
    <h2 style="color: #333;">Hello ${name}!</h2>
    <p style="color: #666;">Thank you for booking with UniTutors! Here are your session details:</p>
    
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #f59e0b; margin-top: 0;">Booking Summary</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Session Type:</strong> ${sessionType}</p>
      <p><strong>Number of Sessions:</strong> ${numberOfSessions}</p>
      <p><strong>Total Amount:</strong> $${totalAmount}</p>
    </div>
    
    <div style="background-color: #fff8e1; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #f59e0b; margin-top: 0;">Schedule</h3>
      ${sessionDetails}
    </div>
    
    ${
      notes
        ? `
    <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3 style="color: #4caf50; margin-top: 0;">Notes</h3>
      <p>${notes}</p>
    </div>
    `
        : ""
    }
    
    <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
      <p style="color: #f59e0b; font-weight: bold;">Questions? Reply to this email!</p>
    </div>
    
    <p style="color: #f59e0b; font-weight: bold; margin-top: 20px;">
      Best regards,<br>The UniTutors Team
    </p>
  </div>
</body>
</html>`

    // Admin email HTML
    const adminEmailHtml = `
<h2>🚨 NEW BOOKING</h2>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Type:</strong> ${sessionType}</p>
<p><strong>Sessions:</strong> ${numberOfSessions}</p>
<p><strong>Amount:</strong> $${totalAmount}</p>
<h3>Schedule:</h3>
${sessionDetails}
${notes ? `<h3>Notes:</h3><p>${notes}</p>` : ""}
${files.length > 0 ? `<p>📎 ${files.length} file(s) attached</p>` : ""}
`

    let customerEmailSent = false
    let adminEmailSent = false

    // Send customer email
    try {
      console.log("📤 Sending customer email...")
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "UniTutors - Booking Confirmation",
        html: customerEmailHtml,
        attachments: attachments,
      })
      customerEmailSent = true
      console.log("✅ Customer email sent successfully")
    } catch (customerError) {
      console.error("❌ Customer email failed:", customerError)
    }

    // Send admin email
    try {
      console.log("📤 Sending admin email...")
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: `🚨 NEW BOOKING: ${name} - ${subject}`,
        html: adminEmailHtml,
        attachments: attachments,
      })
      adminEmailSent = true
      console.log("✅ Admin email sent successfully")
    } catch (adminError) {
      console.error("❌ Admin email failed:", adminError)
    }

    if (customerEmailSent) {
      console.log("🎉 Booking completed successfully")
      return NextResponse.json({ success: true, message: "Booking confirmed!" })
    } else {
      console.log("⚠️ Booking saved but customer email failed")
      return NextResponse.json(
        {
          success: false,
          error: "Email sending failed",
          adminNotified: adminEmailSent,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("💥 Critical error in booking system:", error)
    return NextResponse.json(
      {
        success: false,
        error: "System error occurred",
      },
      { status: 500 },
    )
  }
}
