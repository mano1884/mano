import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, subject, sessionDetails, totalAmount, sessionType, numberOfSessions, notes } =
      await request.json()

    // Create a transporter using your environment variables
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    })

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
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #333; font-weight: bold; width: 40%;">Subject:</td>
              <td style="padding: 8px 0; color: #666;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #333; font-weight: bold;">Session Type:</td>
              <td style="padding: 8px 0; color: #666;">${sessionType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #333; font-weight: bold;">Number of Sessions:</td>
              <td style="padding: 8px 0; color: #666;">${numberOfSessions} hour${numberOfSessions > 1 ? "s" : ""}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #333; font-weight: bold;">Total Amount:</td>
              <td style="padding: 8px 0; color: #f59e0b; font-weight: bold; font-size: 18px;">$${totalAmount}</td>
            </tr>
          </table>
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
            📧 unitutors7@gmail.com
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
      `,
    })

    return NextResponse.json({ success: true, message: "Emails sent successfully" })
  } catch (error) {
    console.error("Email sending failed:", error)
    return NextResponse.json({ success: false, error: "Failed to send email", details: error.message }, { status: 500 })
  }
}
