import { Resend } from 'resend'
import nodemailer from 'nodemailer'

// Initialize Resend (preferred)
const resend = new Resend(process.env.RESEND_API_KEY)

// Fallback to Nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface EmailTemplate {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export class EmailService {
  static async sendEmail(template: EmailTemplate): Promise<boolean> {
    try {
      // Try Resend first
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: process.env.FROM_EMAIL || 'noreply@ablakwa.gov.gh',
          to: Array.isArray(template.to) ? template.to : [template.to],
          subject: template.subject,
          html: template.html,
          text: template.text,
        })
        return true
      }

      // Fallback to Nodemailer
      if (process.env.SMTP_HOST) {
        await transporter.sendMail({
          from: process.env.FROM_EMAIL || 'noreply@ablakwa.gov.gh',
          to: template.to,
          subject: template.subject,
          html: template.html,
          text: template.text,
        })
        return true
      }

      console.warn('No email service configured')
      return false
    } catch (error) {
      console.error('Email sending failed:', error)
      return false
    }
  }

  // Contact form email to admin
  static async sendContactNotification(contactData: {
    name: string
    email: string
    subject: string
    message: string
  }): Promise<boolean> {
    const template: EmailTemplate = {
      to: process.env.ADMIN_EMAIL || 'admin@ablakwa.gov.gh',
      subject: `New Contact Form Submission: ${contactData.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>New Contact Form Submission</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #f59e0b; padding: 20px; text-align: center; color: white; }
              .content { padding: 20px; background: #f9fafb; }
              .field { margin-bottom: 15px; }
              .label { font-weight: bold; color: #374151; }
              .value { background: white; padding: 10px; border-radius: 5px; border: 1px solid #d1d5db; }
              .message { min-height: 100px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${contactData.name}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${contactData.email}</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${contactData.subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value message">${contactData.message.replace(/\n/g, '<br>')}</div>
              </div>
              <p><small>Submitted at: ${new Date().toLocaleString()}</small></p>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
Subject: ${contactData.subject}

Message:
${contactData.message}

Submitted at: ${new Date().toLocaleString()}
      `
    }

    return this.sendEmail(template)
  }

  // Auto-reply email to contact form submitter
  static async sendContactAutoReply(contactData: {
    name: string
    email: string
    subject: string
  }): Promise<boolean> {
    const template: EmailTemplate = {
      to: contactData.email,
      subject: `Thank you for contacting Hon. Samuel Okudzeto Ablakwa`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Thank you for your message</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #f59e0b; padding: 30px; text-align: center; color: white; }
              .content { padding: 30px; background: #f9fafb; }
              .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #d1d5db; }
              .footer { background: #374151; color: white; padding: 20px; text-align: center; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Thank You for Your Message</h1>
            </div>
            <div class="content">
              <p>Dear ${contactData.name},</p>
              
              <p>Thank you for reaching out to the office of Hon. Samuel Okudzeto Ablakwa, 
              Minister for Foreign Affairs of Ghana.</p>
              
              <p>We have received your message regarding "<strong>${contactData.subject}</strong>" 
              and will review it carefully. Our team will respond to your inquiry within 2-3 business days.</p>
              
              <p>If your matter is urgent, please contact our office directly:</p>
              <ul>
                <li>Phone: +233 (0) 302 664 951</li>
                <li>Email: info@mfa.gov.gh</li>
              </ul>
              
              <div class="signature">
                <p>Best regards,<br>
                <strong>Office of Hon. Samuel Okudzeto Ablakwa</strong><br>
                Minister for Foreign Affairs<br>
                Republic of Ghana</p>
              </div>
            </div>
            <div class="footer">
              <p>This is an automated response. Please do not reply to this email.</p>
              <p>© 2024 Office of Hon. Samuel Okudzeto Ablakwa. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Dear ${contactData.name},

Thank you for reaching out to the office of Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs of Ghana.

We have received your message regarding "${contactData.subject}" and will review it carefully. Our team will respond to your inquiry within 2-3 business days.

If your matter is urgent, please contact our office directly:
- Phone: +233 (0) 302 664 951
- Email: info@mfa.gov.gh

Best regards,
Office of Hon. Samuel Okudzeto Ablakwa
Minister for Foreign Affairs
Republic of Ghana

This is an automated response. Please do not reply to this email.
© 2024 Office of Hon. Samuel Okudzeto Ablakwa. All rights reserved.
      `
    }

    return this.sendEmail(template)
  }

  // Newsletter signup confirmation
  static async sendNewsletterConfirmation(email: string, name?: string): Promise<boolean> {
    const template: EmailTemplate = {
      to: email,
      subject: 'Welcome to Hon. Samuel Okudzeto Ablakwa\'s Newsletter',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Newsletter Subscription Confirmed</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: #f59e0b; padding: 30px; text-align: center; color: white; }
              .content { padding: 30px; background: #f9fafb; }
              .footer { background: #374151; color: white; padding: 20px; text-align: center; font-size: 12px; }
              .button { display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Welcome to Our Newsletter!</h1>
            </div>
            <div class="content">
              <p>Dear ${name || 'Subscriber'},</p>
              
              <p>Thank you for subscribing to the newsletter from the office of 
              Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs.</p>
              
              <p>You'll receive updates on:</p>
              <ul>
                <li>Foreign affairs developments</li>
                <li>Diplomatic initiatives</li>
                <li>International trade opportunities</li>
                <li>Ministry announcements</li>
                <li>Speech transcripts and reports</li>
              </ul>
              
              <p>Stay connected with our work serving Ghana's interests on the global stage.</p>
              
              <a href="${process.env.NEXT_PUBLIC_BASE_URL || 'https://ablakwa.gov.gh'}" class="button">
                Visit Our Website
              </a>
            </div>
            <div class="footer">
              <p>You can unsubscribe at any time by replying to this email with "UNSUBSCRIBE"</p>
              <p>© 2024 Office of Hon. Samuel Okudzeto Ablakwa. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Dear ${name || 'Subscriber'},

Thank you for subscribing to the newsletter from the office of Hon. Samuel Okudzeto Ablakwa, Minister for Foreign Affairs.

You'll receive updates on:
- Foreign affairs developments
- Diplomatic initiatives  
- International trade opportunities
- Ministry announcements
- Speech transcripts and reports

Stay connected with our work serving Ghana's interests on the global stage.

Visit our website: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://ablakwa.gov.gh'}

You can unsubscribe at any time by replying to this email with "UNSUBSCRIBE"
© 2024 Office of Hon. Samuel Okudzeto Ablakwa. All rights reserved.
      `
    }

    return this.sendEmail(template)
  }

  // System notification emails (for admin alerts)
  static async sendSystemNotification(
    type: 'error' | 'warning' | 'info',
    subject: string,
    message: string,
    details?: any
  ): Promise<boolean> {
    const template: EmailTemplate = {
      to: process.env.ADMIN_EMAIL || 'admin@ablakwa.gov.gh',
      subject: `[${type.toUpperCase()}] ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>System Notification</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .header { background: ${type === 'error' ? '#dc2626' : type === 'warning' ? '#d97706' : '#2563eb'}; padding: 20px; text-align: center; color: white; }
              .content { padding: 20px; background: #f9fafb; }
              .details { background: #f3f4f6; padding: 15px; border-radius: 5px; margin: 15px 0; font-family: monospace; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>System Notification - ${type.toUpperCase()}</h1>
            </div>
            <div class="content">
              <h2>${subject}</h2>
              <p>${message}</p>
              ${details ? `<div class="details">${JSON.stringify(details, null, 2)}</div>` : ''}
              <p><small>Timestamp: ${new Date().toISOString()}</small></p>
            </div>
          </body>
        </html>
      `,
      text: `
System Notification - ${type.toUpperCase()}

Subject: ${subject}
Message: ${message}

${details ? `Details: ${JSON.stringify(details, null, 2)}` : ''}

Timestamp: ${new Date().toISOString()}
      `
    }

    return this.sendEmail(template)
  }
} 