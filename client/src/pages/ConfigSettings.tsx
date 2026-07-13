import React, { useState } from 'react';
import { useLocation } from 'wouter';
import PixelButton from '@/components/PixelButton';
import PixelFrame from '@/components/PixelFrame';
import PixelIcon from '@/components/PixelIcon';

interface ConfigSection {
  id: string;
  name: string;
  icon: string;
  fields: ConfigField[];
}

interface ConfigField {
  id: string;
  name: string;
  type: 'text' | 'password' | 'textarea' | 'select';
  value: string;
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  description?: string;
}

/**
 * ConfigSettings Page - Advanced Configuration
 * 
 * Manages all API keys, Firebase, Supabase, and service configurations.
 * Secure configuration management for external services.
 * 
 * Design: Professional settings interface with pixel art styling
 */
export default function ConfigSettings() {
  const [, setLocation] = useLocation();
  const [activeSection, setActiveSection] = useState('apis');
  const [configs, setConfigs] = useState<Record<string, ConfigField[]>>({
    apis: [
      {
        id: 'openai_key',
        name: 'OpenAI API Key',
        type: 'password',
        value: '',
        placeholder: 'sk-...',
        description: 'Your OpenAI API key for GPT models',
      },
      {
        id: 'google_key',
        name: 'Google API Key',
        type: 'password',
        value: '',
        placeholder: 'AIza...',
        description: 'Google Cloud API key',
      },
      {
        id: 'anthropic_key',
        name: 'Anthropic API Key',
        type: 'password',
        value: '',
        placeholder: 'sk-ant-...',
        description: 'Anthropic Claude API key',
      },
    ],
    firebase: [
      {
        id: 'firebase_project_id',
        name: 'Project ID',
        type: 'text',
        value: '',
        placeholder: 'your-project-id',
      },
      {
        id: 'firebase_api_key',
        name: 'API Key',
        type: 'password',
        value: '',
        placeholder: 'AIza...',
      },
      {
        id: 'firebase_auth_domain',
        name: 'Auth Domain',
        type: 'text',
        value: '',
        placeholder: 'your-project.firebaseapp.com',
      },
      {
        id: 'firebase_database_url',
        name: 'Database URL',
        type: 'text',
        value: '',
        placeholder: 'https://your-project.firebaseio.com',
      },
    ],
    supabase: [
      {
        id: 'supabase_url',
        name: 'Project URL',
        type: 'text',
        value: '',
        placeholder: 'https://your-project.supabase.co',
      },
      {
        id: 'supabase_key',
        name: 'Anon Public Key',
        type: 'password',
        value: '',
        placeholder: 'eyJhbGc...',
      },
      {
        id: 'supabase_service_key',
        name: 'Service Role Key',
        type: 'password',
        value: '',
        placeholder: 'eyJhbGc...',
      },
    ],
    voice: [
      {
        id: 'tts_provider',
        name: 'TTS Provider',
        type: 'select',
        value: 'google',
        options: [
          { label: 'Google Cloud TTS', value: 'google' },
          { label: 'Azure Speech Services', value: 'azure' },
          { label: 'AWS Polly', value: 'aws' },
          { label: 'ElevenLabs', value: 'elevenlabs' },
        ],
      },
      {
        id: 'tts_key',
        name: 'TTS API Key',
        type: 'password',
        value: '',
        placeholder: 'Your TTS provider API key',
      },
      {
        id: 'stt_provider',
        name: 'STT Provider',
        type: 'select',
        value: 'google',
        options: [
          { label: 'Google Cloud STT', value: 'google' },
          { label: 'Azure Speech Services', value: 'azure' },
          { label: 'AWS Transcribe', value: 'aws' },
          { label: 'AssemblyAI', value: 'assemblyai' },
        ],
      },
      {
        id: 'stt_key',
        name: 'STT API Key',
        type: 'password',
        value: '',
        placeholder: 'Your STT provider API key',
      },
    ],
    storage: [
      {
        id: 'aws_access_key',
        name: 'AWS Access Key ID',
        type: 'password',
        value: '',
        placeholder: 'AKIA...',
      },
      {
        id: 'aws_secret_key',
        name: 'AWS Secret Access Key',
        type: 'password',
        value: '',
        placeholder: '...',
      },
      {
        id: 'aws_region',
        name: 'AWS Region',
        type: 'text',
        value: '',
        placeholder: 'us-east-1',
      },
      {
        id: 'aws_bucket',
        name: 'S3 Bucket Name',
        type: 'text',
        value: '',
        placeholder: 'my-bucket',
      },
    ],
  });

  const sections: ConfigSection[] = [
    {
      id: 'apis',
      name: 'API KEYS',
      icon: '🔑',
      fields: configs.apis || [],
    },
    {
      id: 'firebase',
      name: 'FIREBASE',
      icon: '🔥',
      fields: configs.firebase || [],
    },
    {
      id: 'supabase',
      name: 'SUPABASE',
      icon: '🟢',
      fields: configs.supabase || [],
    },
    {
      id: 'voice',
      name: 'VOICE',
      icon: '🎤',
      fields: configs.voice || [],
    },
    {
      id: 'storage',
      name: 'STORAGE',
      icon: '💾',
      fields: configs.storage || [],
    },
  ];

  const currentSection = sections.find((s) => s.id === activeSection);

  const handleConfigChange = (fieldId: string, value: string) => {
    setConfigs((prev) => ({
      ...prev,
      [activeSection]: prev[activeSection].map((field) =>
        field.id === fieldId ? { ...field, value } : field
      ),
    }));
  };

  const handleSave = () => {
    console.log('Saving configs:', configs);
    // TODO: Save to backend
  };

  const handleTest = (fieldId: string) => {
    console.log(`Testing config: ${fieldId}`);
    // TODO: Test connection
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="bg-secondary border-b-4 border-primary px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold text-primary uppercase tracking-widest">
            CONFIG
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
      <div className="flex-1 px-4 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar - Section Navigation */}
          <div className="md:col-span-1 space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  w-full text-left p-3 border-2 transition-all
                  ${
                    activeSection === section.id
                      ? 'border-primary bg-primary/10'
                      : 'border-primary/30 hover:border-primary'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{section.icon}</span>
                  <span className="text-xs font-bold uppercase">
                    {section.name}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Main Content - Configuration Fields */}
          <div className="md:col-span-3">
            {currentSection && (
              <PixelFrame title={currentSection.name} variant="default" className="space-y-6">
                <div className="space-y-4">
                  {currentSection.fields.map((field) => (
                    <div key={field.id} className="space-y-2 p-3 bg-secondary border border-primary/30">
                      <label className="text-xs font-bold uppercase text-foreground">
                        {field.name}
                        {field.required && <span className="text-red-500"> *</span>}
                      </label>

                      {field.description && (
                        <p className="text-xs text-muted-foreground">
                          {field.description}
                        </p>
                      )}

                      {field.type === 'select' ? (
                        <select
                          value={field.value}
                          onChange={(e) =>
                            handleConfigChange(field.id, e.target.value)
                          }
                          className="pixel-input w-full text-xs"
                        >
                          <option value="">Select...</option>
                          {field.options?.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          value={field.value}
                          onChange={(e) =>
                            handleConfigChange(field.id, e.target.value)
                          }
                          placeholder={field.placeholder}
                          className="pixel-input w-full h-24 text-xs font-mono"
                        />
                      ) : (
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) =>
                            handleConfigChange(field.id, e.target.value)
                          }
                          placeholder={field.placeholder}
                          className="pixel-input w-full text-xs"
                        />
                      )}

                      {field.type === 'password' && field.value && (
                        <button
                          onClick={() => handleTest(field.id)}
                          className="pixel-btn tiny text-xs"
                        >
                          TEST CONNECTION
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t-2 border-primary">
                  <PixelButton
                    variant="primary"
                    size="medium"
                    onClick={handleSave}
                    icon={<PixelIcon name="check" size="small" />}
                  >
                    SAVE ALL
                  </PixelButton>
                  <PixelButton
                    variant="secondary"
                    size="medium"
                    onClick={() => setLocation('/settings')}
                    icon={<PixelIcon name="close" size="small" />}
                  >
                    CANCEL
                  </PixelButton>
                </div>
              </PixelFrame>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
