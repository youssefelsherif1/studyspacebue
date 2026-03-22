import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'receptionist';
  points: number;
  status: 'active' | 'pending';
  university?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password?: string) => { success: boolean, message?: string };
  signup: (name: string, email: string, role: string, university?: string) => void;
  logout: () => void;
  updatePoints: (newPoints: number) => void;
  approveUser: (email: string) => void;
  deleteUser: (email: string) => void;
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

  // Helper to persist points changes for ANY user (even seeds)
  const getPersistedPoints = (email: string): number | null => {
    const history = localStorage.getItem('studyspace_points_history');
    if (!history) return null;
    const data = JSON.parse(history);
    return data[email.toLowerCase()] ?? null;
  };

  const setPersistedPoints = (email: string, points: number) => {
    const history = localStorage.getItem('studyspace_points_history') || '{}';
    const data = JSON.parse(history);
    data[email.toLowerCase()] = points;
    localStorage.setItem('studyspace_points_history', JSON.stringify(data));
  };

  // Also check for dynamically signed-up users stored in localStorage
  const getSignedUpUsers = (): AuthUser[] => {
    const stored = localStorage.getItem('studyspace_registered_users');
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('studyspace_user', JSON.stringify(user));
      // Always keep the points history in sync
      setPersistedPoints(user.email, user.points);
    } else {
      localStorage.removeItem('studyspace_user');
    }
  }, [user]);

  const login = (email: string, password?: string): { success: boolean; message?: string } => {
    // 1. Check for SPECIAL ADMIN CREDENTIALS
    if (email === 'youssefelsherif1234' && password === 'ftxz49') {
      const adminUser: AuthUser = { id: 'admin-1', name: 'Admin', email: 'youssefelsherif1234', role: 'admin', points: 0, status: 'active' };
      setUser(adminUser);
      return { success: true };
    }

    // 2. Otherwise, reject any 'admin' role login attempted through common route
    if (email === 'dave@admin.test' || email === 'youssefelsherif1234') {
       if (password !== 'ftxz49') return { success: false, message: 'Invalid admin credentials.' };
    }

    const knownUsers: AuthUser[] = [
      { id: 'u1', name: 'Sarah Johnson', email: 'alice@student.test', role: 'student', points: 245, status: 'active', university: 'State University' },
      { id: 'u2', name: 'Bob Jones', email: 'bob@student.test', role: 'student', points: 20, status: 'active', university: 'Tech Institute' },
      { id: 'u3', name: 'Dr. Carol', email: 'carol@instructor.test', role: 'instructor', points: 500, status: 'active' },
      { id: 'u5', name: 'Recp Eve', email: 'eve@reception.test', role: 'receptionist', points: 0, status: 'active' },
    ];

    const allUsers = [...knownUsers, ...getSignedUpUsers()];
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (found) {
      if (found.role === 'admin') return { success: false, message: 'Admins must use the secure admin portal.' };
      
      if (found.role === 'receptionist' && found.status === 'pending') {
        return { success: false, message: 'Your account is pending admin approval.' };
      }

      // 1. Check if we have a MORE RECENT points value saved from a previous session
      const savedPoints = getPersistedPoints(found.email);
      if (savedPoints !== null) {
        found.points = savedPoints;
      }

      // 2. First-time login bonus (200 pts) - EXCLUDE RECEPTIONISTS
      if (found.role !== 'receptionist' && !localStorage.getItem(`studyspace_bonus_${found.email}`)) {
        found.points += 200;
        localStorage.setItem(`studyspace_bonus_${found.email}`, 'true');
        setBonusAwarded(true);
        localStorage.setItem('studyspace_bonus_awarded', 'true');
        setPersistedPoints(found.email, found.points);
      } else {
        setBonusAwarded(false);
        localStorage.setItem('studyspace_bonus_awarded', 'false');
      }

      setUser({ ...found }); // Create fresh object to trigger state change
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email address.' };
    }
  };

  const signup = (name: string, email: string, role: string, university?: string) => {
    const newUser: AuthUser = {
      id: String(Date.now()),
      name,
      email,
      role: role as AuthUser['role'],
      points: role === 'receptionist' ? 0 : 200, // No bonus for receptionists
      status: role === 'receptionist' ? 'pending' : 'active',
      university,
    };
    // Persist this user so they can sign in later
    const existing = getSignedUpUsers();
    existing.push(newUser);
    localStorage.setItem('studyspace_registered_users', JSON.stringify(existing));
    
    // Also track bonus and initial points history
    // Track bonus (only if not receptionist)
    if (role !== 'receptionist') {
      localStorage.setItem(`studyspace_bonus_${email}`, 'true');
      setBonusAwarded(true);
      localStorage.setItem('studyspace_bonus_awarded', 'true');
    } else {
      setBonusAwarded(false);
      localStorage.setItem('studyspace_bonus_awarded', 'false');
    }
    setPersistedPoints(email, newUser.points);
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setBonusAwarded(false);
    localStorage.removeItem('studyspace_bonus_awarded');
  };

  const approveUser = (email: string) => {
    const users = getSignedUpUsers();
    const updated = users.map(u => u.email.toLowerCase() === email.toLowerCase() ? { ...u, status: 'active' as const } : u);
    localStorage.setItem('studyspace_registered_users', JSON.stringify(updated));
  };

  const deleteUser = (email: string) => {
    const users = getSignedUpUsers();
    const filtered = users.filter(u => u.email.toLowerCase() !== email.toLowerCase());
    localStorage.setItem('studyspace_registered_users', JSON.stringify(filtered));
  };

  const updatePoints = (newPoints: number) => {
    if (user) {
      setUser({ ...user, points: newPoints });
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updatePoints, approveUser, deleteUser, bonusAwarded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
