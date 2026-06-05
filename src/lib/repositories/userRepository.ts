import { getItem, setItem, generateId } from '../db';
import { User } from '../types';

const KEY = 'users';

export async function getAllUsers(): Promise<User[]> {
  await new Promise(r => setTimeout(r, 50));
  return getItem<User[]>(KEY) ?? [];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find(u => u.id === id) ?? null;
}

export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<User> {
  await new Promise(r => setTimeout(r, 100));
  const users = await getAllUsers();
  const newUser: User = {
    ...user,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  setItem(KEY, users);
  return newUser;
}

export async function updateUser(id: string, updates: Partial<User>): Promise<User> {
  const users = await getAllUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) throw new Error('User not found');
  users[idx] = { ...users[idx], ...updates };
  setItem(KEY, users);
  return users[idx];
}
