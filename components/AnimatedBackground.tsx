'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
}

interface FloatingShape {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  animationDelay: number
}

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Particle[]>([])
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: ['#00D4FF', '#FF0080', '#7B2CBF', '#00FF88'][Math.floor(Math.random() * 4)]
    }))

    // Generate floating shapes
    const newShapes: FloatingShape[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 100 + 50,
      rotation: Math.random() * 360,
      color: ['#00D4FF', '#FF0080', '#7B2CBF'][Math.floor(Math.random() * 3)],
      animationDelay: Math.random() * 2
    }))

    setParticles(newParticles)
    setFloatingShapes(newShapes)

    // Animate particles
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX) > window.innerWidth ? 0 : (particle.x + particle.speedX) < 0 ? window.innerWidth : particle.x + particle.speedX,
        y: (particle.y + particle.speedY) > window.innerHeight ? 0 : (particle.y + particle.speedY) < 0 ? window.innerHeight : particle.y + particle.speedY
      })))
    }

    const interval = setInterval(animateParticles, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main background gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-dark via-darker to-black" />
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating neon orbs */}
      {floatingShapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute rounded-full blur-3xl"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.color,
            opacity: 0.1
          }}
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8 + shape.animationDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Animated particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.opacity
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 2, particle.opacity]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Cyber wave effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Corner accent elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/20 rounded-full blur-xl" />
      <div className="absolute top-10 right-10 w-24 h-24 border border-secondary/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 left-10 w-20 h-20 border border-accent/20 rounded-full blur-xl" />
      <div className="absolute bottom-10 right-10 w-28 h-28 border border-primary/20 rounded-full blur-xl" />

      {/* Animated light rays */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              transform: `rotate(${15 + i * 5}deg)`
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-16 h-16 border border-primary/30 rounded-lg blur-sm"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-3/4 right-1/4 w-12 h-12 border border-secondary/30 rounded-full blur-sm"
        animate={{
          rotate: [360, 270, 180, 90, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-20 h-20 border border-accent/30 transform -translate-x-1/2 -translate-y-1/2 blur-sm"
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
        }}
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Energy field effect */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20 blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  )
}
