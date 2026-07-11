import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * Home Page - Landing Screen
 * 
 * Features the Matrix Moon hero visual, AILA mascot in idle state,
 * system status panel, and navigation to other sections.
 * 
 * Design: Retro arcade game title screen aesthetic
 */
export default function Home() {
  const [, setLocation] = useLocation();
  const [mascotState, setMascotState] = useState<'idle' | 'happy'>('idle');

  const handleStartClick = () => {
    setMascotState('happy');
    setTimeout(() => {
      setLocation('/chat');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Hero Section with Matrix Moon Background */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative overflow-hidden px-4"
        style={{
          backgroundImage: 'url(/manus-storage/aila_hero_7d66c2e7.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-primary uppercase tracking-widest mb-2">
              A.I.L.A
            </h1>
            <p className="text-lg md:text-xl text-pixel-gold uppercase tracking-wider">
              THE MATRIX MOON
            </p>
          </div>

          {/* Mascot */}
          <Mascot state={mascotState} size="large" animated={true} />

          {/* Status Panel */}
          <PixelFrame
            title="SYSTEM STATUS"
            variant="compact"
            className="w-full max-w-sm"
          >
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-pixel-gray-light">AILA CORE:</span>
                <span className="text-pixel-green font-bold">ONLINE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pixel-gray-light">MOON MATRIX:</span>
                <span className="text-pixel-green font-bold">STABLE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pixel-gray-light">LEARN MODULE:</span>
                <span className="text-pixel-green font-bold">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-pixel-gray-light">VISION PROTOCOL:</span>
                <span className="text-primary font-bold">INIT</span>
              </div>
            </div>
          </PixelFrame>

          {/* CTA Button */}
          <PixelButton
            variant="primary"
            size="large"
            onClick={handleStartClick}
            className="mt-4"
          >
            PRESS START
          </PixelButton>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="bg-pixel-gray border-t-4 border-primary px-4 py-4">
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
