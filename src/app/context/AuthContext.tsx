import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '../data/mock-data';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'receptionist';
  points: number;
  status: 'active' | 'pending' | 'email_verification_sent';
  university?: string;
  password?: string; // For demo purposes only - in production, never store passwords!
  emailVerified?: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  bookings: Booking[];
  login: (email: string, password?: string) => { success: boolean, message?: string };
  signup: (name: string, email: string, role: string, password: string, university?: string) => { success: boolean, message?: string };
  logout: () => void;
  updatePoints: (newPoints: number) => void;
  addBooking: (booking: Omit<Booking, 'id'>) => void;
  approveUser: (email: string) => void;
  deleteUser: (email: string) => void;
  createReceptionist: (name: string, email: string) => void;
  bonusAwarded: boolean;
  sendEmailVerification: (email: string) => { success: boolean, message?: string };
  verifyEmail: (email: string, code: string) => { success: boolean, message?: string };
  resetPassword: (email: string) => { success: boolean, message?: string };
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('studyspace_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('studyspace_dynamic_bookings');
    return saved ? JSON.parse(saved) : [];
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

  // Email verification helpers
  const generateVerificationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const storeVerificationCode = (email: string, code: string): void => {
    const verifications = JSON.parse(localStorage.getItem('studyspace_email_verifications') || '{}');
    verifications[email.toLowerCase()] = {
      code,
      timestamp: Date.now(),
      attempts: 0
    };
    localStorage.setItem('studyspace_email_verifications', JSON.stringify(verifications));
  };

  const getVerificationCode = (email: string): { code: string; timestamp: number; attempts: number } | null => {
    const verifications = JSON.parse(localStorage.getItem('studyspace_email_verifications') || '{}');
    return verifications[email.toLowerCase()] || null;
  };

  const clearVerificationCode = (email: string): void => {
    const verifications = JSON.parse(localStorage.getItem('studyspace_email_verifications') || '{}');
    delete verifications[email.toLowerCase()];
    localStorage.setItem('studyspace_email_verifications', JSON.stringify(verifications));
  };

  // Password validation
  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 6) {
      return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    if (!/[A-Za-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  // Email validation
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Also check for dynamically signed-up users stored in localStorage
  const getSignedUpUsers = (): AuthUser[] => {
    const stored = localStorage.getItem('studyspace_registered_users');
    return stored ? JSON.parse(stored) : [];
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem('studyspace_user', JSON.stringify(user));
      setPersistedPoints(user.email, user.points);
    } else {
      localStorage.removeItem('studyspace_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('studyspace_dynamic_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const login = (email: string, password?: string): { success: boolean; message?: string } => {
    // Validate email format
    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    // 1. Check for SPECIAL ADMIN CREDENTIALS
    if (email === 'youssefelsherif1234' && password === 'ftxz49') {
      const adminUser: AuthUser = { id: 'admin-1', name: 'Admin', email: 'youssefelsherif1234', role: 'admin', points: 0, status: 'active', emailVerified: true };
      setUser(adminUser);
      return { success: true };
    }

    // 2. Otherwise, reject any 'admin' role login attempted through common route
    if (email === 'dave@admin.test' || email === 'youssefelsherif1234') {
       if (password !== 'ftxz49') return { success: false, message: 'Invalid admin credentials.' };
    }

    const knownUsers: AuthUser[] = [
      { id: 'u2', name: 'Bob Jones', email: 'bob@student.test', role: 'student', points: 20, status: 'active', university: 'Tech Institute', password: 'password123', emailVerified: true },
      { id: 'u3', name: 'Dr. Carol', email: 'carol@instructor.test', role: 'instructor', points: 500, status: 'active', password: 'teach456', emailVerified: true },
      { id: 'u5', name: 'Recp Eve', email: 'eve@reception.test', role: 'receptionist', points: 0, status: 'active', password: 'recep789', emailVerified: true },
    ];

    const allUsers = [...knownUsers, ...getSignedUpUsers()];
    const found = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (found) {
      if (found.role === 'admin') return { success: false, message: 'Admins must use the secure admin portal.' };
      
      // Check email verification
      if (!found.emailVerified && found.status !== 'active') {
        return { success: false, message: 'Please verify your email before signing in.' };
      }
      
      if (found.role === 'receptionist' && found.status === 'pending') {
        return { success: false, message: 'Your account is pending admin approval.' };
      }

      // For demo users, check password if provided
      if (found.password && password && found.password !== password) {
        return { success: false, message: 'Incorrect password.' };
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

  const signup = (name: string, email: string, role: string, password: string, university?: string): { success: boolean; message?: string } => {
    // Validate inputs
    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, message: passwordValidation.message };
    }

    if (!name.trim()) {
      return { success: false, message: 'Name is required' };
    }

    if (role === 'student' && !university?.trim()) {
      return { success: false, message: 'University is required for students' };
    }

    // Check for existing users
    const knownUsers: AuthUser[] = [
      { id: 'u2', name: 'Bob Jones', email: 'bob@student.test', role: 'student', points: 20, status: 'active', university: 'Tech Institute', password: 'password123', emailVerified: true },
      { id: 'u3', name: 'Dr. Carol', email: 'carol@instructor.test', role: 'instructor', points: 500, status: 'active', password: 'teach456', emailVerified: true },
      { id: 'u5', name: 'Recp Eve', email: 'eve@reception.test', role: 'receptionist', points: 0, status: 'active', password: 'recep789', emailVerified: true },
    ];

    const allUsers = [...knownUsers, ...getSignedUpUsers()];
    const existingUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (existingUser) {
      return { success: false, message: 'An account with this email already exists' };
    }

    const newUser: AuthUser = {
      id: String(Date.now()),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      role: role as AuthUser['role'],
      points: role === 'receptionist' ? 0 : 200, // No bonus for receptionists
      status: role === 'receptionist' ? 'pending' : 'email_verification_sent',
      university: university?.trim(),
      password, // Store password for demo (in production, use hashed passwords)
      emailVerified: false
    };

    // Generate and store verification code
    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);

    // Persist this user so they can sign in later
    const existing = getSignedUpUsers();
    existing.push(newUser);
    localStorage.setItem('studyspace_registered_users', JSON.stringify(existing));
    
    // Also track bonus and initial points history (only if not receptionist)
    if (role !== 'receptionist') {
      localStorage.setItem(`studyspace_bonus_${email}`, 'true');
      setBonusAwarded(true);
      localStorage.setItem('studyspace_bonus_awarded', 'true');
    } else {
      setBonusAwarded(false);
      localStorage.setItem('studyspace_bonus_awarded', 'false');
    }
    setPersistedPoints(email, newUser.points);
    
    // In a real app, send email with verification code
    console.log(`Email verification code for ${email}: ${verificationCode}`);
    
    return { success: true, message: 'Account created! Please check your email for verification code.' };
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
      const updated = { ...user, points: newPoints };
      setUser(updated);
      setPersistedPoints(user.email, newPoints);
    }
  };

  const addBooking = (bookingData: Omit<Booking, 'id'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `b-${Date.now()}`,
    };
    setBookings(prev => [newBooking, ...prev]);
  };

  const sendEmailVerification = (email: string): { success: boolean; message?: string } => {
    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    const verificationCode = generateVerificationCode();
    storeVerificationCode(email, verificationCode);
    
    // In a real app, send email with verification code
    console.log(`Email verification code for ${email}: ${verificationCode}`);
    
    return { success: true, message: 'Verification code sent to your email' };
  };

  const verifyEmail = (email: string, code: string): { success: boolean; message?: string } => {
    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    const verificationData = getVerificationCode(email);
    if (!verificationData) {
      return { success: false, message: 'No verification code found. Please request a new one.' };
    }

    // Check if code expired (15 minutes)
    if (Date.now() - verificationData.timestamp > 15 * 60 * 1000) {
      clearVerificationCode(email);
      return { success: false, message: 'Verification code expired. Please request a new one.' };
    }

    // Check attempts (max 3)
    if (verificationData.attempts >= 3) {
      clearVerificationCode(email);
      return { success: false, message: 'Too many failed attempts. Please request a new verification code.' };
    }

    if (verificationData.code !== code) {
      // Increment attempts
      const verifications = JSON.parse(localStorage.getItem('studyspace_email_verifications') || '{}');
      verifications[email.toLowerCase()].attempts = verificationData.attempts + 1;
      localStorage.setItem('studyspace_email_verifications', JSON.stringify(verifications));
      
      return { success: false, message: `Invalid code. ${3 - (verificationData.attempts + 1)} attempts remaining.` };
    }

    // Update user status to active
    const users = getSignedUpUsers();
    const updatedUsers = users.map(u => {
      if (u.email.toLowerCase() === email.toLowerCase()) {
        return { ...u, status: 'active' as const, emailVerified: true };
      }
      return u;
    });
    localStorage.setItem('studyspace_registered_users', JSON.stringify(updatedUsers));
    
    clearVerificationCode(email);
    return { success: true, message: 'Email verified successfully! You can now sign in.' };
  };

  const resetPassword = (email: string): { success: boolean; message?: string } => {
    if (!validateEmail(email)) {
      return { success: false, message: 'Invalid email format' };
    }

    const users = getSignedUpUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      return { success: false, message: 'No account found with this email' };
    }

    // Generate reset code
    const resetCode = generateVerificationCode();
    storeVerificationCode(email, resetCode);
    
    // In a real app, send email with reset code
    console.log(`Password reset code for ${email}: ${resetCode}`);
    
    return { success: true, message: 'Password reset code sent to your email' };
  };

  const createReceptionist = (name: string, email: string) => {
    const newUser: AuthUser = {
      id: `recp-${Date.now()}`,
      name,
      email,
      role: 'receptionist',
      points: 0,
      status: 'active',
      emailVerified: true
    };
    const existing = getSignedUpUsers();
    existing.push(newUser);
    localStorage.setItem('studyspace_registered_users', JSON.stringify(existing));
    setPersistedPoints(email, 0);
  };

  return (
    <AuthContext.Provider value={{ 
      user, bookings, login, signup, logout, updatePoints, 
      addBooking, approveUser, deleteUser, createReceptionist, bonusAwarded,
      sendEmailVerification, verifyEmail, resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
