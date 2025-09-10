import { NextRequest, NextResponse } from 'next/server';

// Portfolio knowledge base
const portfolioData = {
  name: "Vivek Patil",
  role: "Web Developer | AI Enthusiast | Data Analyst",
  skills: [
    "Python", "SQL", "React.js", "Next.js", "AI/ML", "Data Visualization",
    "TypeScript", "Tailwind CSS", "TensorFlow", "Scikit-learn", "Neural Networks",
    "Pandas", "Statistical Analysis"
  ],
  experience: [
    "3+ years of experience in web development and AI/ML",
    "Skilled in creating innovative solutions using latest technologies",
    "Passionate about AI/ML and data analysis"
  ],
  projects: [
    "Built responsive web applications using React.js and Next.js",
    "Developed AI/ML models for data analysis and prediction",
    "Created data visualization dashboards and reports"
  ],
  education: "Strong academic background in computer science and data analysis",
  contact: "Available for opportunities in web development, AI/ML, and data analysis"
};

// Helper function to create a timeout promise
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
}

// Fallback response function when Ollama is not available
function getFallbackResponse(userMessage: string) {
  const message = userMessage.toLowerCase().trim();
  
  // Handle empty or very short messages
  if (message.length < 2) {
    return "Hello! I'm here to help you learn about Vivek Patil. How can I assist you today?";
  }
  
  // Basic keyword-based responses with improved matching
  if (message.includes('hello') || message.includes('hi') || message.includes('hey') || message.includes('good morning') || message.includes('good afternoon') || message.includes('good evening')) {
    return "Hello! I'm here to help you learn about Vivek Patil. How can I assist you today?";
  }
  
  // Skills and technologies - expanded matching
  if (message.includes('skill') || message.includes('technology') || message.includes('tech') || 
      message.includes('your skill') || message.includes('your tech') || message.includes('what can you do') ||
      message.includes('expertise') || message.includes('proficient') || message.includes('know') ||
      message.includes('programming') || message.includes('coding') || message.includes('languages')) {
    return "Vivek's key skills include Python, React.js, Next.js, AI/ML, Data Analysis, TypeScript, and Tailwind CSS. He has 3+ years of experience in web development and AI/ML.";
  }
  
  // Experience and work - expanded matching
  if (message.includes('experience') || message.includes('work') || message.includes('job') || 
      message.includes('your experience') || message.includes('work history') || message.includes('background') ||
      message.includes('years') || message.includes('career') || message.includes('professional')) {
    return "Vivek has 3+ years of experience in web development and AI/ML. He's skilled in creating innovative solutions using the latest technologies and has a passion for AI/ML and data analysis.";
  }
  
  // Projects and portfolio - expanded matching
  if (message.includes('project') || message.includes('portfolio') || message.includes('work') ||
      message.includes('your project') || message.includes('what have you built') || message.includes('applications') ||
      message.includes('websites') || message.includes('apps') || message.includes('development')) {
    return "Vivek has built responsive web applications using React.js and Next.js, developed AI/ML models for data analysis, and created data visualization dashboards. Check out his projects section for more details!";
  }
  
  // Education and learning - expanded matching
  if (message.includes('education') || message.includes('degree') || message.includes('study') ||
      message.includes('your education') || message.includes('academic') || message.includes('university') ||
      message.includes('college') || message.includes('learning') || message.includes('background')) {
    return "Vivek has a strong academic background in computer science and data analysis. He's passionate about emerging technologies and continuous learning.";
  }
  
  // Contact information - expanded matching
  if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach') ||
      message.includes('your contact') || message.includes('how to reach') || message.includes('get in touch') ||
      message.includes('linkedin') || message.includes('github') || message.includes('social')) {
    return "You can reach Vivek through email at vivekpatil0088@gmail.com, phone at +91 63516 81472, or connect on LinkedIn at VivekPatil0088. He's available for opportunities in web development, AI/ML, and data analysis.";
  }
  
  // AI and Machine Learning - expanded matching
  if (message.includes('ai') || message.includes('machine learning') || message.includes('ml') ||
      message.includes('artificial intelligence') || message.includes('neural') || message.includes('tensorflow') ||
      message.includes('scikit') || message.includes('deep learning') || message.includes('predictive')) {
    return "Vivek is passionate about AI/ML and has experience with TensorFlow, Scikit-learn, Neural Networks, and data analysis. He's always exploring new AI technologies and applications.";
  }
  
  // Web development - expanded matching
  if (message.includes('web') || message.includes('frontend') || message.includes('backend') ||
      message.includes('website') || message.includes('app') || message.includes('react') || message.includes('next') ||
      message.includes('javascript') || message.includes('typescript') || message.includes('html') || message.includes('css')) {
    return "Vivek specializes in full-stack web development using React.js, Next.js, Node.js, and modern web technologies. He creates responsive, user-friendly applications with cutting-edge features.";
  }
  
  // Data analysis - expanded matching
  if (message.includes('data') || message.includes('analysis') || message.includes('visualization') ||
      message.includes('pandas') || message.includes('numpy') || message.includes('statistics') ||
      message.includes('dashboard') || message.includes('report') || message.includes('insights')) {
    return "Vivek has strong skills in data analysis using Python, Pandas, and statistical analysis. He creates data visualization dashboards and reports to help make data-driven decisions.";
  }
  
  // Python and programming - expanded matching
  if (message.includes('python') || message.includes('sql') || message.includes('database') ||
      message.includes('programming') || message.includes('coding') || message.includes('scripting') ||
      message.includes('automation') || message.includes('api')) {
    return "Vivek is proficient in Python programming, SQL databases, and building APIs. He uses these skills for web development, data analysis, and AI/ML projects.";
  }
  
  // General questions about Vivek
  if (message.includes('who') || message.includes('what') || message.includes('tell me about') ||
      message.includes('about you') || message.includes('your background') || message.includes('introduce')) {
    return "Vivek Patil is a Web Developer, AI Enthusiast, and Data Analyst with 3+ years of experience. He specializes in creating modern web applications, AI/ML solutions, and data analysis tools. He's passionate about emerging technologies and always eager to learn new skills.";
  }
  
  // Help and guidance
  if (message.includes('help') || message.includes('assist') || message.includes('guide') ||
      message.includes('what can you help') || message.includes('support') || message.includes('advice')) {
    return "I can help you learn about Vivek's skills, experience, projects, education, and contact information. Try asking about his technical skills, work experience, projects, or how to reach him.";
  }
  
  // Default response for unknown queries - more helpful
  return "I can help you learn about Vivek Patil! Try asking about his skills, experience, projects, education, or contact information. For example: 'What are your skills?', 'Tell me about your experience', or 'How can I contact you?'.";
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    let message: string;
    try {
      const body = await request.json();
      message = body.message;
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      );
    }

    // Try Ollama first with a shorter timeout
    try {
      console.log('Attempting to use Ollama for AI chat response...');
      
      const systemPrompt = `You are a helpful portfolio assistant for Vivek Patil. 
      Use the following information to answer questions about Vivek:
      
      ${JSON.stringify(portfolioData, null, 2)}
      
      Be friendly, professional, and concise. If asked about something not in the portfolio, 
      politely redirect to the available information. Keep responses under 100 words.`;

      const ollamaRequest = fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.1',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          options: {
            temperature: 0.7,
            num_predict: 150
          }
        })
      });

      // Shorter timeout for Ollama (15 seconds)
      const response = await Promise.race([
        ollamaRequest,
        createTimeout(15000)
      ]);

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.message?.content || 'Sorry, I could not process your request.';
        
        console.log('AI chat response received from Ollama');
        return NextResponse.json({ 
          response: aiResponse,
          isFallback: false
        });
      }
    } catch (ollamaError) {
      console.log('Ollama not available, using fallback response:', ollamaError instanceof Error ? ollamaError.message : 'Unknown error');
    }

    // Fallback to basic response
    console.log('Using fallback chat response method');
    const fallbackResponse = getFallbackResponse(message);
    
    return NextResponse.json({
      response: fallbackResponse,
      isFallback: true
    });

  } catch (error) {
    console.error('Chat API error:', error);
    
    // Handle specific error types
    let errorMessage = 'Internal server error';
    let errorDetails = 'Something went wrong';
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out';
        errorDetails = 'The AI response took too long. Please try again.';
      } else if (error.message.includes('ECONNRESET') || error.message.includes('connection')) {
        errorMessage = 'Connection error';
        errorDetails = 'Unable to connect to AI service. Please check if Ollama is running and try again.';
      } else if (error.message.includes('Ollama API error')) {
        errorMessage = 'AI Service Error';
        errorDetails = error.message;
      } else {
        errorDetails = error.message;
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails
      },
      { status: 500 }
    );
  }
}
