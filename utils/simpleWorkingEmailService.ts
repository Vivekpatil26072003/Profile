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
    // Use the existing API route that's already working
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: 'Message received! I\'ll get back to you soon. For immediate contact, please email me directly at vivekpatil0088@gmail.com'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to send message. Please try again or contact me directly at vivekpatil0088@gmail.com'
      };
    }
  } catch (error) {
    console.error('Email service error:', error);
    return {
      success: false,
      message: 'Network error. Please contact me directly at vivekpatil0088@gmail.com'
    };
  }
}
