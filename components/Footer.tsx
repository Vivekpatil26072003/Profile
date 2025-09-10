'use client'

import { motion } from 'framer-motion'
import { Linkedin, Github, Mail, Heart } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

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
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:vivekpatil0088@gmail.com',
      color: 'hover:bg-red-600',
    },
  ]

  return (
    <footer className="bg-dark/50 border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5" />
      
      <div className="container-custom relative z-10">
        <div className="py-12">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold gradient-text mb-4"
              >
                Vivek Patil
              </motion.h3>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg font-semibold text-light mb-4"
              >
                Quick Links
              </motion.h4>
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-2"
              >
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-lg text-light/70 hover:text-primary transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <motion.h4
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-lg font-semibold text-light mb-4"
              >
                Contact
              </motion.h4>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2 text-lg text-light/70"
              >
                <p>vivekpatil0088@gmail.com</p>
                <p>+91 63516 81472</p>
              </motion.div>
            </div>
          </div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-white/10 rounded-full text-light hover:text-white transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-base text-light/60"
          >
            <p className="flex items-center justify-center gap-2">
              © {currentYear} Vivek Patil. Made with{' '}
              <Heart className="text-red-500 animate-pulse" size={16} />{' '}
              using Next.js & Tailwind CSS
            </p>
          </motion.div>
        </div>
      </div>

      {/* 3D Floating Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.3, 0.6, 0.3],
          rotateX: [0, 180, 360],
          rotateY: [0, 90, 180, 270, 360],
          z: [0, 80, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-secondary/10 rounded-full blur-2xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          scale: [1, 1.3, 1], 
          opacity: [0.3, 0.5, 0.3],
          rotateX: [0, -180, -360],
          rotateY: [0, -90, -180, -270, -360],
          z: [0, -60, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />
      
      {/* Additional 3D Footer Elements */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-12 h-12 bg-accent/10 rounded-full blur-xl"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ 
          scale: [1, 1.5, 0.8, 1.5, 1], 
          opacity: [0.2, 0.4, 0.2],
          rotateX: [0, 90, 180, 270, 360],
          rotateZ: [0, 45, 90, 135, 180],
          z: [0, 50, 0, -50, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 2 }}
      />
    </footer>
  )
}
