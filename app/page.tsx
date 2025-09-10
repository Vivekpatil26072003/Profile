import AnimatedBackground from '@/components/AnimatedBackground'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ExperienceSection from '@/components/ExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import EducationSection from '@/components/EducationSection'
import CertificatesSection from '@/components/CertificatesSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import ChatbotWidget from '@/components/ChatbotWidget'
import ResumeAnalyzer from '@/components/ResumeAnalyzer'

export default function Home() {
  return (
    <main className="relative w-full min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationSection />
      <CertificatesSection />
      <ResumeAnalyzer />
      <ContactSection />
      <Footer />
      
      {/* AI-Powered Features */}
      <ChatbotWidget />
    </main>
  )
}
