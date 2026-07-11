import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';
import TTSLoader from '@/components/TTSLoader';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'aila';
  timestamp: Date;
}

/**
 * Chat Page - Conversation Interface
 * 
 * Features AILA mascot on the left with state changes,
 * chat messages in retro terminal style, and TTS loader.
 * 
 * Design: Terminal-like chat interface with pixel art styling
 */
export default function Chat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'AILA ONLINE. READY TO ASSIST.',
      sender: 'aila',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [mascotState, setMascotState] = useState<'idle' | 'working' | 'happy'>('idle');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setMascotState('working');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'PROCESSING REQUEST... RESPONSE GENERATED.',
        sender: 'aila',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setMascotState('happy');
      setIsLoading(false);

      setTimeout(() => {
        setMascotState('idle');
      }, 2000);
    }, 1500);
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
      <div className="bg-pixel-gray border-b-4 border-primary px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary uppercase">CHAT</h1>
          <PixelButton
            variant="secondary"
            size="small"
            onClick={() => setLocation('/')}
            icon={<PixelIcon name="home" size="small" />}
          >
            HOME
          </PixelButton>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Mascot */}
        <div className="hidden md:flex md:w-1/4 bg-pixel-gray border-r-4 border-primary items-center justify-center p-4">
          <Mascot state={mascotState} size="large" animated={true} />
        </div>

        {/* Right: Chat Messages */}
        <div className="flex-1 flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <PixelFrame
                  variant={message.sender === 'user' ? 'compact' : 'default'}
                  className={`max-w-xs md:max-w-md ${
                    message.sender === 'user'
                      ? 'bg-primary text-black'
                      : 'bg-card text-foreground'
                  }`}
                >
                  <p className="text-sm font-mono break-words">{message.text}</p>
                  <p className="text-xs mt-2 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </PixelFrame>
              </div>
            ))}

            {/* TTS Loader */}
            {isLoading && (
              <div className="flex justify-start">
                <PixelFrame variant="compact">
                  <TTSLoader isActive={true} text="THINKING..." />
                </PixelFrame>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t-4 border-primary bg-pixel-gray p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="TYPE MESSAGE..."
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
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-pixel-gray border-t-4 border-primary px-4 py-4">
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
