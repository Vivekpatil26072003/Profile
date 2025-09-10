// EmailJS Configuration
// Replace these values with your actual EmailJS credentials
export const emailjsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id_here',
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id_here',
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key_here',
}

// Email template parameters
export interface EmailTemplateParams {
  from_name: string
  from_email: string
  subject: string
  message: string
  to_email: string
}

