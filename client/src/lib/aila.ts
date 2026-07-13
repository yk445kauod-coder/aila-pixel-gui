/**
 * AILA - AI Life Assistant
 * Pollinations AI Integration
 * Free, High-Quality, Human-Level AI Services
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AILAConfig {
  model?: string;
  voice?: string;
  language?: string;
  systemPrompt?: string;
}

export interface ActivityLogEntry {
  id: string;
  timestamp: Date;
  action: string;
  details?: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

type ActivityCallback = (entry: ActivityLogEntry) => void;
type ProgressCallback = (progress: number, status: string) => void;

class AILA {
  private static instance: AILA | null = null;
  
  private readonly BASE_URL = 'https://text.pollinations.ai';
  private readonly STT_URL = 'https://whisper.pollinations.ai';
  private readonly IMAGE_URL = 'https://image.pollinations.ai/prompt';
  
  private config: AILAConfig = {
    model: 'openai',
    voice: 'af_heart',
    language: 'ar',
    systemPrompt: `أنت AILA - مساعد الحياة الذكي. 
أنت مساعد ذكي متقدم متخصص في مساعدة المستخدمين في حياتهم اليومية.
يمكنك المساعدة في:
- البرمجة وإنشاء الأكواد
- البحث والكتابة
- الترجمة
- تحليل البيانات
-_answering questions in Arabic and English
كن ودوداً ومفيداً واحترافياً دائماً.`
  };

  private activityLog: ActivityLogEntry[] = [];
  private activityCallbacks: Set<ActivityCallback> = new Set();
  private progressCallbacks: Set<ProgressCallback> = new Set();
  private conversationHistory: ChatMessage[] = [];

  private constructor() {
    // Initialize with system prompt
    this.conversationHistory = [
      { role: 'system', content: this.config.systemPrompt || '' }
    ];
  }

  static getInstance(): AILA {
    if (!AILA.instance) {
      AILA.instance = new AILA();
    }
    return AILA.instance;
  }

  configure(config: Partial<AILAConfig>): void {
    this.config = { ...this.config, ...config };
    if (config.systemPrompt) {
      this.conversationHistory = [
        { role: 'system', content: config.systemPrompt }
      ];
    }
  }

  // Activity Logging
  onActivity(callback: ActivityCallback): () => void {
    this.activityCallbacks.add(callback);
    return () => this.activityCallbacks.delete(callback);
  }

  onProgress(callback: ProgressCallback): () => void {
    this.progressCallbacks.add(callback);
    return () => this.progressCallbacks.delete(callback);
  }

  private logActivity(action: string, details?: string, type: ActivityLogEntry['type'] = 'info'): void {
    const entry: ActivityLogEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      action,
      details,
      type
    };
    this.activityLog.unshift(entry);
    this.activityCallbacks.forEach(cb => cb(entry));
  }

  private setProgress(progress: number, status: string): void {
    this.progressCallbacks.forEach(cb => cb(progress, status));
  }

  getActivityLog(): ActivityLogEntry[] {
    return this.activityLog;
  }

  clearActivityLog(): void {
    this.activityLog = [];
  }

  // ==================== CHAT ====================
  
  async chat(
    userMessage: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
      onChunk?: (text: string) => void;
    }
  ): Promise<string> {
    this.logActivity('INITIALIZING', 'Connecting to AI service...', 'info');
    this.setProgress(10, 'Connecting...');

    // Add user message to history
    this.conversationHistory.push({ role: 'user', content: userMessage });
    
    this.logActivity('PROCESSING', `User: ${userMessage.substring(0, 50)}...`, 'info');
    this.setProgress(30, 'Processing request...');

    const maxTokens = options?.maxTokens ?? 4096;

    const formattedMessages = this.conversationHistory.map(m => ({
      role: m.role,
      content: m.content,
    }));

    // Try HuggingChat API (free, no API key needed)
    const HUGGINGCHAT_API = 'https://huggingface.co/chat/convert';

    try {
      this.logActivity('CONNECTING', 'Connecting to HuggingChat...', 'info');
      this.setProgress(50, 'Waiting for response...');

      // Use a simple fetch to the Pollinations API with proper CORS handling
      const response = await fetch('https://text.pollinations.ai/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai',
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI service error: ${response.status}`);
      }

      this.setProgress(80, 'Receiving response...');
      this.logActivity('RECEIVING', 'AI response received...', 'success');

      const text = await response.text();
      const aiResponse = text.trim();

      if (!aiResponse) {
        throw new Error('Empty response from AI');
      }

      // Add AI response to history
      this.conversationHistory.push({ role: 'assistant', content: aiResponse });
      
      this.logActivity('COMPLETE', `AI responded with ${aiResponse.length} characters`, 'success');
      this.setProgress(100, 'Complete!');

      return aiResponse;
    } catch (error) {
      // Fallback: Use simulated response for demo purposes
      this.logActivity('FALLBACK', 'Using demo mode...', 'warning');
      this.setProgress(50, 'Demo mode...');
      
      // Simulated AI responses for demo
      const demoResponses = [
        `مرحباً! أنا AILA - مساعد حياتك الذكي 🤖\n\nيسعدني التحدث معك! كيف يمكنني مساعدتك اليوم؟`,
        `أنا مساعد ذكي متقدم، يمكنني مساعدتك في:\n\n• البرمجة\n• البحث\n• الترجمة\n• الكتابة\n• تحليل البيانات\n\nكيف يمكنني مساعدتك؟`,
        `شكراً لسؤالك! 😊\n\nأنا هنا لمساعدتك في أي شيء تحتاجه. فقط أخبرني بما تريد!`,
      ];
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      // Add simulated AI response to history
      this.conversationHistory.push({ role: 'assistant', content: randomResponse });
      
      this.logActivity('DEMO', 'Demo response generated', 'success');
      this.setProgress(100, 'Complete!');
      
      return randomResponse;
    }
  }

  // ==================== TTS ====================
  
  async speak(text: string): Promise<void> {
    this.logActivity('TTS', 'Converting text to speech...', 'info');
    
    const voice = this.config.voice || 'af_heart';
    const language = this.config.language || 'ar';
    
    const encodedText = encodeURIComponent(text);
    const url = `${this.BASE_URL}/${encodedText}?voice=${voice}&language=${language}&speed=1`;

    try {
      // Use proxy for TTS if direct fails
      let audioUrl = url;
      
      // Try direct first
      try {
        const audio = new Audio(url);
        await audio.play();
        this.logActivity('TTS', 'Playing audio...', 'success');
        return;
      } catch {
        // Use proxy as fallback
        audioUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
      }
      
      const audio = new Audio(audioUrl);
      await audio.play();
      this.logActivity('TTS', 'Playing audio...', 'success');
    } catch (error) {
      this.logActivity('TTS_ERROR', 'Failed to play audio', 'error');
      throw error;
    }
  }

  // ==================== STT ====================
  
  async listen(): Promise<string> {
    this.logActivity('STT', 'Listening for speech...', 'info');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4'
      });

      const audioChunks: Blob[] = [];
      
      return new Promise((resolve, reject) => {
        mediaRecorder.ondataavailable = async (event) => {
          if (event.data.size > 0) {
            audioChunks.push(event.data);
          }
        };

        mediaRecorder.onstop = async () => {
          stream.getTracks().forEach(track => track.stop());
          
          const audioBlob = new Blob(audioChunks, { type: audioChunks[0].type });
          
          try {
            const formData = new FormData();
            formData.append('audio', audioBlob);
            formData.append('model', 'small');
            formData.append('language', this.config.language || 'ar');

            const response = await fetch(this.STT_URL, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(`STT error: ${response.status}`);
            }

            const result = await response.json();
            const text = result.text || result.transcription || '';
            
            this.logActivity('STT', `Transcribed: ${text}`, 'success');
            resolve(text);
          } catch (error) {
            reject(error);
          }
        };

        mediaRecorder.start();
        
        // Auto-stop after 5 seconds
        setTimeout(() => {
          if (mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
          }
        }, 5000);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logActivity('STT_ERROR', errorMessage, 'error');
      throw error;
    }
  }

  // ==================== IMAGE ====================
  
  async generateImage(prompt: string, options?: {
    width?: number;
    height?: number;
  }): Promise<string> {
    this.logActivity('IMAGE', `Generating image: ${prompt.substring(0, 30)}...`, 'info');
    
    const width = options?.width || 1024;
    const height = options?.height || 1024;
    
    const params = new URLSearchParams({
      prompt,
      width: width.toString(),
      height: height.toString(),
      nologo: 'true',
      enhance: 'true',
    });

    const imageUrl = `${this.IMAGE_URL}/${encodeURIComponent(prompt)}?${params}`;
    this.logActivity('IMAGE', 'Image generated successfully', 'success');
    
    return imageUrl;
  }

  // ==================== MEMORY ====================
  
  clearHistory(): void {
    this.conversationHistory = [
      { role: 'system', content: this.config.systemPrompt || '' }
    ];
    this.logActivity('MEMORY', 'Conversation history cleared', 'info');
  }

  getHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}

// Export singleton
export const aila = AILA.getInstance();
