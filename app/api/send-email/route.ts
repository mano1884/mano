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
    if (
      !process.env.EMAIL_SERVER_HOST ||
      !process.env.EMAIL_SERVER_USER ||
      !process.env.EMAIL_SERVER_PASSWORD ||
      !process.env.EMAIL_FROM
    ) {
      console.error("❌ Missing one or more email environment variables (HOST, USER, PASSWORD, FROM)")
      return NextResponse.json(
        {
          success: false,
          error:
            "Email configuration missing. Please ensure EMAIL_SERVER_HOST, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, and EMAIL_FROM are set.",
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
    console.log(`📎 Found ${attachments.length} file(s) to attach.`)

    // Create transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT) || 587, // Default to 587 if not set
      secure: false, // Use 'true' for port 465 (SSL/TLS), 'false' for other ports (STARTTLS)
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
      tls: {
        // Do not reject unauthorized certificates. Use with caution in production.
        // This is often needed for self-signed certs or some providers.
        rejectUnauthorized: false,
      },
    })

    console.log("🔧 Transporter created, attempting to verify connection...")

    // Test the connection
    try {
      await transporter.verify()
      console.log("✅ Email server connection successful")
    } catch (verifyError: any) {
      console.error("❌ Email server connection failed during verify:", verifyError.message)
      return NextResponse.json(
        {
          success: false,
          error: `Cannot connect to email server: ${verifyError.message}. Please check host, port, and authentication details.`,
        },
        { status: 500 },
      )
    }

    // Email content for customer
    const customerEmailHtml = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>UniTutors Booking Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
<div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px;">
  <!-- Header -->
  <div style="text-align: center; padding: 20px 0; background: linear-gradient(135deg, #000000, #2d1810); border-radius: 8px; margin-bottom: 30px;">
    <h1 style="color: #f59e0b; margin: 0; font-size: 28px; text-shadow: 0 0 10px rgba(245, 158, 11, 0.3);">
      UniTutors
    </h1>
    <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">
      Booking Confirmation
    </p>
  </div>
  
  <!-- Main Content -->
  <div style="padding: 0 20px;">
    <h2 style="color: #333333; margin-bottom: 20px;">Hello ${name}!</h2>
    
    <p style="color: #666666; line-height: 1.6; margin-bottom: 25px;">
      Thank you for booking a tutoring session with UniTutors. We're excited to help you excel in your studies! 
      Here are your session details:
    </p>
    
    <!-- Booking Details -->
    <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 25px;">
      <h3 style="color: #f59e0b; margin-top: 0; margin-bottom: 15px;">Booking Summary</h3>
      
      <p style="margin: 8px 0; color: #333; line-height: 1.6;">
        <strong>Subject:</strong>   <span style="color: #f59e0b;">${subject}</span>
      </p>
      <p style="margin: 8px 0; color: #333; line-height: 1.6;">
        <strong>Session Type:</strong>   <span style="color: #f59e0b;">${sessionType}</span>
      </p>
      <p style="margin: 8px 0; color: #333; line-height: 1.6;">
        <strong>Number of Sessions:</strong>   <span style="color: #f59e0b;">${numberOfSessions} hour${Number(numberOfSessions) > 1 ? "s" : ""}</span>
      </p>
      <p style="margin: 8px 0; color: #333; line-height: 1.6;">
        <strong>Total Amount:</strong>   <span style="color: #f59e0b; font-size: 14px;">$${totalAmount}</span>
      </p>
    </div>
    
    <!-- Session Schedule -->
    <div style="background-color: #fff8e1; padding: 25px; border-radius: 8px; border: 1px solid #f59e0b; margin-bottom: 25px;">
      <h3 style="color: #f59e0b; margin-top: 0; margin-bottom: 15px;">Scheduled Sessions</h3>
      <div style="color: #666; line-height: 1.8;">
        ${sessionDetails}
      </div>
    </div>
    
    ${
      notes
        ? `
    <!-- Additional Notes -->
    <div style="background-color: #e8f5e8; padding: 25px; border-radius: 8px; border: 1px solid #4caf50; margin-bottom: 25px;">
      <h3 style="color: #4caf50; margin-top: 0; margin-bottom: 15px;">Additional Notes</h3>
      <div style="color: #666; line-height: 1.6;">
        ${notes}
      </div>
    </div>
    `
        : ""
    }
    
    <!-- Contact Information -->
    <div style="text-align: center; padding: 20px; background-color: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
      <p style="color: #666; margin: 0 0 10px 0;">
        Questions about your booking?
      </p>
      <p style="color: #f59e0b; font-weight: bold; margin: 0;">
        Simply reply to this message and we'll get back to you!
      </p>
    </div>
    
    <p style="color: #666; line-height: 1.6; margin-bottom: 0;">
      Thank you for choosing UniTutors. We look forward to helping you achieve academic excellence!
    </p>
    
    <p style="color: #f59e0b; font-weight: bold; margin-top: 20px;">
      Best regards,<br>
      The UniTutors Team
    </p>
  </div>
  
  <!-- Footer -->
  <div style="text-align: center; padding: 20px; margin-top: 30px; border-top: 1px solid #eee;">
    <p style="color: #999; font-size: 12px; margin: 0;">
      © ${new Date().getFullYear()} UniTutors. All rights reserved.
    </p>
  </div>
</div>
</body>
</html>
`

    // Admin notification email content
    const adminEmailHtml = `
<h2>🚨 NEW BOOKING RECEIVED</h2>
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin-bottom: 20px;">
<h3 style="color: #f59e0b; margin-top: 0;">Student Information</h3>
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Subject:</strong> ${subject}</p>
<p><strong>Session Type:</strong> ${sessionType}</p>
<p><strong>Number of Sessions:</strong> ${numberOfSessions}</p>
<p><strong>Total Amount:</strong> $${totalAmount}</p>
</div>

<div style="background-color: #fff8e1; padding: 20px; border-radius: 8px; border: 1px solid #f59e0b; margin-bottom: 20px;">
<h3 style="color: #f59e0b; margin-top: 0;">Schedule</h3>
${sessionDetails}
</div>

${
  notes
    ? `
<div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border: 1px solid #4caf50; margin-bottom: 20px;">
<h3 style="color: #4caf50; margin-top: 0;">Additional Notes</h3>
<div>${notes}</div>
</div>
`
    : ""
}

${attachments.length > 0 ? `<p><strong>📎 Files attached:</strong> ${attachments.length} file(s)</p>` : ""}

<p style="color: #666; font-size: 12px; margin-top: 30px;">
This is an automated notification from the UniTutors booking system.
</p>
`

    let customerEmailSent = false
    let adminEmailSent = false

    // Try to send customer email first
    try {
      console.log("📤 Attempting to send customer email...")
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "UniTutors - Booking Confirmation",
        html: customerEmailHtml,
        replyTo: process.env.EMAIL_FROM,
        attachments: attachments,
      })
      customerEmailSent = true
      console.log("✅ Customer email sent successfully.")
    } catch (customerEmailError: any) {
      console.error("❌ Customer email failed:", customerEmailError.message)
    }

    // Always try to send admin notification (even if customer email fails)
    try {
      console.log("📤 Attempting to send admin email...")
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: `🚨 NEW BOOKING: ${name} - ${subject} ${customerEmailSent ? "" : "(Customer email failed)"}`,
        html: adminEmailHtml,
        attachments: attachments,
      })
      adminEmailSent = true
      console.log("✅ Admin email sent successfully.")
    } catch (adminEmailError: any) {
      console.error("❌ Admin email failed:", adminEmailError.message)
    }

    // Return success only if customer email was sent successfully
    if (customerEmailSent) {
      console.log("🎉 Booking process completed successfully (customer email sent).")
      return NextResponse.json({ success: true, message: "Emails sent successfully" })
    } else {
      // Even if customer email fails, we still want to know about the booking
      console.log("⚠️ Booking process completed, but customer email failed to send.")
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send confirmation email to customer.",
          adminNotified: adminEmailSent,
        },
        { status: 500 },
      )
    }
  } catch (error: any) {
    console.error("💥 Critical error in booking system POST handler:", error.message)

    // Try to send at least an admin notification about the error
    try {
      const transporter = nodemailer.createTransporter({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      })

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_FROM,
        subject: "🚨 BOOKING SYSTEM ERROR - Manual Follow-up Required",
        html: `
          <h2>⚠️ BOOKING SYSTEM ERROR</h2>
          <p>A booking attempt was made but the system encountered a critical error.</p>
          <p><strong>Error:</strong> ${error.message}</p>
          <p><strong>Time:</strong> ${new Date().toISOString()}</p>
          <p>Please check the system logs and contact the user manually if needed.</p>
        `,
      })
      console.log("✅ Emergency admin error notification sent.")
    } catch (emergencyEmailError: any) {
      console.error("❌ Emergency admin notification also failed:", emergencyEmailError.message)
    }

    return NextResponse.json(
      { success: false, error: "Failed to process booking due to system error.", details: error.message },
      { status: 500 },
    )
  }
}
