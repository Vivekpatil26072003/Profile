'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  Mail, Phone, MapPin, Linkedin, Github, 
  Send, CheckCircle, AlertCircle, X 
} from 'lucide-react'
import { validateForm, isFormValid, FormErrors } from '../utils/formValidation'
import { sendEmail } from '../utils/gmailEmailService'

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [statusMessage, setStatusMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    
    // Clear error for this field when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const errors = validateForm(formData)
    setFormErrors(errors)
    
    if (!isFormValid(errors)) {
      return
    }
    
    setFormStatus('sending')
    setStatusMessage('')

    try {
      const response = await sendEmail(formData)
      
      if (response.success) {
        setFormStatus('success')
        setStatusMessage(response.message)
        setFormData({ name: '', email: '', subject: '', message: '' })
        setFormErrors({})
        
        // Reset success message after 8 seconds
        setTimeout(() => {
          setFormStatus('idle')
          setStatusMessage('')
        }, 8000)
      } else {
        setFormStatus('error')
        setStatusMessage(response.message)
        
        // Reset error message after 8 seconds
        setTimeout(() => {
          setFormStatus('idle')
          setStatusMessage('')
        }, 8000)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus('error')
      setStatusMessage('An unexpected error occurred. Please try again or contact me directly at vivekpatil0088@gmail.com')
      
      // Reset error message after 8 seconds
      setTimeout(() => {
        setFormStatus('idle')
        setStatusMessage('')
      }, 8000)
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '+91 63516 81472',
      link: 'tel:+916351681472',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'vivekpatil0088@gmail.com',
      link: 'mailto:vivekpatil0088@gmail.com',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      value: 'VivekPatil0088',
      link: 'http://www.linkedin.com/in/VivekPatil0088',
      color: 'from-blue-600 to-blue-800',
    },
  ]

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'http://www.linkedin.com/in/VivekPatil0088',
      color: 'hover:bg-blue-600',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Vivekpatil26072003',
      color: 'hover:bg-gray-800',
    },
  ]

  return (
    <section id="contact" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="glass-card p-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                scale: 1.01,
                rotateY: 2,
                rotateX: 1,
                z: 10
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-light mb-6">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-lg font-medium text-light/80 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-light placeholder-light/50 focus:outline-none transition-colors duration-300 ${
                        formErrors.name 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-white/20 focus:border-primary'
                      }`}
                      placeholder="Your Name"
                    />
                    {formErrors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <X size={14} />
                        {formErrors.name}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-light/80 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-light placeholder-light/50 focus:outline-none transition-colors duration-300 ${
                        formErrors.email 
                          ? 'border-red-500 focus:border-red-400' 
                          : 'border-white/20 focus:border-primary'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {formErrors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-1 flex items-center gap-1"
                      >
                        <X size={14} />
                        {formErrors.email}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-lg font-medium text-light/80 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-light placeholder-light/50 focus:outline-none transition-colors duration-300 ${
                      formErrors.subject 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/20 focus:border-primary'
                    }`}
                    placeholder="What's this about?"
                  />
                  {formErrors.subject && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      <X size={14} />
                      {formErrors.subject}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-light/80 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-light placeholder-light/50 focus:outline-none transition-colors duration-300 resize-none ${
                      formErrors.message 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-white/20 focus:border-primary'
                    }`}
                    placeholder="Tell me more about your project or inquiry..."
                  />
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center gap-1"
                    >
                      <X size={14} />
                      {formErrors.message}
                    </motion.p>
                  )}
                </div>

                {/* Form Status Messages */}
                {formStatus === 'success' && statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400"
                  >
                    <CheckCircle size={20} />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                {formStatus === 'error' && statusMessage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400"
                  >
                    <AlertCircle size={20} />
                    <span>{statusMessage}</span>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={formStatus !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== 'sending' ? { scale: 0.98 } : {}}
                >
                  {formStatus === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Information */}
            <motion.div 
              className="glass-card p-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                scale: 1.01,
                rotateY: 2,
                rotateX: 1,
                z: 10
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-light mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={info.title}
                    href={info.link}
                    target={info.title === 'LinkedIn' ? '_blank' : '_self'}
                    rel={info.title === 'LinkedIn' ? 'noopener noreferrer' : ''}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/10 transition-all duration-300 group"
                  >
                    <div className={`p-3 rounded-full bg-gradient-to-r ${info.color} group-hover:scale-110 transition-transform duration-300`}>
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-light/60">{info.title}</h4>
                      <p className="text-lg font-medium text-light group-hover:text-primary transition-colors duration-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              className="glass-card p-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                scale: 1.01,
                rotateY: 2,
                rotateX: 1,
                z: 10
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-light mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className={`p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 ${social.color}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="text-light" size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Additional Info */}
            <motion.div 
              className="glass-card p-8"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ 
                scale: 1.01,
                rotateY: 2,
                rotateX: 1,
                z: 10
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-semibold text-light mb-4">Let's Work Together</h3>
              <p className="text-light/80 leading-relaxed text-lg">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, I'll try my best to get back to you!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
