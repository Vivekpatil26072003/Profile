'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, MessageCircle, Bot, User, Trash2 } from 'lucide-react';

// TypeScript declarations for Speech Recognition API
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  readonly length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

interface VoiceMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
  type?: 'command' | 'response' | 'error';
}

// Portfolio content data - matches your website sections
const portfolioContent = {
  hero: "Vivek Patil is a skilled professional with 3+ years of experience. He specializes in creating modern web applications, AI/ML solutions, and data analysis tools.",
  about: "Vivek Patil is a passionate professional with 3+ years of experience. He specializes in creating modern web applications, AI/ML solutions, and data analysis tools. Vivek is passionate about emerging technologies and always eager to learn new skills. He has excellent team bonding abilities, is a quick learner, and thrives in dynamic environments.",
  skills: "Vivek's key skills include Python, React.js, Next.js, AI/ML, Data Analysis, TypeScript, and Tailwind CSS. He has expertise in TensorFlow, Scikit-learn, Neural Networks, Pandas, and Statistical Analysis. He's proficient in full-stack web development and creates responsive, user-friendly applications with cutting-edge features.",
  experience: "Vivek has 3+ years of experience in web development and AI/ML. He's skilled in creating innovative solutions using the latest technologies and has a passion for AI/ML and data analysis. He has worked on various projects involving responsive web applications, AI/ML models, and data visualization dashboards.",
  projects: "Vivek has built responsive web applications using React.js and Next.js, developed AI/ML models for data analysis and prediction, and created data visualization dashboards and reports. His projects showcase his expertise in modern web technologies and AI/ML solutions.",
  education: "Vivek has a strong academic background in computer science and data analysis. He's passionate about emerging technologies and continuous learning, with expertise gained through both formal education and hands-on experience.",
  certificates: "Vivek has obtained various certifications in web development, AI/ML, and data analysis technologies. These certifications demonstrate his commitment to continuous learning and staying updated with the latest industry trends.",
  contact: "You can reach Vivek through email at vivekpatil0088@gmail.com, phone at +91 63516 81472, or connect on LinkedIn at VivekPatil0088. He's available for opportunities in web development, AI/ML, and data analysis."
};

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [messages, setMessages] = useState<VoiceMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Check for browser support
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
    }
    if (!('speechSynthesis' in window)) {
      setError('Speech synthesis not supported in this browser');
    }
  }, []);

  // Process voice commands and match against portfolio content
  const processVoiceCommand = (command: string): string => {
    const lowerCommand = command.toLowerCase().trim();
    
    // Hero/Introduction commands
    if (lowerCommand.includes('who are you') || lowerCommand.includes('introduce') || 
        lowerCommand.includes('tell me about yourself') || lowerCommand.includes('what do you do')) {
      return portfolioContent.hero;
    }
    
    // About section commands
    if (lowerCommand.includes('about') || lowerCommand.includes('tell me about vivek') || 
        lowerCommand.includes('background') || lowerCommand.includes('who is vivek')) {
      return portfolioContent.about;
    }
    
    // Skills section commands
    if (lowerCommand.includes('skill') || lowerCommand.includes('what are your skills') || 
        lowerCommand.includes('technologies') || lowerCommand.includes('what can you do') ||
        lowerCommand.includes('expertise') || lowerCommand.includes('programming')) {
      return portfolioContent.skills;
    }
    
    // Experience section commands
    if (lowerCommand.includes('experience') || lowerCommand.includes('work history') || 
        lowerCommand.includes('career') || lowerCommand.includes('professional') ||
        lowerCommand.includes('years of experience')) {
      return portfolioContent.experience;
    }
    
    // Projects section commands
    if (lowerCommand.includes('project') || lowerCommand.includes('show me your projects') || 
        lowerCommand.includes('work') || lowerCommand.includes('what have you built') ||
        lowerCommand.includes('applications') || lowerCommand.includes('portfolio')) {
      return portfolioContent.projects;
    }
    
    // Education section commands
    if (lowerCommand.includes('education') || lowerCommand.includes('degree') || 
        lowerCommand.includes('study') || lowerCommand.includes('academic') ||
        lowerCommand.includes('university') || lowerCommand.includes('college')) {
      return portfolioContent.education;
    }
    
    // Certificates section commands
    if (lowerCommand.includes('certificate') || lowerCommand.includes('certification') || 
        lowerCommand.includes('awards') || lowerCommand.includes('achievements')) {
      return portfolioContent.certificates;
    }
    
    // Contact section commands
    if (lowerCommand.includes('contact') || lowerCommand.includes('get in touch') || 
        lowerCommand.includes('reach') || lowerCommand.includes('how can i contact') ||
        lowerCommand.includes('email') || lowerCommand.includes('phone') ||
        lowerCommand.includes('linkedin')) {
      return portfolioContent.contact;
    }
    
    // Help command
    if (lowerCommand.includes('help') || lowerCommand.includes('what can you help')) {
      return "I can help you learn about Vivek Patil's portfolio. You can ask about his background, skills, experience, projects, education, certificates, or contact information. Try saying: 'Tell me about Vivek', 'What are your skills?', 'Show me your projects', or 'How can I contact you?'";
    }
    
    // Default response for non-portfolio questions
    return "I can only answer questions about Vivek Patil's portfolio. Please ask about his background, skills, experience, projects, education, certificates, or contact information.";
  };

  const startSpeechRecognition = () => {
    if (error) return;
    
    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      recognition.maxAlternatives = 1;
      
      recognition.onstart = () => {
        setIsListening(true);
        setTranscription('');
        setError(null);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscription(transcript);
        addUserMessage(transcript, 'command');
        processVoiceQuery(transcript);
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError(`Speech recognition error: ${event.error}`);
        setIsListening(false);
        addAIMessage("Sorry, I couldn't hear you clearly. Please try again.", 'error');
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Error starting speech recognition:', err);
      setError('Failed to start speech recognition');
      addAIMessage("Sorry, speech recognition is not available. Please try again.", 'error');
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processVoiceQuery = async (query: string) => {
    setIsProcessing(true);
    setError(null);
    
    try {
      // Process the command locally using portfolio content
      const response = processVoiceCommand(query);
      addAIMessage(response, 'response');
      
      // Text-to-speech if not muted
      if (!isMuted) {
        speakText(response);
      }
    } catch (error) {
      console.error('Error processing voice query:', error);
      const errorMessage = "Sorry, I'm having trouble processing your request. Please try again.";
      setError(errorMessage);
      addAIMessage(errorMessage, 'error');
    } finally {
      setIsProcessing(false);
    }
  };

  const addUserMessage = (text: string, type: 'command' | 'response' | 'error' = 'command') => {
    const message: VoiceMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isUser: true,
      type
    };
    setMessages(prev => [...prev, message]);
  };

  const addAIMessage = (text: string, type: 'command' | 'response' | 'error' = 'response') => {
    const message: VoiceMessage = {
      id: (Date.now() + 1).toString(),
      text,
      timestamp: new Date(),
      isUser: false,
      type
    };
    setMessages(prev => [...prev, message]);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window && !isMuted) {
      // Stop any current speech
      speechSynthesis.cancel();
      
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      speechSynthesisRef.current = utterance;
      speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
    setTranscription('');
    setError(null);
    stopSpeaking();
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (isSpeaking) {
      stopSpeaking();
    }
  };

  return (
    <>
      {/* Floating Voice Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} className="text-white mx-auto" />
            </motion.div>
          ) : (
            <motion.div
              key="voice"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Mic size={24} className="text-white mx-auto" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Voice Assistant Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 left-6 z-40 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <h3 className="text-white font-semibold">Voice Assistant</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    isMuted 
                      ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>

            {/* Voice Control Section */}
            <div className="p-6 text-center">
              <div className="mb-6 flex justify-center items-center">
                <motion.button
                  onClick={isListening ? stopSpeechRecognition : startSpeechRecognition}
                  className={`w-20 h-20 rounded-full transition-all duration-300 flex items-center justify-center mx-auto ${
                    isListening
                      ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/50'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-purple-500/25'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isProcessing}
                >
                  {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                </motion.button>
              </div>
              
              <p className="text-gray-300 mb-4">
                {isListening ? 'Listening... Speak now!' : 'Click to start voice interaction'}
              </p>
              
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-purple-400">
                  <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              )}

              {isSpeaking && (
                <div className="flex items-center justify-center gap-2 text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Speaking...</span>
                </div>
              )}
            </div>

            {/* Error Display */}
            {error && (
              <div className="px-6 mb-4">
                <div className="bg-red-500/20 border border-red-500/30 p-3 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
            )}

            {/* Transcription */}
            {transcription && (
              <div className="px-6 mb-4">
                <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-2">
                    <User size={14} />
                    You said:
                  </h4>
                  <p className="text-white text-sm">{transcription}</p>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 px-6 overflow-y-auto max-h-[200px] space-y-3">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                        : message.type === 'error'
                        ? 'bg-red-500/20 text-red-200 border border-red-500/30'
                        : 'bg-gray-800/50 text-gray-200 border border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.isUser ? <User size={14} /> : <Bot size={14} />}
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <button
                  onClick={clearMessages}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  <Trash2 size={14} />
                  Clear Chat
                </button>
                <div className="text-xs text-gray-500">
                  {messages.length} messages
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
