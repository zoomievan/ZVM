import { getItem, setItem, generateId } from '../db';
import { VaccineRecord } from '../types';
import { api, convex } from '../convexClient';

const KEY = 'vaccine_queue';

const DEFAULT_VACCINES: VaccineRecord[] = [
  { id: generateId(), dogName: 'Max', ownerName: 'Sarah C.', vaccineType: 'Rabies + DHPP', submittedAt: new Date(Date.now() - 7200000).toISOString(), status: 'pending' },
  { id: generateId(), dogName: 'Bella', ownerName: 'James O.', vaccineType: 'Rabies', submittedAt: new Date(Date.now() - 14400000).toISOString(), status: 'pending' },
  { id: generateId(), dogName: 'Luna', ownerName: 'David P.', vaccineType: 'DHPP', submittedAt: new Date(Date.now() - 86400000).toISOString(), status: 'approved' },
];

export async function getAllVaccines(): Promise<VaccineRecord[]> {
  if (convex) return convex.query(api.vaccines.list);
  await new Promise(r => setTimeout(r, 60));
  const stored = getItem<VaccineRecord[]>(KEY);
  if (!stored || stored.length === 0) {
    setItem(KEY, DEFAULT_VACCINES);
    return DEFAULT_VACCINES;
  }
  return stored;
}

export async function addVaccine(record: Omit<VaccineRecord, 'id' | 'submittedAt' | 'status'>): Promise<VaccineRecord> {
  if (convex) return convex.mutation(api.vaccines.add, { record });
  await new Promise(r => setTimeout(r, 80));
  const records = await getAllVaccines();
  const newRecord: VaccineRecord = {
    ...record,
    id: generateId(),
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };
  records.push(newRecord);
  setItem(KEY, records);
  return newRecord;
}

export async function approveVaccine(id: string): Promise<VaccineRecord> {
  if (convex) return convex.mutation(api.vaccines.approve, { id: id as any });
  await new Promise(r => setTimeout(r, 100));
  const records = await getAllVaccines();
  const idx = records.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Record not found');
  records[idx].status = 'approved';
  setItem(KEY, records);
  return records[idx];
}

export async function rejectVaccine(id: string): Promise<VaccineRecord> {
  if (convex) return convex.mutation(api.vaccines.reject, { id: id as any });
  await new Promise(r => setTimeout(r, 100));
  const records = await getAllVaccines();
  const idx = records.findIndex(r => r.id === id);
  if (idx === -1) throw new Error('Record not found');
  records[idx].status = 'rejected';
  setItem(KEY, records);
  return records[idx];
}

export async function deleteVaccine(id: string): Promise<void> {
  if (convex) {
    await convex.mutation(api.vaccines.remove, { id: id as any });
    return;
  }
  await new Promise(r => setTimeout(r, 50));
  const records = await getAllVaccines();
  setItem(KEY, records.filter(r => r.id !== id));
}
