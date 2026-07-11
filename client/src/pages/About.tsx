import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * About Page - Team & Project Information
 * 
 * Features professional layout with team information,
 * project details, and Egytronic logo showcase.
 * 
 * Design: Multi-column layout with smooth animations
 */
export default function About() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-secondary border-b-4 border-primary px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary uppercase tracking-widest">
            ABOUT AILA
          </h1>
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

      {/* Main Content */}
      <div className="flex-1 px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left: Mascot */}
          <div
            className={`
              flex justify-center items-start
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}
          >
            <Mascot state="working" size="medium" animated={true} />
          </div>

          {/* Center: Project Info */}
          <div
            className={`
              space-y-6
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '100ms' }}
          >
            <PixelFrame title="PROJECT" variant="default">
              <div className="space-y-4 text-sm leading-relaxed">
                <p className="text-foreground">
                  A.I.L.A is an intelligent digital assistant designed with cutting-edge AI technology and retro pixel art aesthetics.
                </p>
                <p className="text-foreground">
                  Built to combine nostalgia with innovation, creating a unique experience that bridges classic arcade gaming with modern artificial intelligence.
                </p>
              </div>
            </PixelFrame>

            <PixelFrame title="FEATURES" variant="default">
              <ul className="space-y-3 text-sm">
                {[
                  'Intelligent Conversation',
                  'Task Management',
                  'Multi-Language Support',
                  'Voice Integration',
                ].map((feature, i) => (
                  <li
                    key={i}
                    className="flex gap-3 hover:text-primary transition-colors"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span className="text-primary font-bold">▸</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </PixelFrame>
          </div>

          {/* Right: Team Info */}
          <div
            className={`
              space-y-6
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
            `}
            style={{ transitionDelay: '200ms' }}
          >
            <PixelFrame title="DEVELOPMENT TEAM" variant="default">
              <div className="space-y-4">
                {/* Egytronic Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/upload/EgytronicLogo.webp"
                    alt="Egytronic Logo"
                    className="w-28 h-28 object-contain hover:scale-110 transition-transform duration-300"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-primary font-bold uppercase text-sm tracking-widest">
                    EGYTRONIC
                  </h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    A team of passionate developers and designers creating innovative AI experiences with pixel art aesthetics.
                  </p>
                </div>
              </div>
            </PixelFrame>

            <PixelFrame title="TIMELINE" variant="default">
              <div className="space-y-3 text-xs font-mono">
                {[
                  { year: '2024', event: 'GENESIS', color: 'text-primary' },
                  { year: '2025', event: 'EVOLUTION', color: 'text-primary' },
                  { year: '2026', event: 'ASCENSION', color: 'text-primary' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center hover:text-primary transition-colors"
                  >
                    <span className="text-muted-foreground">{item.year}:</span>
                    <span className={`font-bold ${item.color}`}>{item.event}</span>
                  </div>
                ))}
              </div>
            </PixelFrame>
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
