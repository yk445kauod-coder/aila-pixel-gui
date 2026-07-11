import React from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * About Page - Team & Project Information
 * 
 * Features the Egytronic logo, team information, project timeline,
 * and AILA mascot in working state.
 * 
 * Design: Information panels with pixel art styling
 */
export default function About() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-pixel-gray border-b-4 border-primary px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary uppercase">ABOUT AILA</h1>
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
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Mascot */}
          <div className="flex justify-center items-start">
            <Mascot state="working" size="medium" animated={true} />
          </div>

          {/* Center: Project Info */}
          <div className="space-y-6">
            <PixelFrame title="PROJECT" variant="default">
              <div className="space-y-3 text-sm">
                <p className="text-foreground leading-relaxed">
                  A.I.L.A is an intelligent digital assistant designed to help users manage their daily tasks, projects, and creative endeavors.
                </p>
                <p className="text-foreground leading-relaxed">
                  Built with cutting-edge AI technology and retro pixel art aesthetics, A.I.L.A combines nostalgia with innovation.
                </p>
              </div>
            </PixelFrame>

            <PixelFrame title="FEATURES" variant="default">
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2">
                  <span className="text-primary">▸</span>
                  <span>Intelligent Conversation</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span>
                  <span>Task Management</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span>
                  <span>Multi-Language Support</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">▸</span>
                  <span>Voice Integration</span>
                </li>
              </ul>
            </PixelFrame>
          </div>

          {/* Right: Team Info */}
          <div className="space-y-6">
            <PixelFrame title="DEVELOPMENT TEAM" variant="default">
              <div className="space-y-4">
                {/* Egytronic Logo */}
                <div className="flex justify-center mb-4">
                  <img
                    src="/upload/EgytronicLogo.webp"
                    alt="Egytronic Logo"
                    className="w-24 h-24 object-contain"
                    style={{ imageRendering: 'crisp-edges' }}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-primary font-bold uppercase text-sm mb-2">
                    EGYTRONIC
                  </h3>
                  <p className="text-pixel-gray-light text-xs leading-relaxed">
                    A team of passionate developers and designers creating innovative AI experiences.
                  </p>
                </div>
              </div>
            </PixelFrame>

            <PixelFrame title="TIMELINE" variant="default">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-pixel-gray-light">2024:</span>
                  <span className="text-primary font-bold">GENESIS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pixel-gray-light">2025:</span>
                  <span className="text-primary font-bold">EVOLUTION</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-pixel-gray-light">2026:</span>
                  <span className="text-pixel-gold font-bold">ASCENSION</span>
                </div>
              </div>
            </PixelFrame>
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
