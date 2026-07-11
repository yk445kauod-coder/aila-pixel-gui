import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * Home Page - Landing Screen
 * 
 * Features premium hero section with Matrix Moon background,
 * AILA mascot, system status panel, and smooth animations.
 * 
 * Design: Cinematic hero with professional typography and spacing
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const [mascotState, setMascotState] = useState<'idle' | 'happy'>('idle');
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleStartClick = () => {
    setMascotState('happy');
    setTimeout(() => {
      setLocation('/chat');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero Section */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4"
        style={{
          backgroundImage: 'url(/manus-storage/hero_matrix_moon_v2_621ca987.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/60" />

        {/* Content Container */}
        <div
          className={`
            relative z-10 flex flex-col items-center gap-8 max-w-3xl
            transition-all duration-700 ease-out
            ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Title Section with Image */}
          <div className="text-center space-y-4 animate-pixel-fade-in">
            <img
              src="/manus-storage/title_aila_main_v2_9b6dea87.png"
              alt="A.I.L.A - The Matrix Moon"
              className="w-full max-w-2xl h-auto object-contain"
              style={{ imageRendering: 'crisp-edges' }}
            />
          </div>

          {/* Mascot */}
          <div className="animate-pixel-scale-in" style={{ animationDelay: '200ms' }}>
            <Mascot state={mascotState} size="large" animated={true} />
          </div>

          {/* Status Panel */}
          <div className="animate-pixel-slide-in-up" style={{ animationDelay: '400ms' }}>
            <PixelFrame title="SYSTEM STATUS" variant="default" className="w-full max-w-sm">
              <div className="space-y-3 text-sm font-mono">
                <div className="flex justify-between items-center hover:text-primary transition-colors">
                  <span className="text-muted-foreground">AILA CORE:</span>
                  <span className="text-green-500 font-bold">● ONLINE</span>
                </div>
                <div className="flex justify-between items-center hover:text-primary transition-colors">
                  <span className="text-muted-foreground">MOON MATRIX:</span>
                  <span className="text-green-500 font-bold">● STABLE</span>
                </div>
                <div className="flex justify-between items-center hover:text-primary transition-colors">
                  <span className="text-muted-foreground">LEARN MODULE:</span>
                  <span className="text-green-500 font-bold">● ACTIVE</span>
                </div>
                <div className="flex justify-between items-center hover:text-primary transition-colors">
                  <span className="text-muted-foreground">VISION PROTOCOL:</span>
                  <span className="text-primary font-bold">● INIT</span>
                </div>
              </div>
            </PixelFrame>
          </div>

          {/* CTA Button */}
          <div className="animate-pixel-bounce" style={{ animationDelay: '600ms' }}>
            <PixelButton
              variant="primary"
              size="large"
              onClick={handleStartClick}
              className="mt-4 text-lg"
            >
              PRESS START
            </PixelButton>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-secondary border-t-4 border-primary px-4 py-4">
        <div className="flex justify-center gap-4 max-w-4xl mx-auto flex-wrap">
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
            onClick={() => setLocation('/chat')}
            icon={<PixelIcon name="chat" size="small" />}
          >
            CHAT
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
