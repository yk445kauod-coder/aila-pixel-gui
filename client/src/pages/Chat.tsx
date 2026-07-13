import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';
import TTSLoader from '@/components/TTSLoader';
import { aila, ActivityLogEntry } from '@/lib/aila';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'aila';
  timestamp: Date;
  isImage?: boolean;
  imageUrl?: string;
}

/**
 * Chat Page - Conversation Interface
 * 
 * Features professional chat layout with AILA mascot,
 * message history, and smooth animations.
 * 
 * Design: Terminal-style interface with modern polish
 * AI: Powered by Pollinations AI (Free, High-Quality)
 */
export default function Chat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'مرحباً! أنا AILA - مساعد حياتك الذكي 🤖\n\nيمكنني مساعدتك في:\n• البرمجة والذكاء الاصطناعي\n• البحث والكتابة\n• الترجمة\n• تحليل البيانات\n• والمزيد!',
      sender: 'aila',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mascotState, setMascotState] = useState<'idle' | 'working' | 'happy'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activityLog, setActivityLog] = useState<ActivityLogEntry[]>([]);
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [mode, setMode] = useState<'chat' | 'voice'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Subscribe to activity updates
  useEffect(() => {
    const unsubActivity = aila.onActivity((entry) => {
      setActivityLog(prev => [entry, ...prev.slice(0, 49)]);
    });

    const unsubProgress = aila.onProgress((prog, text) => {
      setProgress(prog);
      setProgressText(text);
    });

    return () => {
      unsubActivity();
      unsubProgress();
    };
  }, []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue('');
    setMascotState('working');
    setIsLoading(true);
    setProgress(0);
    setProgressText('جاري الاتصال...');

    try {
      // Check for image generation command
      const lowerMessage = messageToSend.toLowerCase();
      if (lowerMessage.startsWith('/صورة ') || lowerMessage.startsWith('/image ')) {
        const prompt = messageToSend.replace(/^\/(صورة|image)\s*/i, '');
        setProgressText('جاري إنشاء الصورة...');
        const imageUrl = await aila.generateImage(prompt);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: `تم إنشاء الصورة! 🎨`,
          sender: 'aila',
          timestamp: new Date(),
          isImage: true,
          imageUrl,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        // Regular chat
        const response = await aila.chat(messageToSend);
        
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: response,
          sender: 'aila',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
      
      setMascotState('happy');
    } catch (error) {
      // The AI service already returns a friendly message, just show it
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: 'عذراً! لا يمكنني الاتصال بالذكاء الاصطناعي حالياً.\n\nيرجى المحاولة لاحقاً.',
        sender: 'aila',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      setMascotState('idle');
    } finally {
      setIsLoading(false);
      setProgress(0);
      setProgressText('');

      setTimeout(() => {
        setMascotState('idle');
      }, 2000);
    }
  };

  const handleVoiceInput = async () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    setIsListening(true);
    setMascotState('working');
    setProgressText('جاري الاستماع...');

    try {
      const transcript = await aila.listen();
      setInputValue(transcript);
      
      if (transcript.trim()) {
        setIsListening(false);
        handleSendMessage();
      }
    } catch (error) {
      console.error('Voice error:', error);
      setProgressText('');
    } finally {
      setIsListening(false);
      setMascotState('idle');
    }
  };

  const handleSpeak = async (text: string) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    setMascotState('working');
    
    try {
      await aila.speak(text);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsSpeaking(false);
      setMascotState('idle');
    }
  };

  const handleClearChat = () => {
    setMessages([{
      id: '1',
      text: 'تم مسح المحادثة! ابدأ محادثة جديدة 📝',
      sender: 'aila',
      timestamp: new Date(),
    }]);
    aila.clearHistory();
    setActivityLog([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-secondary to-primary/20 border-b-4 border-primary px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-widest">
              💬 AILA CHAT
            </h1>
            {/* Mode Toggle */}
            <div className="flex gap-2">
              <PixelButton
                variant={mode === 'chat' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setMode('chat')}
              >
                💬 TEXT
              </PixelButton>
              <PixelButton
                variant={mode === 'voice' ? 'primary' : 'secondary'}
                size="small"
                onClick={() => setMode('voice')}
              >
                🎤 VOICE
              </PixelButton>
            </div>
          </div>
          <PixelButton
            variant="secondary"
            size="small"
            onClick={() => setLocation('/')}
            icon={<PixelIcon name="home" size="small" />}
          >
            HOME
          </PixelButton>
        </div>
        
        {/* Progress Bar */}
        {isLoading && (
          <div className="mt-2 max-w-6xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-black/50 rounded overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs text-primary font-mono">{progressText}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Mascot & Activity Log */}
        <div className="hidden lg:flex lg:w-72 bg-secondary border-r-4 border-primary flex-col">
          <div className="flex-1 flex flex-col items-center justify-center p-4 border-b-4 border-primary">
            <Mascot state={mascotState} size="large" animated={true} />
            <div className="mt-2 text-xs text-primary">
              {isListening ? '🎤 LISTENING...' : 
               isSpeaking ? '🔊 SPEAKING...' : 
               isLoading ? '⏳ WORKING...' : '✓ READY'}
            </div>
          </div>
          
          {/* Activity Log */}
          <div className="flex-1 overflow-y-auto p-2">
            <h3 className="text-xs font-bold text-primary mb-2 uppercase">📜 ACTIVITY LOG</h3>
            {activityLog.length === 0 ? (
              <p className="text-xs text-muted opacity-50">No activity yet</p>
            ) : (
              <div className="space-y-1">
                {activityLog.slice(0, 10).map((entry) => (
                  <div 
                    key={entry.id}
                    className={`
                      text-xs p-1 rounded
                      ${entry.type === 'success' ? 'bg-green-500/20 text-green-400' : 
                        entry.type === 'error' ? 'bg-red-500/20 text-red-400' :
                        entry.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-primary/10 text-primary'}
                    `}
                  >
                    <span className="font-bold">{entry.action}</span>
                    {entry.details && <span className="opacity-70 ml-1">{entry.details}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Chat Messages */}
        <div className="flex-1 flex flex-col bg-black">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`
                  flex animate-pixel-fade-in flex-col
                  ${message.sender === 'user' ? 'items-end' : 'items-start'}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <PixelFrame
                  variant={message.sender === 'user' ? 'compact' : 'default'}
                  className={`
                    max-w-xl
                    ${
                      message.sender === 'user'
                        ? 'bg-primary text-black border-primary'
                        : 'bg-card text-foreground border-primary'
                    }
                  `}
                >
                  <p className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
                    {message.text}
                  </p>
                  
                  {/* Image Display */}
                  {message.isImage && message.imageUrl && (
                    <div className="mt-2">
                      <img 
                        src={message.imageUrl} 
                        alt="Generated"
                        className="max-w-full rounded border-2 border-primary/50"
                        loading="lazy"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mt-2 gap-2">
                    <p className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                    {message.sender === 'aila' && (
                      <button
                        onClick={() => handleSpeak(message.text)}
                        className="text-xs hover:text-primary transition-colors disabled:opacity-50"
                        disabled={isSpeaking}
                      >
                        {isSpeaking ? '🔊' : '🔈'} SPEAK
                      </button>
                    )}
                  </div>
                </PixelFrame>
              </div>
            ))}

            {/* TTS Loader */}
            {isLoading && (
              <div className="flex justify-start animate-pixel-fade-in">
                <PixelFrame variant="compact">
                  <TTSLoader isActive={true} text={progressText || 'PROCESSING...'} />
                </PixelFrame>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-primary bg-secondary p-4">
            <div className="flex gap-2">
              {mode === 'voice' ? (
                <>
                  <PixelButton
                    variant={isListening ? 'primary' : 'secondary'}
                    size="large"
                    onClick={handleVoiceInput}
                    className="w-full"
                  >
                    🎤 {isListening ? 'STOP LISTENING' : 'START VOICE INPUT'}
                  </PixelButton>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="اكتب رسالتك... / Type your message..."
                    className="pixel-input flex-1"
                    disabled={isLoading}
                  />
                  <PixelButton
                    variant="primary"
                    size="medium"
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    icon={<PixelIcon name="power" size="small" />}
                  >
                    SEND
                  </PixelButton>
                </>
              )}
              <PixelButton
                variant="secondary"
                size="medium"
                onClick={handleVoiceInput}
                disabled={isLoading}
              >
                🎤
              </PixelButton>
              <PixelButton
                variant="secondary"
                size="medium"
                onClick={handleClearChat}
                disabled={isLoading}
              >
                🗑️
              </PixelButton>
            </div>
            
            {/* Quick Commands */}
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="text-xs text-muted opacity-50">Quick:</span>
              <code className="text-xs bg-black/30 px-1 rounded cursor-pointer hover:bg-primary/20" 
                    onClick={() => setInputValue('/صورة ')}>
                /صورة
              </code>
              <code className="text-xs bg-black/30 px-1 rounded cursor-pointer hover:bg-primary/20"
                    onClick={() => setInputValue('اكتب كود بايثون ')}>
                كود
              </code>
              <code className="text-xs bg-black/30 px-1 rounded cursor-pointer hover:bg-primary/20"
                    onClick={() => setInputValue('ترجم إلى الإنجليزية: ')}>
                ترجمة
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-secondary border-t-4 border-primary px-4 py-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto flex-wrap">
          <PixelButton
            variant="secondary"
            size="small"
            onClick={() => setLocation('/')}
            icon={<PixelIcon name="home" size="small" />}
          >
            HOME
          </PixelButton>
          <PixelButton
            variant="secondary"
            size="small"
            onClick={() => setLocation('/about')}
            icon={<PixelIcon name="user" size="small" />}
          >
            ABOUT
          </PixelButton>
          <PixelButton
            variant="secondary"
            size="small"
            onClick={() => setLocation('/settings')}
            icon={<PixelIcon name="settings" size="small" />}
          >
            SETTINGS
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
