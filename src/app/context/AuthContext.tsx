import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'receptionist';
  points: number;
  university?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string) => boolean;
  signup: (name: string, email: string, role: string, university?: string) => void;
  logout: () => void;
  updatePoints: (newPoints: number) => void;
  bonusAwarded: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('studyspace_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [bonusAwarded, setBonusAwarded] = useState(() => {
    return localStorage.getItem('studyspace_bonus_awarded') === 'true';
  });

  // Also check for dynamically signed-up users stored in localStorage
  const getSignedUpUsers = (): AuthUser[] => {
    const stored = localStorage.getItem('studyspace_registered_users');
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('studyspace_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('studyspace_user');
    }
  }, [user]);

  const login = (email: string): boolean => {
    // Simulated login — match against known seed accounts + dynamically registered users
    const knownUsers: AuthUser[] = [
      { id: '1', name: 'Alice Smith', email: 'alice@student.test', role: 'student', points: 150, university: 'State University' },
      { id: '2', name: 'Bob Jones', email: 'bob@student.test', role: 'student', points: 20, university: 'Tech Institute' },
      { id: '3', name: 'Dr. Carol', email: 'carol@instructor.test', role: 'instructor', points: 500 },
      { id: '4', name: 'Admin Dave', email: 'dave@admin.test', role: 'admin', points: 0 },
      { id: '5', name: 'Recp Eve', email: 'eve@reception.test', role: 'receptionist', points: 0 },
    ];

    const allUsers = [...knownUsers, ...getSignedUpUsers()];
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      // First-time bonus
      if (!localStorage.getItem(`studyspace_bonus_${found.email}`)) {
        found.points += 200;
        localStorage.setItem(`studyspace_bonus_${found.email}`, 'true');
        setBonusAwarded(true);
        localStorage.setItem('studyspace_bonus_awarded', 'true');
      } else {
        setBonusAwarded(false);
        localStorage.setItem('studyspace_bonus_awarded', 'false');
      }
      setUser(found);
      return true;
    } else {
      return false;
    }
  };

  const signup = (name: string, email: string, role: string, university?: string) => {
    const newUser: AuthUser = {
      id: String(Date.now()),
      name,
      email,
      role: role as AuthUser['role'],
      points: 200, // Welcome bonus
      university,
    };
    // Persist this user so they can sign in later
    const existing = getSignedUpUsers();
    existing.push(newUser);
    localStorage.setItem('studyspace_registered_users', JSON.stringify(existing));
    localStorage.setItem(`studyspace_bonus_${email}`, 'true');
    setBonusAwarded(true);
    localStorage.setItem('studyspace_bonus_awarded', 'true');
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setBonusAwarded(false);
    localStorage.removeItem('studyspace_bonus_awarded');
  };

  const updatePoints = (newPoints: number) => {
    if (user) {
      setUser({ ...user, points: newPoints });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePoints, bonusAwarded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
