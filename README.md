# Vivek Patil - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, React, and Tailwind CSS. Features smooth animations, glassmorphism design, and a trading-style animated background.

## ✨ Features

### 🎯 Core Sections
- **Hero Section**: Animated introduction with trading-style background effects
- **About Section**: Personal description highlighting soft skills
- **Skills Section**: Technical and soft skills with animated cards
- **Experience Section**: Timeline-based work experience display
- **Projects Section**: Featured projects with live links and GitHub repositories
- **Education Section**: Academic background with CGPA details
- **Certificates Section**: Professional certifications and achievements
- **Contact Section**: Contact form with email integration and social links

### 🎨 Design & Animation
- **Modern Trading Animations**: Floating shapes, gradient backgrounds, and wave patterns
- **Glassmorphism Cards**: Translucent UI elements with backdrop blur effects
- **Framer Motion**: Smooth scroll animations and interactive transitions
- **Responsive Design**: Fully optimized for mobile and desktop devices
- **Smooth Scrolling**: Seamless navigation between sections

### 🛠 Technical Features
- **Next.js 14**: App Router with TypeScript support
- **Tailwind CSS**: Utility-first CSS framework with custom animations
- **Framer Motion**: Advanced animation library for smooth transitions
- **React Hooks**: Modern React patterns and state management
- **Intersection Observer**: Scroll-triggered animations
- **Lucide Icons**: Beautiful, consistent iconography

### 🤖 AI-Powered Features
- **AI Resume Analyzer**: Intelligent job matching with fallback to skill-based analysis
- **AI Chatbot**: Portfolio assistant with context awareness
- **Voice Assistant**: Speech-to-text and AI-powered responses
- **Fallback Mode**: Works without AI services using basic matching logic

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vivekpatil/portfolio-website.git
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
portfolio-website/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── components/             # React components
│   ├── AnimatedBackground.tsx
│   ├── Navbar.tsx
│   ├── HeroSection.tsx
│   ├── AboutSection.tsx
│   ├── SkillsSection.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectsSection.tsx
│   ├── EducationSection.tsx
│   ├── CertificatesSection.tsx
│   ├── ContactSection.tsx
│   └── Footer.tsx
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── README.md              # Project documentation
```

## 🎨 Customization

### Colors & Themes
The website uses a custom color palette defined in `tailwind.config.js`:

## 🤖 AI Features Setup

For full AI capabilities (resume analysis, chatbot, voice assistant), see the [Ollama Setup Guide](OLLAMA_SETUP.md).

**Note**: The AI features work in fallback mode without setup, providing basic functionality using skill-based matching.
- **Primary**: Blue (#0ea5e9)
- **Secondary**: Purple (#7c3aed)
- **Accent**: Yellow (#f59e0b)
- **Dark**: Dark blue (#0f172a)
- **Light**: Light gray (#f8fafc)

### Animations
Custom animations are defined in the Tailwind config:
- `float`: Floating animation for elements
- `gradient`: Animated gradient backgrounds
- `slide-up`: Slide up entrance animations
- `fade-in`: Fade in entrance animations

### Content Updates
To update the content:
1. Modify the data objects in each component
2. Update contact information in `ContactSection.tsx`
3. Add/remove projects in `ProjectsSection.tsx`
4. Update skills in `SkillsSection.tsx`

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 Resume Download

The portfolio includes a "Download Resume" button that provides:

**HTML Resume** (`resume.html`) - Professional, styled resume that can be easily converted to PDF:
- Open the HTML file in any modern browser
- Use browser's "Print" function (Ctrl+P / Cmd+P)
- Select "Save as PDF" as the destination
- The resume is optimized for PDF conversion with proper styling

## 📧 Contact Form Integration

The contact form currently simulates email submission. To integrate with a real email service:

1. **EmailJS** (Recommended for simple integration):
   ```bash
   npm install @emailjs/browser
   ```

2. **Nodemailer** (For server-side email handling):
   ```bash
   npm install nodemailer
   ```

3. **Formspree** (No-code solution):
   - Sign up at [formspree.io](https://formspree.io)
   - Replace the form action with your Formspree endpoint

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify
1. Build the project: `npm run build`
2. Upload the `out` folder to Netlify
3. Configure build settings

### Other Platforms
The website can be deployed to any static hosting service that supports Next.js.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Lucide Icons** for beautiful iconography
- **Next.js** team for the amazing framework

## 📞 Contact

- **Email**: vivekpatil0088@gmail.com
- **Phone**: +91 63516 81472
- **LinkedIn**: [VivekPatil0088](http://www.linkedin.com/in/VivekPatil0088)
- **GitHub**: [Vivekpatil26072003](https://github.com/Vivekpatil26072003)

---

Made with ❤️ by Vivek Patil using Next.js & Tailwind CSS
