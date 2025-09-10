'use client'

import { motion } from 'framer-motion'
import { ChevronDown, Download, Mail, Code, Database, Brain } from 'lucide-react'
import Image from 'next/image'

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background animated trading-style shapes */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse -top-20 -left-40"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-yellow-500/10 to-pink-500/20 rounded-full blur-3xl animate-pulse bottom-0 right-0"></div>
      </div>

      <div className="container-custom z-10 w-full">
        <div className="flex flex-col items-center justify-center gap-12">
          {/* Hero Section: Profile and Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full text-center space-y-6"
          >
            {/* Greeting */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-primary text-lg font-medium mt-20"
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-light"
            >
              Vivek Patil
            </motion.h1>


            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl lg:text-2xl text-light/80 mx-auto leading-relaxed"
            >
              Enthusiastic and detail-oriented individual skilled in Python, SQL, React.js, Next.js, AI/ML, and data visualization. 
              Passionate about creating innovative solutions and exploring the latest technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <motion.button
                onClick={scrollToContact}
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-all duration-300 flex items-center gap-2 group text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Get In Touch
              </motion.button>
              
              <motion.button
                onClick={() => {
                  // Create a dropdown menu for resume options
                  const dropdown = document.createElement('div')
                  dropdown.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50'
                  dropdown.onclick = () => document.body.removeChild(dropdown)
                  
                  const menu = document.createElement('div')
                  menu.className = 'bg-dark border border-white/20 rounded-lg p-4 shadow-xl'
                  menu.onclick = (e) => e.stopPropagation()
                  
                  const title = document.createElement('h3')
                  title.className = 'text-light font-semibold mb-3 text-center'
                  title.textContent = 'Choose Resume Format'
                  
                  const options = [
                    { text: '📄 HTML (Convert to PDF)', file: '/resume.html', filename: 'Vivek_Patil_Resume.html' }
                  ]
                  
                  const buttons = options.map(option => {
                    const btn = document.createElement('button')
                    btn.className = 'w-full px-4 py-2 mb-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors duration-300 text-left text-lg'
                    btn.textContent = option.text
                    btn.onclick = () => {
                      const link = document.createElement('a')
                      link.href = option.file
                      link.download = option.filename
                      document.body.appendChild(link)
                      link.click()
                      document.body.removeChild(link)
                      document.body.removeChild(dropdown)
                    }
                    return btn
                  })
                  
                  menu.appendChild(title)
                  buttons.forEach(btn => menu.appendChild(btn))
                  dropdown.appendChild(menu)
                  document.body.appendChild(dropdown)
                }}
                className="px-6 py-3 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-white transition-all duration-300 flex items-center gap-2 group text-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={20} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Core Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="w-full mt-10"
          >
            {/* Enhanced title for expertise section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-8"
            >
              <h3 className="text-3xl font-bold text-primary mb-2">Core Expertise</h3>
              <p className="text-base text-gray-400">My key technical skills and specializations</p>
            </motion.div>
            
            {/* Professional Info Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Web Development Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Code className="w-8 h-8 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-light mb-2">Web Development</h4>
                  <p className="text-sm text-gray-400">React.js, Next.js, TypeScript, Tailwind CSS</p>
                </div>
              </motion.div>

              {/* AI/ML Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="bg-gradient-to-r from-secondary/10 to-accent/10 border border-secondary/20 rounded-xl p-6 backdrop-blur-sm hover:border-secondary/40 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-secondary" />
                  </div>
                  <h4 className="text-xl font-semibold text-light mb-2">AI & Machine Learning</h4>
                  <p className="text-sm text-gray-400">Python, TensorFlow, Scikit-learn, Neural Networks</p>
                </div>
              </motion.div>

              {/* Data Analysis Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.8 }}
                className="bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20 rounded-xl p-6 backdrop-blur-sm hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="text-center">
                  <div className="p-3 bg-accent/20 rounded-lg group-hover:bg-accent/30 transition-colors w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Database className="w-8 h-8 text-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-light mb-2">Data Analysis</h4>
                  <p className="text-sm text-gray-400">SQL, Pandas, Data Visualization, Statistical Analysis</p>
                </div>
              </motion.div>
            </div>
            
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-light/60"
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

