import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * Settings Page - Configuration Interface
 * 
 * Features professional settings panels with smooth animations
 * and responsive layout.
 * 
 * Design: Organized configuration interface with pixel art styling
 */
export default function Settings() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);
  const [settings, setSettings] = useState({
    volume: 80,
    language: 'en',
    theme: 'dark',
    notifications: true,
    autoSave: true,
  });

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key],
    }));
  };

  const handleChange = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-secondary border-b-4 border-primary px-4 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-4xl font-bold text-primary uppercase tracking-widest">
            SETTINGS
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
            <Mascot state="idle" size="medium" animated={true} />
          </div>

          {/* Center & Right: Settings Panels */}
          <div
            className={`
              md:col-span-2 space-y-6
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Audio Settings */}
            <PixelFrame title="AUDIO" variant="default">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-3">
                    VOLUME: {settings.volume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.volume}
                    onChange={(e) =>
                      handleChange('volume', parseInt(e.target.value))
                    }
                    className="w-full h-2 bg-secondary border-2 border-primary cursor-pointer"
                    style={{
                      accentColor: '#FFA500',
                    }}
                  />
                </div>
                <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-mono">NOTIFICATIONS</span>
                </label>
              </div>
            </PixelFrame>

            {/* Language Settings */}
            <PixelFrame title="LANGUAGE" variant="default">
              <div className="space-y-3">
                {[
                  { value: 'en', label: 'ENGLISH' },
                  { value: 'ar', label: 'ARABIC' },
                  { value: 'ar-eg', label: 'EGYPTIAN' },
                ].map((lang) => (
                  <label
                    key={lang.value}
                    className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
                  >
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={settings.language === lang.value}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-sm font-mono uppercase">{lang.label}</span>
                  </label>
                ))}
              </div>
            </PixelFrame>

            {/* System Settings */}
            <PixelFrame title="SYSTEM" variant="default">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b-2 border-primary">
                  <span className="text-sm font-bold">THEME:</span>
                  <span className="text-primary font-bold uppercase text-sm">
                    {settings.theme}
                  </span>
                </div>
                <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={() => handleToggle('autoSave')}
                    className="w-4 h-4 accent-primary"
                  />
                  <span className="text-sm font-mono">AUTO-SAVE</span>
                </label>
              </div>
            </PixelFrame>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <PixelButton
                variant="primary"
                size="medium"
                onClick={() => {
                  console.log('Settings saved:', settings);
                }}
                icon={<PixelIcon name="check" size="small" />}
              >
                SAVE
              </PixelButton>
              <PixelButton
                variant="secondary"
                size="medium"
                onClick={() => {
                  setSettings({
                    volume: 80,
                    language: 'en',
                    theme: 'dark',
                    notifications: true,
                    autoSave: true,
                  });
                }}
                icon={<PixelIcon name="power" size="small" />}
              >
                RESET
              </PixelButton>
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
            onClick={() => setLocation('/chat')}
            icon={<PixelIcon name="chat" size="small" />}
          >
            CHAT
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
