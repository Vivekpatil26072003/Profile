'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react'

export default function EducationSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const education = {
    degree: 'B.Tech (Information Technology)',
    university: 'Parul University',
    duration: '2021 - 2025',
    location: 'Vadodara, Gujarat',
    cgpa: '6.61',
    description: 'Comprehensive study of Information Technology covering software development, database management, web technologies, and emerging trends in the field.',
    highlights: [
      'Core IT subjects including Data Structures, Algorithms, and Database Systems',
      'Web Development and Programming Fundamentals',
      'Software Engineering and Project Management',
      'Networking and Cybersecurity basics',
      'Final year project in AI/ML applications'
    ]
  }

  return (
    <section id="education" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="w-full">
          {/* Main Education Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card p-8 mb-8"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ 
              scale: 1.01,
              rotateY: 2,
              rotateX: 1,
              z: 10
            }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                {/* Degree and University */}
                <div>
                  <h3 className="text-2xl font-bold text-light mb-2">{education.degree}</h3>
                  <h4 className="text-xl font-semibold text-primary mb-4">{education.university}</h4>
                </div>

                {/* Duration and Location */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-light/80">
                    <Calendar className="text-primary" size={20} />
                    <span>{education.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-light/80">
                    <MapPin className="text-primary" size={20} />
                    <span>{education.location}</span>
                  </div>
                </div>

                {/* CGPA */}
                <div className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 rounded-lg border border-primary/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="text-primary" size={24} />
                    <span className="text-lg font-semibold text-light">CGPA</span>
                  </div>
                  <div className="text-3xl font-bold gradient-text">{education.cgpa}</div>
                  <p className="text-sm text-light/70 mt-1">Out of 10.0</p>
                </div>
              </div>

              {/* Right Column - Description and Highlights */}
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-light mb-3">Program Overview</h4>
                  <p className="text-light/80 leading-relaxed">{education.description}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-light mb-3">Key Highlights</h4>
                  <ul className="space-y-2">
                    {education.highlights.map((highlight, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3 text-light/80"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{highlight}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Additional Education Info */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="glass-card p-8"
            style={{ transformStyle: 'preserve-3d' }}
            whileHover={{ 
              scale: 1.01,
              rotateY: 2,
              rotateX: 1,
              z: 10
            }}
          >
            <div className="text-center">
              <div className="inline-flex p-4 bg-primary/20 rounded-full mb-6">
                <GraduationCap className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-light mb-4">
                Continuous <span className="gradient-text">Learning</span>
              </h3>
              <p className="text-light/80 leading-relaxed text-lg mx-auto">
                Beyond formal education, I actively pursue self-learning through online courses, 
                hackathons, and personal projects. I believe in staying updated with the latest 
                technologies and industry best practices to enhance my skills continuously.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
