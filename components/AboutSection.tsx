'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { User, Target, Users, Zap } from 'lucide-react'

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    { icon: Users, title: 'Team Bonding', description: 'Excellent at building strong relationships and fostering collaboration' },
    { icon: Zap, title: 'Quick Learner', description: 'Adapts rapidly to new technologies and methodologies' },
    { icon: Target, title: 'Adaptable', description: 'Thrives in dynamic environments and embraces change' },
  ]

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">
            About <span className="neon-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center gap-3">
                <User className="text-primary" size={28} />
                Who I Am
              </h3>
              <p className="text-white/80 leading-relaxed text-base md:text-lg">
                I am an enthusiastic and detail-oriented individual with a passion for technology and innovation. 
                My journey in the tech world has been driven by curiosity and a desire to create meaningful solutions 
                that make a difference.
              </p>
              <p className="text-white/80 leading-relaxed text-base md:text-lg mt-4">
                With knowledge in web development, AI/ML, and data analysis, I enjoy tackling complex challenges 
                and turning ideas into reality. I believe in continuous learning and staying updated with the latest 
                industry trends and technologies.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="glass-card p-6 hover:glass-card-hover transition-all duration-300 group card-3d"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 3,
                  rotateX: 1,
                  z: 15
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-all duration-300">
                    <skill.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-semibold text-white mb-2">
                      {skill.title}
                    </h4>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      {skill.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
