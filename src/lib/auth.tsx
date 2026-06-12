import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getUserByEmail, createUser, updateUser as updateUserRepo } from './repositories/userRepository';
import { User } from './types';

type SignupData = Omit<User, 'id' | 'createdAt' | 'passwordHash' | 'passwordSalt' | 'role'> & {
  password: string;
};

interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  logout: () => void;
}

const AuthCtx = createContext<AuthContext | null>(null);

const SESSION_KEY = 'zoomievan_session';

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}

function randomSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

async function hashDemoPassword(password: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${password}`);
  return bytesToHex(await crypto.subtle.digest('SHA-256', data));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = sessionStorage.getItem(SESSION_KEY);
    if (id) {
      import('./repositories/userRepository').then(({ getUserById }) =>
        getUserById(id).then(u => { setUser(u); setLoading(false); })
      );
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const found = await getUserByEmail(email);
    if (!found) return { success: false, error: 'Invalid email or password.' };
    const passwordHash = await hashDemoPassword(password, found.passwordSalt);
    if (found.passwordHash !== passwordHash) return { success: false, error: 'Invalid email or password.' };
    sessionStorage.setItem(SESSION_KEY, found.id);
    setUser(found);
    return { success: true };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    const existing = await getUserByEmail(data.email);
    if (existing) return { success: false, error: 'An account with this email already exists.' };
    const passwordSalt = randomSalt();
    const passwordHash = await hashDemoPassword(data.password, passwordSalt);
    const { password, ...profile } = data;
    void password;
    const created = await createUser({
      ...profile,
      passwordHash,
      passwordSalt,
      role: 'customer',
    });
    sessionStorage.setItem(SESSION_KEY, created.id);
    setUser(created);

    if (data.dog.name) {
      import('./repositories/vaccineRepository').then(({ addVaccine }) => {
        addVaccine({
          dogName: data.dog.name,
          ownerName: data.name,
          vaccineType: 'Rabies + DHPP',
        });
      });
    }

    return { success: true };
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) throw new Error('Not logged in');
    const updated = await updateUserRepo(user.id, updates);
    setUser(updated);
  }, [user]);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, login, signup, updateUser, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
