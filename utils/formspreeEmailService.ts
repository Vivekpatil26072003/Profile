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
    // Formspree endpoint - replace with your actual form endpoint
    const formspreeEndpoint = 'https://formspree.io/f/xpzgkqyw' // Replace with your actual endpoint
    
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
    return {
      success: false,
      message: 'Unable to send message. Please contact me directly at vivekpatil0088@gmail.com'
    }
  }
}
