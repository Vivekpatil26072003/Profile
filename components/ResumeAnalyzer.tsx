'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Upload, Brain, TrendingUp, Target, Lightbulb } from 'lucide-react';

interface AnalysisResult {
  analysis: string;
  matchPercentage: number;
  timestamp: string;
  isFallback?: boolean;
  note?: string;
}

export default function ResumeAnalyzer() {
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      setError('Please enter a job description to analyze.');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/resume-analyzer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription: jobDescription.trim() })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getMatchEmoji = (percentage: number) => {
    if (percentage >= 80) return '🎯';
    if (percentage >= 60) return '👍';
    return '📈';
  };

  return (
    <section id="resume-analyzer" className="py-20 bg-gradient-to-br from-gray-900/50 to-gray-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-light mb-6">
            AI Resume Analyzer
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Upload a job description and let AI analyze how well Vivek's skills and experience match the role.
            Get instant feedback and suggestions for improvement.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Input Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-light">Job Description</h3>
              </div>
              
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here...&#10;&#10;Example:&#10;We are looking for a Full Stack Developer with experience in React, Node.js, and Python. The ideal candidate should have 3+ years of experience in web development and knowledge of AI/ML technologies..."
                className="w-full h-64 p-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all duration-200 resize-none"
                disabled={isAnalyzing}
              />
              
              <div className="text-sm text-gray-400 mt-2">
                💡 <strong>Tip:</strong> The analyzer will use AI if available, otherwise fall back to skill-based matching.
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !jobDescription.trim()}
                className="w-full mt-6 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-semibold hover:shadow-glow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="w-5 h-5" />
                    Analyze Match
                  </>
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass-card p-6 text-center">
                <div className="p-3 bg-secondary/20 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-light mb-2">Smart Matching</h4>
                <p className="text-sm text-gray-400">AI-powered analysis with fallback to skill-based matching</p>
              </div>
              
              <div className="glass-card p-6 text-center">
                <div className="p-3 bg-accent/20 rounded-xl w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-light mb-2">Actionable Insights</h4>
                <p className="text-sm text-gray-400">Get specific suggestions for improving your resume</p>
              </div>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-6 border border-red-500/30"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <h4 className="text-lg font-semibold text-red-400">Error</h4>
                  </div>
                  <p className="text-red-300">{error}</p>
                </motion.div>
              )}

              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="glass-card p-8"
                >
                  {/* Match Score */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <span className="text-4xl">{getMatchEmoji(result.matchPercentage)}</span>
                      <h3 className="text-2xl font-bold text-light">Match Score</h3>
                    </div>
                    
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-700"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={`${getMatchColor(result.matchPercentage)} transition-all duration-1000`}
                          strokeWidth="3"
                          strokeDasharray={`${result.matchPercentage}, 100`}
                          strokeLinecap="round"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-3xl font-bold ${getMatchColor(result.matchPercentage)}`}>
                          {result.matchPercentage}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300">
                      {result.matchPercentage >= 80 ? 'Excellent match!' : 
                       result.matchPercentage >= 60 ? 'Good match with room for improvement' : 
                       'Consider focusing on key skills for this role'}
                    </p>
                  </div>

                  {/* Fallback Indicator */}
                  {result.isFallback && (
                    <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-400">Basic Analysis Mode</span>
                      </div>
                      <p className="text-sm text-yellow-300">
                        AI service unavailable. Using skill-based matching for analysis.
                      </p>
                    </div>
                  )}

                  {/* Analysis */}
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-light mb-4">
                      {result.isFallback ? 'Skill Analysis' : 'AI Analysis'}
                    </h4>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <pre className="text-sm text-gray-200 whitespace-pre-wrap font-sans">
                        {result.analysis}
                      </pre>
                    </div>
                  </div>

                  {/* Note */}
                  {result.note && (
                    <div className="mt-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                      <p className="text-sm text-blue-300">{result.note}</p>
                    </div>
                  )}

                  {/* Timestamp */}
                  <div className="mt-6 pt-4 border-t border-gray-700/40 text-center">
                    <p className="text-xs text-gray-500">
                      Analyzed on {new Date(result.timestamp).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              )}

              {!result && !error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="glass-card p-8 text-center"
                >
                  <div className="p-4 bg-gray-800/50 rounded-xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-10 h-10 text-gray-400" />
                  </div>
                  <h4 className="text-xl font-semibold text-light mb-2">Ready to Analyze</h4>
                  <p className="text-gray-400">
                    Enter a job description on the left to get started with AI-powered resume analysis.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


