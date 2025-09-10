import { NextRequest, NextResponse } from 'next/server';
import { Ollama } from 'ollama';

export async function GET() {
  try {
    console.log('Test Ollama API called');
    
    // Initialize Ollama client
    const ollama = new Ollama({
      host: process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    });
    
    console.log('Ollama client initialized');

    // Simple test message
    const response = await ollama.chat({
      model: 'llama3.1',
      messages: [
        { role: 'user', content: 'Hello, please respond with "Ollama is working!"' }
      ],
      options: {
        temperature: 0.7,
        num_predict: 50
      }
    });

    console.log('Ollama response received:', response.message?.content);

    return NextResponse.json({ 
      message: 'Ollama test successful',
      response: response.message?.content || 'No response',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Test Ollama API error:', error);
    
    return NextResponse.json(
      { 
        error: 'Ollama test failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}


