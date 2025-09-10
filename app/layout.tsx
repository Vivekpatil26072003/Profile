import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import VoiceAssistant from '@/components/VoiceAssistant'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Vivek Patil - Web Developer | AI Enthusiast | Data Analyst',
  description: 'Personal portfolio website of Vivek Patil, a skilled web developer, AI enthusiast, and data analyst with expertise in Python, React.js, Next.js, and AI/ML technologies.',
  keywords: 'Vivek Patil, Web Developer, AI Enthusiast, Data Analyst, React.js, Next.js, Python, AI/ML',
  authors: [{ name: 'Vivek Patil' }],
  creator: 'Vivek Patil',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="w-full">
      <body className={`${inter.className} w-full min-h-screen`}>
        {children}
        <VoiceAssistant />
      </body>
    </html>
  )
}
