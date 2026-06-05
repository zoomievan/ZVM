import { getItem, setItem } from '../db';
import { CMSSettings, DEFAULT_CMS } from '../types';

const KEY = 'cms_settings';

export async function getSettings(): Promise<CMSSettings> {
  await new Promise(r => setTimeout(r, 80));
  const stored = getItem<CMSSettings>(KEY);
  return stored ?? DEFAULT_CMS;
}

export async function updateSettings(settings: CMSSettings): Promise<CMSSettings> {
  await new Promise(r => setTimeout(r, 120));
  setItem(KEY, settings);
  return settings;
}
