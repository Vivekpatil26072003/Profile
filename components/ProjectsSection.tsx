'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink, Github, Globe, Brain, Cloud, Database } from 'lucide-react'

export default function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: 'E-commerce Website',
      description: 'Full-stack e-commerce platform built with TypeScript, featuring modern UI/UX design, shopping cart functionality, and secure payment integration.',
      technologies: ['TypeScript', 'React.js', 'Node.js', 'Database'],
      image: null,
      liveLink: 'https://ecommerce-website0011.netlify.app/',
      githubLink: 'https://github.com/Vivekpatil26072003/ecommerce-website',
      icon: Globe,
      color: 'from-blue-500 to-purple-500',
      featured: true,
    },
    {
      title: 'AI Resume Analyzer',
      description: 'Intelligent resume analysis tool powered by AI, providing detailed feedback and optimization suggestions for job applications.',
      technologies: ['TypeScript', 'AI/ML', 'React.js', 'API Integration'],
      image: null,
      liveLink: null, // No live demo available yet
      githubLink: 'https://github.com/Vivekpatil26072003/AI-Resume-Analyzer',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      featured: true,
    },
    {
      title: 'Weather Application',
      description: 'Real-time weather forecasting application with clean HTML interface, providing accurate weather data and location-based forecasts.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Weather API'],
      image: null,
      liveLink: 'https://statuesque-melba-f2ea95.netlify.app/',
      githubLink: 'https://github.com/Vivekpatil26072003/Wether',
      icon: Cloud,
      color: 'from-cyan-500 to-blue-500',
      featured: true,
    },
    {
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website showcasing skills and projects with smooth animations and glassmorphism design.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      image: null,
      liveLink: 'https://github.com/Vivekpatil26072003/Profile',
      githubLink: 'https://github.com/Vivekpatil26072003/Profile',
      icon: Globe,
      color: 'from-green-500 to-emerald-500',
      featured: false,
    },
    {
      title: 'Student Record Management System',
      description: 'Comprehensive database system for managing student records with MySQL backend and automated SQL operations.',
      technologies: ['MySQL', 'SQL Automation', 'Database Design', 'PHP'],
      image: null,
      liveLink: null,
      githubLink: 'https://github.com/Vivekpatil26072003/student-management',
      icon: Database,
      color: 'from-orange-500 to-red-500',
      featured: false,
    },
  ]

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-light mb-8 text-center">
            Featured <span className="gradient-text">Projects</span>
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
                className="group"
              >
                <motion.div 
                  className="glass-card overflow-hidden hover:bg-white/15 transition-all duration-500"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 3,
                    rotateX: 1,
                    z: 15
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Image */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <project.icon className="text-white/60" size={64} />
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-semibold text-light mb-3">{project.title}</h3>
                    <p className="text-light/80 leading-relaxed mb-4 text-base md:text-lg">{project.description}</p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/20 text-primary text-base rounded-full border border-primary/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {project.liveLink && (
                        <motion.a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all duration-300 group-hover:scale-105"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </motion.a>
                      )}
                      <motion.a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 group-hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        Code
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-xl md:text-2xl font-semibold text-light mb-8 text-center">
            Other <span className="gradient-text">Projects</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => !p.featured).map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="group"
              >
                <motion.div 
                  className="glass-card p-6 hover:bg-white/15 transition-all duration-300 h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 2,
                    rotateX: 1,
                    z: 10
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Project Icon */}
                  <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${project.color} mb-4`}>
                    <project.icon className="text-white" size={24} />
                  </div>

                  {/* Project Content */}
                  <h3 className="text-xl md:text-2xl font-semibold text-light mb-3">{project.title}</h3>
                  <p className="text-light/70 text-base md:text-lg leading-relaxed mb-4">{project.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    {project.liveLink && (
                      <motion.a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/80 transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={14} />
                        Demo
                      </motion.a>
                    )}
                    <motion.a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={14} />
                      Code
                    </motion.a>
                  </div>
                </motion.div>
              </motion.div>
            ))}
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
            <h3 className="text-3xl font-semibold text-light mb-6">
              Let's <span className="gradient-text">Collaborate</span>
            </h3>
            <p className="text-light/80 leading-relaxed text-base md:text-lg mb-6">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/80 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
