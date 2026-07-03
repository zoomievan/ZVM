import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { useClerk, useUser as useClerkUser } from '@clerk/react';
import {
  getUserByAuthProviderUserId,
  getUserByEmail,
  createUser,
  updateUser as updateUserRepo,
} from './repositories/userRepository';
import { User, UserAddress, UserDog, UserVaccines } from './types';

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
const hasClerkConfig = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

const emptyAddress: UserAddress = { line1: '', city: '', province: '', postalCode: '' };
const emptyDog: UserDog = { name: '', breed: '', weight: 0, age: 0, energyLevel: '', reactivityNotes: '' };
const emptyVaccines: UserVaccines = { rabiesFileName: '', dhppFileName: '', vetName: '', vetPhone: '' };

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

function DemoAuthProvider({ children }: { children: ReactNode }) {
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

function ClerkBackedAuthProvider({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useClerkUser();
  const { signOut } = useClerk();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function syncUser() {
      if (!isLoaded) return;

      if (!isSignedIn || !clerkUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const email = clerkUser.primaryEmailAddress?.emailAddress ?? '';
      const name = clerkUser.fullName || clerkUser.firstName || email.split('@')[0] || 'ZoomieVan customer';

      let appUser = await getUserByAuthProviderUserId(clerkUser.id);

      if (!appUser && email) {
        appUser = await getUserByEmail(email);
        if (appUser && !appUser.authProviderUserId) {
          appUser = await updateUserRepo(appUser.id, { authProviderUserId: clerkUser.id });
        }
      }

      if (!appUser) {
        appUser = await createUser({
          authProviderUserId: clerkUser.id,
          email,
          passwordHash: 'clerk-managed',
          passwordSalt: 'clerk-managed',
          role: 'customer',
          name,
          phone: clerkUser.primaryPhoneNumber?.phoneNumber ?? '',
          address: emptyAddress,
          dog: emptyDog,
          vaccines: emptyVaccines,
          legalAccepted: false,
          legalAcceptedAt: null,
        });
      }

      if (!cancelled) {
        setUser(appUser);
        setLoading(false);
      }
    }

    syncUser().catch(() => {
      if (!cancelled) {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [clerkUser, isLoaded, isSignedIn]);

  const login = useCallback(async () => {
    return { success: false, error: 'Use the Clerk sign-in form.' };
  }, []);

  const signup = useCallback(async () => {
    return { success: false, error: 'Use the Clerk sign-up form.' };
  }, []);

  const updateUser = useCallback(async (updates: Partial<User>) => {
    if (!user) throw new Error('Not logged in');
    const updated = await updateUserRepo(user.id, updates);
    setUser(updated);
  }, [user]);

  const logout = useCallback(() => {
    setUser(null);
    void signOut({ redirectUrl: '/' });
  }, [signOut]);

  return (
    <AuthCtx.Provider value={{ user, loading, login, signup, updateUser, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  return hasClerkConfig ? (
    <ClerkBackedAuthProvider>{children}</ClerkBackedAuthProvider>
  ) : (
    <DemoAuthProvider>{children}</DemoAuthProvider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
