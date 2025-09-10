import { NextRequest, NextResponse } from 'next/server';

// Vivek's resume data for analysis
const vivekResume = {
  name: "Vivek Patil",
  skills: {
    "Programming Languages": ["Python", "JavaScript", "TypeScript", "SQL"],
    "Frontend": ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS"],
    "Backend": ["Node.js", "Express.js", "Python Flask/Django"],
    "AI/ML": ["TensorFlow", "Scikit-learn", "Neural Networks", "Machine Learning"],
    "Data Analysis": ["Pandas", "NumPy", "Data Visualization", "Statistical Analysis"],
    "Tools": ["Git", "Docker", "Jupyter Notebooks", "Tableau"]
  },
  experience: [
    "3+ years in web development and AI/ML",
    "Experience with modern frameworks and technologies",
    "Project-based learning and practical application",
    "Passionate about emerging technologies"
  ],
  projects: [
    "Full-stack web applications using React/Next.js",
    "AI/ML models for data analysis and prediction",
    "Data visualization dashboards",
    "Responsive and modern UI/UX designs"
  ],
  education: "Computer Science background with focus on AI/ML and web technologies"
};

// Fallback analysis function when Ollama is not available
function performFallbackAnalysis(jobDescription: string) {
  const jobLower = jobDescription.toLowerCase();
  let matchScore = 0;
  let matchedSkills: string[] = [];
  let missingSkills: string[] = [];
  
  // Check for programming languages
  const programmingLanguages = vivekResume.skills["Programming Languages"];
  programmingLanguages.forEach(lang => {
    if (jobLower.includes(lang.toLowerCase())) {
      matchScore += 15;
      matchedSkills.push(lang);
    }
  });
  
  // Check for frontend skills
  const frontendSkills = vivekResume.skills["Frontend"];
  frontendSkills.forEach(skill => {
    if (jobLower.includes(skill.toLowerCase())) {
      matchScore += 10;
      matchedSkills.push(skill);
    }
  });
  
  // Check for AI/ML skills
  const aiSkills = vivekResume.skills["AI/ML"];
  aiSkills.forEach(skill => {
    if (jobLower.includes(skill.toLowerCase())) {
      matchScore += 12;
      matchedSkills.push(skill);
    }
  });
  
  // Check for data analysis skills
  const dataSkills = vivekResume.skills["Data Analysis"];
  dataSkills.forEach(skill => {
    if (jobLower.includes(skill.toLowerCase())) {
      matchScore += 8;
      matchedSkills.push(skill);
    }
  });
  
  // Cap the score at 100
  matchScore = Math.min(matchScore, 100);
  
  // Generate analysis text
  let analysis = `📊 **Match Analysis: ${matchScore}%**\n\n`;
  
  if (matchedSkills.length > 0) {
    analysis += `✅ **Skills that match:** ${matchedSkills.join(', ')}\n\n`;
  }
  
  if (matchScore >= 70) {
    analysis += `🎯 **Why Vivek fits this role:**\n`;
    analysis += `• Strong technical foundation with ${matchedSkills.length} relevant skills\n`;
    analysis += `• ${vivekResume.experience[0]}\n`;
    analysis += `• Proven track record in ${vivekResume.projects[0].toLowerCase()}\n\n`;
  } else if (matchScore >= 40) {
    analysis += `🤔 **Partial match - areas of strength:**\n`;
    analysis += `• Good foundation in ${matchedSkills.join(', ')}\n`;
    analysis += `• Could quickly learn additional required skills\n\n`;
  } else {
    analysis += `⚠️ **Limited match - consider upskilling:**\n`;
    analysis += `• Current skills don't align strongly with this role\n`;
    analysis += `• Focus on learning: ${missingSkills.slice(0, 3).join(', ')}\n\n`;
  }
  
  analysis += `💡 **Recommendations:**\n`;
  if (matchScore >= 70) {
    analysis += `• Highlight ${matchedSkills.slice(0, 3).join(', ')} in your application\n`;
    analysis += `• Emphasize your ${vivekResume.experience[0]}\n`;
    analysis += `• Showcase relevant projects from your portfolio\n`;
  } else if (matchScore >= 40) {
    analysis += `• Focus on transferable skills and learning ability\n`;
    analysis += `• Consider taking courses in missing technologies\n`;
    analysis += `• Build small projects to demonstrate new skills\n`;
  } else {
    analysis += `• This role may require significant upskilling\n`;
    analysis += `• Consider roles that better match your current skillset\n`;
    analysis += `• Focus on building a strong foundation first\n`;
  }
  
  return {
    analysis,
    matchPercentage: matchScore,
    isFallback: true
  };
}

// Helper function to create a timeout promise
function createTimeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms);
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log('Resume analyzer API called');
    
    // Parse request body
    let jobDescription: string;
    try {
      const body = await request.json();
      jobDescription = body.jobDescription;
      console.log('Job description received, length:', jobDescription?.length || 0);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    if (!jobDescription || typeof jobDescription !== 'string') {
      return NextResponse.json(
        { error: 'Job description is required and must be a string' },
        { status: 400 }
      );
    }

    // Try Ollama first with a shorter timeout
    try {
      console.log('Attempting to use Ollama for AI analysis...');
      
      const analysisPrompt = `Analyze this job description against Vivek Patil's resume:

Job: ${jobDescription.substring(0, 500)}

Vivek's skills: ${vivekResume.skills["Programming Languages"].join(", ")}, ${vivekResume.skills["Frontend"].join(", ")}, ${vivekResume.skills["AI/ML"].join(", ")}

Experience: ${vivekResume.experience.join(". ")}

Provide: 1) Match percentage (0-100%), 2) Why Vivek fits, 3) Improvement suggestions.`;

      const ollamaRequest = fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3.1',
          messages: [
            { role: 'user', content: analysisPrompt }
          ],
          options: {
            temperature: 0.3,
            num_predict: 200
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
        console.log('Ollama response received, length:', data.message?.content?.length || 0);

        const analysis = data.message?.content || 'Analysis could not be generated.';
        const matchPercentage = analysis.match(/(\d+)%/)?.[1] || "75";

        console.log('AI analysis completed, match percentage:', matchPercentage);

        return NextResponse.json({
          analysis,
          matchPercentage: parseInt(matchPercentage),
          timestamp: new Date().toISOString(),
          isFallback: false
        });
      }
    } catch (ollamaError) {
      console.log('Ollama not available, using fallback analysis:', ollamaError instanceof Error ? ollamaError.message : 'Unknown error');
    }

    // Fallback to basic analysis
    console.log('Using fallback analysis method');
    const fallbackResult = performFallbackAnalysis(jobDescription);
    
    return NextResponse.json({
      ...fallbackResult,
      timestamp: new Date().toISOString(),
      note: "This analysis was generated using basic matching logic. For AI-powered analysis, ensure Ollama is running with the llama3.1 model."
    });

  } catch (error) {
    console.error('Resume analyzer API error:', error);
    
    // Handle specific error types
    let errorMessage = 'Internal server error';
    let errorDetails = 'Something went wrong';
    
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        errorMessage = 'Request timed out';
        errorDetails = 'The AI analysis took too long. Please try again with a shorter job description.';
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
        details: errorDetails,
        stack: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.stack : undefined : undefined
      },
      { status: 500 }
    );
  }
}
