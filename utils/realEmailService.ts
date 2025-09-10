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
    // Create a mailto link that will open the user's email client
    const emailSubject = encodeURIComponent(`New Contact Form Message: ${formData.subject}`);
    const emailBody = encodeURIComponent(`
New message from your portfolio contact form:

Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
This message was sent from your portfolio contact form.
    `);
    
    const mailtoLink = `mailto:vivekpatil0088@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    
    // Open the user's email client
    window.open(mailtoLink, '_blank');
    
    return {
      success: true,
      message: 'Email client opened! Please send the email to complete your message.'
    };

  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Unable to send message. Please contact me directly at vivekpatil0088@gmail.com'
    };
  }
}
