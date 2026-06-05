import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { getSettings, updateSettings } from '../../lib/repositories/cmsRepository';
import { CMSSettings } from '../../lib/types';

export default function AdminCMSPanel() {
  const [settings, setSettings] = useState<CMSSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setError('');
    try {
      await updateSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!settings) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => <div key={i} className="h-12 skeleton-shimmer rounded-xl" />)}
      </div>
    );
  }

  const fields: Array<{ key: keyof CMSSettings; label: string; type: 'text' | 'number' | 'textarea'; placeholder?: string }> = [
    { key: 'heroTagline', label: 'Hero Tagline', type: 'text', placeholder: 'A Professional Dog Gym That Comes to You' },
    { key: 'baseSessionRate', label: 'Base Session Rate ($)', type: 'number' },
    { key: 'weeklyPackRate', label: 'Weekly Pack Rate ($/session)', type: 'number' },
    { key: 'eightPackRate', label: '8-Pack Rate ($/session)', type: 'number' },
    { key: 'emergencyBannerText', label: 'Emergency Banner Text', type: 'text', placeholder: 'Weather delays in your area...' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-white">Content Management</h2>
        <p className="text-dark-300 text-sm mt-1">Edit live site content. Changes are saved locally and reflected immediately.</p>
      </div>

      {settings.emergencyBannerActive && settings.emergencyBannerText && (
        <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-sm text-amber-300">Emergency banner is active: "{settings.emergencyBannerText}"</span>
        </div>
      )}

      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.key} className="space-y-1.5">
            <label className="text-xs text-dark-400 uppercase tracking-wider">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={String(settings[field.key] ?? '')}
                onChange={e => setSettings({ ...settings, [field.key]: e.target.value })}
                className="w-full h-20 bg-dark-700 border border-dark-500 rounded-lg px-3 py-2 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50 resize-none"
              />
            ) : (
              <input
                type={field.type}
                value={String(settings[field.key] ?? '')}
                onChange={e => {
                  const val = field.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value;
                  setSettings({ ...settings, [field.key]: val });
                }}
                placeholder={field.placeholder}
                className="w-full h-10 bg-dark-700 border border-dark-500 rounded-lg px-3 text-sm text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 rounded-xl hover:from-brand-500 hover:to-brand-400 transition-all shadow-lg shadow-brand-500/25 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </motion.button>
        {saved && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 text-sm text-green-400"
          >
            <CheckCircle2 className="w-4 h-4" /> Saved
          </motion.span>
        )}
        {error && <span className="text-sm text-red-400">{error}</span>}
      </div>

      <div className="flex items-center gap-3 p-3 bg-dark-700/50 rounded-xl border border-dark-600">
        <input
          type="checkbox"
          id="emergencyToggle"
          checked={settings.emergencyBannerActive}
          onChange={e => setSettings({ ...settings, emergencyBannerActive: e.target.checked })}
          className="rounded border-dark-500 bg-dark-700 text-brand-500 focus:ring-brand-500"
        />
        <label htmlFor="emergencyToggle" className="text-sm text-dark-200">Enable emergency banner</label>
      </div>
    </div>
  );
}
