import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { getUserByEmail, createUser } from './repositories/userRepository';
import { User } from './types';

interface AuthContext {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: Omit<User, 'id' | 'createdAt'>) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthCtx = createContext<AuthContext | null>(null);

const SESSION_KEY = 'zoomievan_session';

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
    if (!found) return { success: false, error: 'No account found with this email.' };
    if (found.password !== password) return { success: false, error: 'Incorrect password.' };
    sessionStorage.setItem(SESSION_KEY, found.id);
    setUser(found);
    return { success: true };
  }, []);

  const signup = useCallback(async (data: Omit<User, 'id' | 'createdAt'>) => {
    const existing = await getUserByEmail(data.email);
    if (existing) return { success: false, error: 'An account with this email already exists.' };
    const created = await createUser(data);
    sessionStorage.setItem(SESSION_KEY, created.id);
    setUser(created);

    import('./repositories/vaccineRepository').then(({ addVaccine }) => {
      addVaccine({
        dogName: data.dog.name,
        ownerName: data.name,
        vaccineType: 'Rabies + DHPP',
      });
    });

    return { success: true };
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
