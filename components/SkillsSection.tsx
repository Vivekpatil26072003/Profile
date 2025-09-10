'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const technicalSkills = [
    { name: 'Python', emoji: '🐍', level: 'Advanced' },
    { name: 'SQL', emoji: '🗄️', level: 'Advanced' },
    { name: 'React.js', emoji: '⚛️', level: 'Intermediate' },
    { name: 'Next.js', emoji: '🚀', level: 'Intermediate' },
    { name: 'MySQL', emoji: '🐬', level: 'Intermediate' },
    { name: 'Power BI', emoji: '📊', level: 'Intermediate' },
    { name: 'TensorFlow', emoji: '🧠', level: 'Beginner' },
    { name: 'Git/GitHub', emoji: '📚', level: 'Intermediate' },
  ]

  const softSkills = [
    { name: 'Teamwork', emoji: '🤝', description: 'Collaborative team player' },
    { name: 'Flexibility', emoji: '🔄', description: 'Adaptable to change' },
    { name: 'Quick Learner', emoji: '⚡', description: 'Fast skill acquisition' },
    { name: 'Problem Solving', emoji: '💡', description: 'Analytical thinking' },
    { name: 'Communication', emoji: '💬', description: 'Clear and effective' },
    { name: 'Time Management', emoji: '⏰', description: 'Efficient organization' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section id="skills" className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">
            <span className="gradient-text">Skills & Expertise</span>
          </h2>
          <p className="section-subtitle">
            A comprehensive overview of my technical capabilities and soft skills that drive successful project delivery
          </p>
          <div className="divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-16"
        >
          {/* Technical Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Technical Skills
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-6 text-center h-full flex flex-col items-center justify-center relative">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {skill.emoji}
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 drop-shadow-sm">
                      {skill.name}
                    </h4>
                    <span className="text-sm font-semibold text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30">
                      {skill.level}
                    </span>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                      style={{ filter: 'blur(20px)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
              Soft Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group"
                  whileHover={{ scale: 1.02, y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="glass-card p-6 h-full relative">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {skill.emoji}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-2 drop-shadow-sm">
                          {skill.name}
                        </h4>
                        <p className="text-gray-200 text-base md:text-lg leading-relaxed font-medium">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 rounded-2xl opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                      style={{ filter: 'blur(20px)' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Summary */}
          <motion.div variants={itemVariants}>
            <div className="glass-card p-8 border border-primary/30 relative overflow-hidden">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-4 drop-shadow-sm">
                  Continuous Learning & Growth
                </h4>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed mx-auto mb-6 font-medium">
                  I believe in constantly expanding my skill set and staying updated with the latest technologies. 
                  My passion for learning drives me to explore new domains and take on challenging projects that push my boundaries.
                </p>
              </div>
              
              {/* Background glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.5 }}
                style={{ filter: 'blur(30px)' }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <motion.div
        className="absolute top-1/4 left-16 w-32 h-32 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-16 w-24 h-24 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 0.8, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </section>
  )
}
