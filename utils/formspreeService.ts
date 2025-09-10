// Formspree Email Service
export interface FormspreeResponse {
  success: boolean
  message: string
}

export interface FormspreeFormData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendFormspreeEmail = async (formData: FormspreeFormData): Promise<FormspreeResponse> => {
  try {
    // Formspree endpoint - you'll get this when you create your form
    const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'https://formspree.io/f/xpzgkqyw'
    
    // Check if Formspree endpoint is configured
    if (formspreeEndpoint === 'https://formspree.io/f/xpzgkqyw') {
      return {
        success: false,
        message: 'Formspree is not configured. Please set up your Formspree form and update the endpoint.'
      }
    }

    // Prepare form data for Formspree
    const formDataToSend = new FormData()
    formDataToSend.append('name', formData.name.trim())
    formDataToSend.append('email', formData.email.trim())
    formDataToSend.append('subject', formData.subject.trim())
    formDataToSend.append('message', formData.message.trim())
    formDataToSend.append('_replyto', formData.email.trim())
    formDataToSend.append('_subject', `New Contact Form Message: ${formData.subject.trim()}`)

    // Send to Formspree
    const response = await fetch(formspreeEndpoint, {
      method: 'POST',
      body: formDataToSend,
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response.ok) {
      return {
        success: true,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      }
    } else {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to send message')
    }
  } catch (error) {
    console.error('Formspree Error:', error)
    
    if (error instanceof Error) {
      if (error.message.includes('not configured')) {
        return {
          success: false,
          message: 'Form service is not configured. Please contact me directly at vivekpatil0088@gmail.com'
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

