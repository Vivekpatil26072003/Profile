// Form validation utilities
export interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {}

  // Name validation
  if (!formData.name.trim()) {
    errors.name = 'Name is required'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long'
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Name must be less than 50 characters'
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required'
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address'
    }
  }

  // Subject validation
  if (!formData.subject.trim()) {
    errors.subject = 'Subject is required'
  } else if (formData.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters long'
  } else if (formData.subject.trim().length > 100) {
    errors.subject = 'Subject must be less than 100 characters'
  }

  // Message validation
  if (!formData.message.trim()) {
    errors.message = 'Message is required'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long'
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters'
  }

  return errors
}

export const isFormValid = (errors: FormErrors): boolean => {
  return Object.keys(errors).length === 0
}

