import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const sessionDetails = formData.get("sessionDetails") as string
    const totalAmount = formData.get("totalAmount") as string
    const sessionType = formData.get("sessionType") as string
    const numberOfSessions = formData.get("numberOfSessions") as string
    const notes = formData.get("notes") as string

    // Handle file attachments
    const files = formData.getAll("files") as File[]

    // Create a transporter using your environment variables
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

    // Prepare attachments
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

    // Email content
    const emailHtml = `
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
            <strong>Number of Sessions:</strong>   <span style="color: #f59e0b;">${numberOfSessions} hour${numberOfSessions > 1 ? "s" : ""}</span>
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

    // Send email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "UniTutors - Booking Confirmation",
      html: emailHtml,
      replyTo: process.env.EMAIL_FROM,
      attachments: attachments, // Include file attachments
    })

    // Send notification to admin (optional)
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_FROM, // Send to yourself for notifications
      subject: `New Booking: ${name} - ${subject}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Student:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Session Type:</strong> ${sessionType}</p>
        <p><strong>Sessions:</strong> ${numberOfSessions}</p>
        <p><strong>Total Amount:</strong> $${totalAmount}</p>
        <p><strong>Schedule:</strong></p>
        <div>${sessionDetails}</div>
        ${notes ? `<p><strong>Additional Notes:</strong></p><div>${notes}</div>` : ""}
        ${files.length > 0 ? `<p><strong>Files attached:</strong> ${files.length} file(s)</p>` : ""}
      `,
      attachments: attachments, // Include file attachments in admin email too
    })

    return NextResponse.json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, error: "Failed to send email", details: error.message }, { status: 500 })
  }
}
