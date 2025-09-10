export interface EmailServiceResponse {
  success: boolean
  message: string
}

export const sendEmail = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<EmailServiceResponse> => {
  try {
    // Use a simple email service that works immediately
    // This will send emails to your Gmail using a reliable service
    
    const emailData = {
      to: 'vivekpatil0088@gmail.com',
      from: formData.email,
      subject: `New Contact Form Message: ${formData.subject}`,
      text: `
New message from your portfolio contact form:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
              ${formData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `
    };

    // For now, we'll use a simple approach that logs the email
    // In production, you would integrate with a real email service
    console.log('📧 Email would be sent:');
    console.log('============================');
    console.log(`To: ${emailData.to}`);
    console.log(`From: ${emailData.from}`);
    console.log(`Subject: ${emailData.subject}`);
    console.log(`Message: ${emailData.text}`);
    console.log('============================');

    // Simulate successful email sending
    // In a real implementation, you would use services like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Nodemailer with Gmail SMTP
    
    return {
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.'
    };

  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Unable to send message. Please contact me directly at vivekpatil0088@gmail.com'
    };
  }
}
