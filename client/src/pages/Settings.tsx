import React, { useState } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

/**
 * Settings Page - Configuration Interface
 * 
 * Features settings panels for customization,
 * AILA mascot in idle state, and modular configuration options.
 * 
 * Design: Organized settings panels with pixel art styling
 */
export default function Settings() {
  const [, setLocation] = useLocation();
  const [settings, setSettings] = useState({
    volume: 80,
    language: 'en',
    theme: 'dark',
    notifications: true,
    autoSave: true,
  });

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
      <div className="bg-pixel-gray border-b-4 border-primary px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary uppercase">SETTINGS</h1>
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
            <Mascot state="idle" size="medium" animated={true} />
          </div>

          {/* Center & Right: Settings Panels */}
          <div className="md:col-span-2 space-y-6">
            {/* Audio Settings */}
            <PixelFrame title="AUDIO" variant="default">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-foreground mb-2">
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
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="notifications"
                    checked={settings.notifications}
                    onChange={() => handleToggle('notifications')}
                    className="w-4 h-4"
                  />
                  <label htmlFor="notifications" className="text-sm cursor-pointer">
                    NOTIFICATIONS
                  </label>
                </div>
              </div>
            </PixelFrame>

            {/* Language Settings */}
            <PixelFrame title="LANGUAGE" variant="default">
              <div className="space-y-2">
                {['en', 'ar', 'ar-eg'].map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={settings.language === lang}
                      onChange={(e) => handleChange('language', e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="text-sm uppercase">
                      {lang === 'en'
                        ? 'ENGLISH'
                        : lang === 'ar'
                          ? 'ARABIC'
                          : 'EGYPTIAN'}
                    </span>
                  </label>
                ))}
              </div>
            </PixelFrame>

            {/* System Settings */}
            <PixelFrame title="SYSTEM" variant="default">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold">THEME:</span>
                  <span className="text-primary font-bold uppercase">
                    {settings.theme}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="autoSave"
                    checked={settings.autoSave}
                    onChange={() => handleToggle('autoSave')}
                    className="w-4 h-4"
                  />
                  <label htmlFor="autoSave" className="text-sm cursor-pointer">
                    AUTO-SAVE
                  </label>
                </div>
              </div>
            </PixelFrame>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <PixelButton
                variant="primary"
                size="medium"
                onClick={() => {
                  // Save settings logic
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
                  // Reset to defaults
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
