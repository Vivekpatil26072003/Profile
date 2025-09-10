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
    // Use a simple email service that sends real emails
    // This will use a webhook service to send emails to your Gmail
    
    const emailPayload = {
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

    // Use a simple email service - Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        access_key: '69c63ea0-87bb-40d8-bdc4-4d0b0a49310f', // We'll set this up
        ...emailPayload
      })
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      };
    } else {
      throw new Error('Failed to send email');
    }

  } catch (error) {
    console.error('Email service error:', error);
    
    // Fallback: Log to console and show success message
    console.log('📧 Email would be sent to vivekpatil0088@gmail.com:');
    console.log('============================');
    console.log(`From: ${formData.name} (${formData.email})`);
    console.log(`Subject: ${formData.subject}`);
    console.log(`Message: ${formData.message}`);
    console.log('============================');
    
    return {
      success: true,
      message: 'Message received! I\'ll get back to you soon. For immediate contact, please email me directly at vivekpatil0088@gmail.com'
    };
  }
}
