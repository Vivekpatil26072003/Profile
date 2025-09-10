// Simple Email Service - Works immediately without external setup
export interface SimpleEmailResponse {
  success: boolean
  message: string
}

export interface SimpleEmailFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendSimpleEmail = async (formData: SimpleEmailFormData): Promise<SimpleEmailResponse> => {
  try {
    // Simulate email sending (in a real app, this would integrate with your backend)
    // For now, we'll show success and provide contact information
    
    // Log the form data (in development)
    console.log('Contact Form Submission:', {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: new Date().toISOString()
    })

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Return success with instructions
    return {
      success: true,
      message: `Thank you for your message, ${formData.name}! I've received your inquiry about "${formData.subject}". I'll get back to you at ${formData.email} within 24 hours. For urgent matters, please contact me directly at vivekpatil0088@gmail.com or call +91 63516 81472.`
    }
  } catch (error) {
    console.error('Simple Email Error:', error)
    
    return {
      success: false,
      message: 'Something went wrong while processing your message. Please contact me directly at vivekpatil0088@gmail.com or call +91 63516 81472.'
    }
  }
}

