'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Calendar, MapPin, Code2, Database } from 'lucide-react'

export default function ExperienceSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const experiences = [
    {
      title: 'Web Development Intern',
      company: 'Future Tech Innovation',
      duration: '2024 - Present',
      location: 'Remote',
      description: 'Developed responsive web applications using HTML, CSS, JavaScript, and modern UI/UX principles. Collaborated with cross-functional teams to deliver high-quality solutions.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Database Intern',
      company: 'Bytexl',
      duration: '2023 - 2024',
      location: 'Remote',
      description: 'Worked with MySQL databases, wrote complex SQL queries, and developed automation scripts. Improved database performance and data integrity.',
      technologies: ['MySQL', 'SQL Queries', 'Automation'],
      icon: Database,
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Experience items - Clean flex layout */}
        <div className="flex flex-col gap-8 mb-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
              className="w-full"
            >
              <motion.div
                className="glass-card p-6 hover:bg-white/15 transition-all duration-300 w-full"
                style={{ transformStyle: 'preserve-3d' }}
                whileHover={{ 
                  scale: 1.02, 
                  y: -5,
                  rotateY: 2,
                  rotateX: 1,
                  z: 15
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Icon and Timeline indicator */}
                  <div className="flex items-center gap-4 md:flex-col md:items-center md:min-w-[120px]">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${exp.color} flex-shrink-0`}>
                      <exp.icon className="text-white" size={24} />
                    </div>
                    {/* Timeline dot for visual connection */}
                    <div className="w-3 h-3 bg-primary rounded-full border-2 border-dark flex-shrink-0"></div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Title and Company */}
                    <div className="mb-4">
                      <h3 className="text-xl md:text-2xl font-semibold text-light mb-2">{exp.title}</h3>
                      <h4 className="text-lg md:text-xl font-medium text-primary mb-3">{exp.company}</h4>
                    </div>

                    {/* Duration and Location */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-4 text-sm text-light/70">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-light/80 leading-relaxed mb-4 text-sm md:text-base">
                      {exp.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/20 text-primary text-xs md:text-sm rounded-full border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-24 mb-8 text-center"
        >
          <div className="glass-card p-8 mx-auto max-w-4xl border border-primary/20">
            <div className="flex items-center justify-center mb-6">
              <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
              <h3 className="text-2xl font-semibold text-light">
                Looking for <span className="gradient-text">Opportunities</span>
              </h3>
            </div>
            <p className="text-light/80 leading-relaxed text-lg max-w-3xl mx-auto">
              I'm actively seeking new opportunities to apply my skills and continue growing professionally. 
              I'm particularly interested in roles that combine web development, AI/ML, and data analysis.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
