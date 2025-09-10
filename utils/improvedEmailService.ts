import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../emailjs.config'

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
      // Fallback to API route
      console.log('EmailJS not configured, using fallback API route')
      return await sendEmailViaAPI(formData)
    }

    // Try EmailJS first
    try {
      // Initialize EmailJS
      emailjs.init(emailjsConfig.publicKey)

      // Prepare template parameters
      const templateParams = {
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
        throw new Error('EmailJS failed')
      }
    } catch (emailjsError) {
      console.log('EmailJS failed, trying fallback API route')
      return await sendEmailViaAPI(formData)
    }

  } catch (error) {
    console.error('Email service error:', error)
    return {
      success: false,
      message: 'Unable to send message. Please contact me directly at vivekpatil0088@gmail.com'
    }
  }
}

// Fallback API route function
const sendEmailViaAPI = async (formData: {
  name: string
  email: string
  subject: string
  message: string
}): Promise<EmailServiceResponse> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const result = await response.json()

    if (result.success) {
      return {
        success: true,
        message: result.message
      }
    } else {
      return {
        success: false,
        message: result.message || 'Failed to send message. Please try again or contact me directly at vivekpatil0088@gmail.com'
      }
    }
  } catch (error) {
    console.error('API route error:', error)
    return {
      success: false,
      message: 'Network error. Please contact me directly at vivekpatil0088@gmail.com'
    }
  }
}
