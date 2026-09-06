import nodemailer from 'nodemailer'

export const sendContactMessage = async (request, response) => {
  const { name, email, subject, message } = request.body
  if (!name || !email || !subject || !message) return response.status(400).json({ success: false, message: 'Name, email, subject, and message are required.' })
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD || !process.env.CONTACT_EMAIL) return response.status(503).json({ success: false, message: 'Contact email service is not configured.' })
  try {
    const transporter = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 587), secure: process.env.SMTP_SECURE === 'true', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } })
    await transporter.sendMail({ from: `KVAudio website <${process.env.SMTP_USER}>`, to: process.env.CONTACT_EMAIL, replyTo: email, subject: `[KVAudio contact] ${subject}`, text: `Name: ${name}\nEmail: ${email}\n\n${message}` })
    return response.json({ success: true, message: 'Your message has been sent successfully.' })
  } catch (error) { console.error('Contact email delivery error:', error.code || 'UNKNOWN', error.message || 'SMTP delivery failed'); return response.status(502).json({ success: false, message: 'Unable to send your message right now.' }) }
}
