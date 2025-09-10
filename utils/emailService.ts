import emailjs from '@emailjs/browser'
import { emailjsConfig, EmailTemplateParams } from '../emailjs.config'

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
    // Check if EmailJS is properly configured
    if (
      emailjsConfig.serviceId === 'your_service_id_here' ||
      emailjsConfig.templateId === 'your_template_id_here' ||
      emailjsConfig.publicKey === 'your_public_key_here' ||
      !emailjsConfig.serviceId ||
      !emailjsConfig.templateId ||
      !emailjsConfig.publicKey
    ) {
      throw new Error('EmailJS is not properly configured. Please check your environment variables.')
    }

    // Initialize EmailJS
    emailjs.init(emailjsConfig.publicKey)

    // Prepare template parameters
    const templateParams: EmailTemplateParams = {
      from_name: formData.name.trim(),
      from_email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      to_email: 'vivekpatil0088@gmail.com', // Your email address
    }

    // Send email
    const response = await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      templateParams
    )

    if (response.status === 200) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      }
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    console.error('EmailJS Error:', error)
    
    // Return user-friendly error messages
    if (error instanceof Error) {
      if (error.message.includes('not properly configured')) {
        return {
          success: false,
          message: 'Email service is not configured. Please contact me directly at vivekpatil0088@gmail.com'
        }
      }
      
      if (error.message.includes('Invalid email')) {
        return {
          success: false,
          message: 'Please enter a valid email address.'
        }
      }
      
      if (error.message.includes('Network')) {
        return {
          success: false,
          message: 'Network error. Please check your internet connection and try again.'
        }
      }
    }
    
    return {
      success: false,
      message: 'Something went wrong while sending your message. Please try again or contact me directly at vivekpatil0088@gmail.com'
    }
  }
}
