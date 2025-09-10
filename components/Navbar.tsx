'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container-custom w-full">
        <div className="flex items-center justify-between h-16 lg:h-18 xl:h-20 px-1 sm:px-4">
          {/* Logo */}
          <motion.div
            className="text-2xl lg:text-3xl xl:text-4xl font-bold gradient-text mobile-logo"
            whileHover={{ scale: 1.05 }}
          >
            VP
          </motion.div>

                     {/* Desktop Navigation */}
           <div className="hidden md:flex space-x-6 lg:space-x-8 xl:space-x-10">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-light/80 hover:text-primary transition-colors duration-200 relative group text-sm lg:text-base xl:text-lg"
                whileHover={{ y: -2 }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </motion.button>
            ))}
          </div>

                     {/* Mobile Menu Button */}
           <motion.button
             onClick={() => setIsOpen(!isOpen)}
             className="md:hidden mobile-menu-btn p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-light hover:text-primary transition-all duration-300 border border-white/20 hover:border-primary/50"
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             aria-label="Toggle mobile menu"
           >
             <div className="relative w-6 h-6 flex items-center justify-center">
               {isOpen ? <X size={24} /> : <Menu size={24} />}
             </div>
           </motion.button>
        </div>

                 {/* Mobile Navigation */}
         <motion.div
           className={`md:hidden overflow-hidden transition-all duration-300 ${
             isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
           }`}
         >
           <div className="py-4 px-3 sm:px-4 bg-dark/95 backdrop-blur-lg border-t border-white/10 mt-2 rounded-b-lg mx-3 sm:mx-4">
             <div className="space-y-2">
               {navItems.map((item) => (
                 <motion.button
                   key={item.name}
                   onClick={() => scrollToSection(item.href)}
                   className="block w-full text-left px-4 py-3 text-light/80 hover:text-primary hover:bg-white/10 rounded-lg transition-all duration-200 border border-transparent hover:border-primary/30 text-sm sm:text-base"
                   whileHover={{ x: 5 }}
                   whileTap={{ scale: 0.98 }}
                 >
                   {item.name}
                 </motion.button>
               ))}
             </div>
           </div>
         </motion.div>
      </div>
    </motion.nav>
  )
}
