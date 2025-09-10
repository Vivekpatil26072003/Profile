'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Award, Trophy, Users, BarChart3, GraduationCap, Eye, X } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export default function CertificatesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })
  
  const [selectedCertificateImage, setSelectedCertificateImage] = useState<string | null>(null)

  const certificates = [
    {
      title: 'Introduction on Generative AI – Artificial Intelligence and Machine Learning',
      issuer: 'National Skill Development Corporation (NSDC) | Skill India',
      description: 'Certificate of Completion for the Skill Development Program in Generative AI and Machine Learning. This comprehensive course covered artificial intelligence fundamentals, machine learning algorithms, and practical applications of generative AI technologies. Successfully completed under the Skill India initiative to enhance technical skills and industry readiness.',
      icon: Award,
      color: 'from-indigo-500 to-purple-500',
      date: '2025',
      category: 'Skill Development Program',
      certificateImage: '/generative-ai-certificate-2025.png',
    },
    {
      title: 'Certificate of Participation - TECH EXPO 2025',
      issuer: 'Parul University (NAAC Grade A++)',
      description: 'Acknowledged for exceptional innovation and creativity by showcasing outstanding talent during Tech Expo 2025. Exhibited a remarkable model and presentation titled "Sliding Door and Window Automation using IoT" at Parul University, Vadodara Campus on February 07th – 08th, 2025.',
      icon: Trophy,
      color: 'from-red-500 to-pink-500',
      date: '2025',
      category: 'Exhibition & Competition',
      certificateImage: '/tech-expo-2025-certificate.jpeg',
    },
    {
      title: 'Hackathon Participation',
      issuer: 'myOnsite Healthcare',
      description: 'Successfully participated in healthcare-focused hackathon, developing innovative solutions for patient care and medical data management.',
      icon: Trophy,
      color: 'from-yellow-500 to-orange-500',
      date: '2025',
      category: 'Competition',
      certificateImage: '/certificate-screenshot.png',
    },
    {
      title: 'Data Science',
      issuer: 'Reliance Foundation',
      description: 'Comprehensive training in data science fundamentals, machine learning algorithms, and data analysis techniques.',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      date: '2025',
      category: 'Professional Development',
      certificateImage: '/data-science-certificate-2025.png',
    },
    {
      title: 'Power BI Webinar',
      issuer: 'Parul University',
      description: 'Advanced data visualization and business intelligence training using Microsoft Power BI for effective data presentation.',
      icon: GraduationCap,
      color: 'from-green-500 to-emerald-500',
      date: '2024',
      category: 'University Program',
      certificateImage: '/power-bi-webinar-2024.png',
    },
    {
      title: 'Data Structures And Algorithms using Java',
      issuer: 'Infosys | Springboard',
      description: 'Course Completion Certification - Comprehensive training in data structures and algorithms using Java programming language, covering fundamental concepts and advanced problem-solving techniques.',
      icon: Award,
      color: 'from-purple-500 to-indigo-500',
      date: '2022',
      category: 'Course Completion',
      certificateImage: '/new-certificate.png',
    },
  ]

  return (
    <section id="certificates" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            <span className="gradient-text">Certificates</span> & Achievements
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="group"
            >
              <motion.div 
                className="glass-card p-6 h-full hover:bg-white/15 transition-all duration-500 hover:scale-105"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  scale: 1.05,
                  rotateY: 3,
                  rotateX: 1,
                  z: 15
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Certificate Icon */}
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${cert.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <cert.icon className="text-white" size={32} />
                </div>

                {/* Certificate Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-light mb-2">{cert.title}</h3>
                    <h4 className="text-lg font-medium text-primary mb-3">{cert.issuer}</h4>
                  </div>

                  <p className="text-light/80 leading-relaxed text-sm">{cert.description}</p>

                  {/* Certificate Details */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                      {cert.category}
                    </span>
                    <span className="text-sm text-light/60">{cert.date}</span>
                  </div>

                  {/* View Certificate Button - For certificates with images */}
                  {(cert.title === 'Introduction on Generative AI – Artificial Intelligence and Machine Learning' || cert.title === 'Certificate of Participation - TECH EXPO 2025' || cert.title === 'Hackathon Participation' || cert.title === 'Data Structures And Algorithms using Java' || cert.title === 'Data Science' || cert.title === 'Power BI Webinar') && (
                    <motion.button
                      onClick={() => setSelectedCertificateImage(cert.certificateImage)}
                      className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-lg border border-primary/30 hover:bg-primary/30 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye size={16} />
                      View Certificate
                    </motion.button>
                  )}
                                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

        {/* Additional Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="glass-card p-8 mx-auto"
        >
          <div className="text-center">
            <div className="inline-flex p-4 bg-primary/20 rounded-full mb-6">
              <Award className="text-primary" size={32} />
            </div>
            <h3 className="text-2xl font-semibold text-light mb-6">
              Continuous <span className="gradient-text">Growth</span>
            </h3>
            <p className="text-light/80 leading-relaxed text-lg mx-auto mb-6">
              These certificates represent my commitment to continuous learning and professional development. 
              I actively seek opportunities to enhance my skills and stay current with industry trends.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">6+</div>
                <div className="text-sm text-light/70">Certificates</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">3+</div>
                <div className="text-sm text-light/70">Years Learning</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">100%</div>
                <div className="text-sm text-light/70">Completion Rate</div>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                <div className="text-sm text-light/70">Learning Mindset</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center"
        >
          <div className="glass-card p-8 mx-auto">
            <h3 className="text-2xl font-semibold text-light mb-4">
              Ready to <span className="gradient-text">Learn More</span>?
            </h3>
            <p className="text-light/80 leading-relaxed text-lg mb-6">
              I'm always looking for new learning opportunities and challenges to expand my knowledge and skills.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Let's Connect
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificateImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificateImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificateImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <X size={24} />
            </button>
            
            {/* Certificate Image */}
            <div className="relative w-full h-full">
              <Image
                src={selectedCertificateImage}
                alt="Certificate"
                width={800}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
