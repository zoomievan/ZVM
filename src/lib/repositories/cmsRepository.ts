import { getItem, setItem } from '../db';
import { CMSSettings, DEFAULT_CMS } from '../types';
import { api, convex } from '../convexClient';

const KEY = 'cms_settings';

export async function getSettings(): Promise<CMSSettings> {
  if (convex) return convex.query(api.cms.get);
  await new Promise(r => setTimeout(r, 80));
  const stored = getItem<CMSSettings>(KEY);
  return stored ?? DEFAULT_CMS;
}

export async function updateSettings(settings: CMSSettings): Promise<CMSSettings> {
  if (convex) return convex.mutation(api.cms.update, { settings });
  await new Promise(r => setTimeout(r, 120));
  setItem(KEY, settings);
  return settings;
}
