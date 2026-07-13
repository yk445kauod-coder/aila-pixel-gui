import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import Mascot from '@/components/Mascot';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';
import { aila } from '@/lib/aila';

/**
 * Settings Page - Configuration Interface
 * 
 * Features professional settings panels with smooth animations
 * and responsive layout.
 * 
 * Design: Organized configuration interface with pixel art styling
 * AI: Full configuration for AILA AI system
 */
export default function Settings() {
  const [, setLocation] = useLocation();
  const [showContent, setShowContent] = useState(false);
  const [activeTab, setActiveTab] = useState<'ai' | 'voice' | 'system'>('ai');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  
  const [aiSettings, setAiSettings] = useState({
    model: 'openai',
    temperature: 0.7,
    maxTokens: 4096,
    systemPrompt: `أنت AILA - مساعد الحياة الذكي. 
كن ودوداً ومفيداً واحترافياً دائماً.`,
  });

  const [voiceSettings, setVoiceSettings] = useState({
    voice: 'af_heart',
    language: 'ar',
    autoSpeak: false,
    listenOnStart: false,
  });

  const [systemSettings, setSystemSettings] = useState({
    theme: 'dark',
    notifications: true,
    autoSave: true,
    showActivityLog: true,
  });

  const models = [
    { value: 'openai', label: 'OpenAI (GPT-like)' },
    { value: 'anthropic', label: 'Anthropic (Claude-like)' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'llama', label: 'Llama' },
    { value: 'mistral', label: 'Mistral' },
    { value: 'qwen', label: 'Qwen' },
  ];

  const voices = [
    { value: 'af_heart', label: '❤️ Heart (Female, Arabic)', gender: 'female' },
    { value: 'af_bella', label: '💃 Bella (Female, Arabic)', gender: 'female' },
    { value: 'am_adam', label: '👨 Adam (Male, Arabic)', gender: 'male' },
    { value: 'af_sky', label: '🌤️ Sky (Female, English)', gender: 'female' },
    { value: 'am_eric', label: '👨 Eric (Male, English)', gender: 'male' },
    { value: 'af_nova', label: '⭐ Nova (Female, English)', gender: 'female' },
  ];

  const languages = [
    { value: 'ar', label: '🇸🇦 Arabic' },
    { value: 'ar-EG', label: '🇪🇬 Egyptian Arabic' },
    { value: 'en', label: '🇺🇸 English' },
    { value: 'multi', label: '🌐 Multilingual' },
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleSave = () => {
    setSaveStatus('saving');
    
    // Configure AILA with new settings
    aila.configure({
      model: aiSettings.model,
      voice: voiceSettings.voice,
      language: voiceSettings.language,
      systemPrompt: aiSettings.systemPrompt,
    });

    // Simulate save
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleReset = () => {
    setAiSettings({
      model: 'openai',
      temperature: 0.7,
      maxTokens: 4096,
      systemPrompt: `أنت AILA - مساعد الحياة الذكي. 
كن ودوداً ومفيداً واحترافياً دائماً.`,
    });
    setVoiceSettings({
      voice: 'af_heart',
      language: 'ar',
      autoSpeak: false,
      listenOnStart: false,
    });
    setSystemSettings({
      theme: 'dark',
      notifications: true,
      autoSave: true,
      showActivityLog: true,
    });
    aila.configure({
      model: 'openai',
      voice: 'af_heart',
      language: 'ar',
    });
  };

  const testVoice = () => {
    aila.speak('مرحباً! أنا AILA - مساعد حياتك الذكي!');
  };

  const testAI = async () => {
    try {
      await aila.chat('قدم نفسك باختصار');
    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 via-secondary to-primary/20 border-b-4 border-primary px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-widest">
            ⚙️ AILA SETTINGS
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
        
        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto mt-4 flex gap-2 flex-wrap">
          <PixelButton
            variant={activeTab === 'ai' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setActiveTab('ai')}
          >
            🤖 AI SETTINGS
          </PixelButton>
          <PixelButton
            variant={activeTab === 'voice' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setActiveTab('voice')}
          >
            🎤 VOICE SETTINGS
          </PixelButton>
          <PixelButton
            variant={activeTab === 'system' ? 'primary' : 'secondary'}
            size="small"
            onClick={() => setActiveTab('system')}
          >
            💻 SYSTEM
          </PixelButton>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Mascot & Quick Actions */}
          <div
            className={`
              flex flex-col items-center gap-4
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
            `}
          >
            <Mascot state="idle" size="medium" animated={true} />
            
            {/* Quick Test Buttons */}
            <PixelFrame title="⚡ QUICK TEST" variant="compact">
              <div className="space-y-2">
                <PixelButton
                  variant="secondary"
                  size="small"
                  onClick={testVoice}
                  className="w-full"
                >
                  🔊 Test Voice
                </PixelButton>
                <PixelButton
                  variant="secondary"
                  size="small"
                  onClick={testAI}
                  className="w-full"
                >
                  🤖 Test AI
                </PixelButton>
              </div>
            </PixelFrame>
            
            {/* API Status */}
            <PixelFrame title="📡 STATUS" variant="compact">
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>AI Service:</span>
                  <span className="text-green-400">✓ Online</span>
                </div>
                <div className="flex justify-between">
                  <span>TTS:</span>
                  <span className="text-green-400">✓ Ready</span>
                </div>
                <div className="flex justify-between">
                  <span>STT:</span>
                  <span className="text-green-400">✓ Ready</span>
                </div>
              </div>
            </PixelFrame>
          </div>

          {/* Right: Settings Panels */}
          <div
            className={`
              lg:col-span-3 space-y-6
              transition-all duration-700 ease-out
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{ transitionDelay: '100ms' }}
          >
            {/* AI Settings */}
            {activeTab === 'ai' && (
              <>
                <PixelFrame title="🤖 AI MODEL" variant="default">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2">MODEL:</label>
                      <select
                        value={aiSettings.model}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, model: e.target.value }))}
                        className="pixel-input w-full"
                      >
                        {models.map(m => (
                          <option key={m.value} value={m.value}>{m.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        TEMPERATURE: {aiSettings.temperature.toFixed(1)}
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2"
                        step="0.1"
                        value={aiSettings.temperature}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                        className="w-full h-2 bg-secondary border-2 border-primary cursor-pointer"
                      />
                      <div className="flex justify-between text-xs mt-1">
                        <span>Precise</span>
                        <span>Creative</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-2">
                        MAX TOKENS: {aiSettings.maxTokens}
                      </label>
                      <input
                        type="range"
                        min="256"
                        max="8192"
                        step="256"
                        value={aiSettings.maxTokens}
                        onChange={(e) => setAiSettings(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                        className="w-full h-2 bg-secondary border-2 border-primary cursor-pointer"
                      />
                    </div>
                  </div>
                </PixelFrame>

                <PixelFrame title="📝 SYSTEM PROMPT" variant="default">
                  <textarea
                    value={aiSettings.systemPrompt}
                    onChange={(e) => setAiSettings(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    className="pixel-input w-full h-40 resize-none"
                    placeholder="Enter system prompt..."
                  />
                </PixelFrame>
              </>
            )}

            {/* Voice Settings */}
            {activeTab === 'voice' && (
              <>
                <PixelFrame title="🎤 VOICE SELECTION" variant="default">
                  <div className="space-y-3">
                    {voices.map((v) => (
                      <label
                        key={v.value}
                        className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors p-2 rounded hover:bg-primary/10"
                      >
                        <input
                          type="radio"
                          name="voice"
                          value={v.value}
                          checked={voiceSettings.voice === v.value}
                          onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm font-mono">{v.label}</span>
                        <button
                          onClick={() => {
                            const prev = voiceSettings.voice;
                            setVoiceSettings(prev => ({ ...prev, voice: v.value }));
                            testVoice();
                            setVoiceSettings(prev => ({ ...prev, voice: prev.voice }));
                          }}
                          className="text-xs text-primary hover:underline ml-2"
                        >
                          [Test]
                        </button>
                      </label>
                    ))}
                  </div>
                </PixelFrame>

                <PixelFrame title="🌐 LANGUAGE" variant="default">
                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <label
                        key={lang.value}
                        className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"
                      >
                        <input
                          type="radio"
                          name="language"
                          value={lang.value}
                          checked={voiceSettings.language === lang.value}
                          onChange={(e) => setVoiceSettings(prev => ({ ...prev, language: e.target.value }))}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-sm font-mono uppercase">{lang.label}</span>
                      </label>
                    ))}
                  </div>
                </PixelFrame>

                <PixelFrame title="🔧 VOICE OPTIONS" variant="default">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={voiceSettings.autoSpeak}
                        onChange={(e) => setVoiceSettings(prev => ({ ...prev, autoSpeak: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-mono">AUTO-SPEAK RESPONSES</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={voiceSettings.listenOnStart}
                        onChange={(e) => setVoiceSettings(prev => ({ ...prev, listenOnStart: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-mono">START IN VOICE MODE</span>
                    </label>
                  </div>
                </PixelFrame>
              </>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <>
                <PixelFrame title="💻 SYSTEM OPTIONS" variant="default">
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={systemSettings.notifications}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, notifications: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-mono">SHOW NOTIFICATIONS</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={systemSettings.autoSave}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, autoSave: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-mono">AUTO-SAVE CHAT HISTORY</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors">
                      <input
                        type="checkbox"
                        checked={systemSettings.showActivityLog}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, showActivityLog: e.target.checked }))}
                        className="w-4 h-4 accent-primary"
                      />
                      <span className="text-sm font-mono">SHOW ACTIVITY LOG</span>
                    </label>
                  </div>
                </PixelFrame>

                <PixelFrame title="🔑 API CONFIGURATION" variant="default">
                  <div className="space-y-3 text-xs">
                    <div className="p-3 bg-black/30 rounded border border-primary/30">
                      <div className="font-bold text-primary mb-1">Pollinations AI (Primary)</div>
                      <div className="opacity-70">✅ Free, No API Key Required</div>
                      <div className="opacity-70">• LLM: text.pollinations.ai</div>
                      <div className="opacity-70">• TTS: Voice Synthesis</div>
                      <div className="opacity-70">• STT: Whisper Transcription</div>
                      <div className="opacity-70">• Image: flux, turbo models</div>
                    </div>
                    <div className="p-3 bg-black/30 rounded border border-primary/30">
                      <div className="font-bold text-primary mb-1">Optional: ElevenLabs</div>
                      <input
                        type="password"
                        placeholder="API Key (optional)"
                        className="pixel-input w-full mt-2 text-xs"
                      />
                    </div>
                  </div>
                </PixelFrame>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <PixelButton
                variant="primary"
                size="medium"
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                icon={<PixelIcon name="check" size="small" />}
              >
                {saveStatus === 'saving' ? '⏳ SAVING...' : 
                 saveStatus === 'saved' ? '✅ SAVED!' : '💾 SAVE'}
              </PixelButton>
              <PixelButton
                variant="secondary"
                size="medium"
                onClick={handleReset}
                icon={<PixelIcon name="power" size="small" />}
              >
                🔄 RESET
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
