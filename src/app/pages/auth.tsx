import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { BookOpen, User, GraduationCap, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, signup, user } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'student' | 'instructor'>('student');
  const [signInEmail, setSignInEmail] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpUniversity, setSignUpUniversity] = useState('');
  const [showBonus, setShowBonus] = useState(false);
  const [activeTab, setActiveTab] = useState('signin');
  const [signupPrompt, setSignupPrompt] = useState('');

  // Redirection is now handled by useEffect to avoid "white page" flashes
  useEffect(() => {
    if (user && !showBonus) {
      const dashboardUrl = user.role === 'student' ? '/student' : user.role === 'instructor' ? '/instructor' : user.role === 'admin' ? '/admin' : '/receptionist';
      navigate(dashboardUrl);
    }
  }, [user, showBonus, navigate]);

  if (user && showBonus) {
    const dashboardUrl = user.role === 'student' ? '/student' : user.role === 'instructor' ? '/instructor' : user.role === 'admin' ? '/admin' : '/receptionist';
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-white to-[#e0e7ff] dark:from-[#111827] dark:via-[#1f2937] dark:to-[#1e1b4b] flex items-center justify-center p-6">
        <Card className="max-w-md w-full border-none shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-br from-[#10b981] to-[#059669] p-8 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome, {user.name}!</h2>
            <p className="text-white/90 text-lg">🎉 200 points have been added as a sign-up bonus!</p>
          </div>
          <CardContent className="p-8 space-y-4 bg-white dark:bg-[#1f2937]">
            <div className="flex justify-between py-3 border-b border-[#e5e7eb] dark:border-[#374151]">
              <span className="text-[#6b7280]">Your Points</span>
              <span className="font-bold text-[#4f46e5] text-xl">{user.points} pts</span>
            </div>
            <div className="flex justify-between py-3 border-b border-[#e5e7eb] dark:border-[#374151]">
              <span className="text-[#6b7280]">Role</span>
              <span className="font-bold text-[#1a1a2e] dark:text-white capitalize">{user.role}</span>
            </div>
            <Button 
              className="w-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90"
              onClick={() => navigate(dashboardUrl)}
            >
              Go to Dashboard →
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const password = (e.target as any).elements['signin-password']?.value;
    const result = login(signInEmail, password);
    
    if (result.success) {
      setSignupPrompt('');
      const wasBonus = localStorage.getItem('studyspace_bonus_awarded') === 'true';
      if (wasBonus) {
        setShowBonus(true);
      }
    } else {
      // Account not found or pending
      if (result.message && result.message.includes('pending')) {
        setSignupPrompt(result.message);
      } else {
        setSignUpEmail(signInEmail); // Pre-fill their email
        setSignupPrompt(result.message || 'Account not found! Please create your account first.');
        setActiveTab('signup');
      }
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    signup(signUpName, signUpEmail, selectedRole, selectedRole === 'student' ? signUpUniversity : undefined);
    setSignupPrompt('');
    setShowBonus(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-white to-[#e0e7ff] dark:from-[#111827] dark:via-[#1f2937] dark:to-[#1e1b4b] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-xl flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-[#1a1a2e] dark:text-white">Welcome to StudySpace</h1>
          <p className="text-[#6b7280] dark:text-[#9ca3af] mt-2">Sign in to manage your study sessions</p>
        </div>

        {/* Auth Card */}
        <Card className="border-[#e5e7eb] dark:border-[#374151] shadow-xl dark:bg-[#1f2937]">
          <CardHeader>
            <Tabs value={activeTab} onValueChange={(val) => { setActiveTab(val); setSignupPrompt(''); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              {/* Sign In Tab */}
              <TabsContent value="signin">
                <CardTitle className="text-2xl mb-2 dark:text-white">Sign In</CardTitle>
                <CardDescription>Enter your email to access your account</CardDescription>
                <form onSubmit={handleSignIn} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className="dark:text-[#d1d5db]">Email</Label>
                    <Input 
                      id="signin-email" 
                      name="signin-email"
                      type="email" 
                      placeholder="e.g. alice@student.test"
                      autoComplete="off"
                      className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                      value={signInEmail}
                      onChange={e => setSignInEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className="dark:text-[#d1d5db]">Password</Label>
                    <Input 
                      id="signin-password" 
                      name="signin-password"
                      type="password" 
                      placeholder="••••••••"
                      autoComplete="current-password"
                      className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90"
                  >
                    Sign In
                  </Button>
                  <div className="text-xs text-[#6b7280] dark:text-[#9ca3af] bg-[#f3f4f6] dark:bg-[#111827] p-3 rounded-lg">
                    <strong>Test accounts:</strong><br />
                    bob@student.test (Student) · carol@instructor.test (Instructor)
                  </div>
                </form>
              </TabsContent>

              {/* Sign Up Tab */}
              <TabsContent value="signup">
                {/* Prompt banner when redirected from failed sign-in */}
                {signupPrompt && (
                  <div className="flex items-center gap-3 p-4 mb-4 bg-[#fef3c7] dark:bg-[#f59e0b]/10 border border-[#f59e0b]/40 rounded-xl animate-pulse">
                    <AlertCircle className="w-5 h-5 text-[#f59e0b] flex-shrink-0" />
                    <p className="text-sm font-medium text-[#92400e] dark:text-[#fbbf24]">{signupPrompt}</p>
                  </div>
                )}

                <CardTitle className="text-2xl mb-2 dark:text-white">Create Account</CardTitle>
                <CardDescription>Choose your role and get started</CardDescription>
                
                {/* Role Selection */}
                <div className="mt-6 space-y-4">
                  <Label className="dark:text-[#d1d5db]">Select Your Role</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('student')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedRole === 'student' 
                          ? 'border-[#4f46e5] bg-[#e0e7ff] dark:bg-[#4f46e5]/20' 
                          : 'border-[#e5e7eb] dark:border-[#374151] hover:border-[#d1d5db]'
                      }`}
                    >
                      <User className={`w-8 h-8 mx-auto mb-2 ${
                        selectedRole === 'student' ? 'text-[#4f46e5]' : 'text-[#6b7280]'
                      }`} />
                      <div className={`font-medium ${
                        selectedRole === 'student' ? 'text-[#4f46e5]' : 'text-[#1a1a2e] dark:text-white'
                      }`}>Student</div>
                      <div className="text-xs text-[#6b7280] mt-1">Book study spaces</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('instructor')}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedRole === 'instructor' 
                          ? 'border-[#8b5cf6] bg-[#f3e8ff] dark:bg-[#8b5cf6]/20' 
                          : 'border-[#e5e7eb] dark:border-[#374151] hover:border-[#d1d5db]'
                      }`}
                    >
                      <GraduationCap className={`w-8 h-8 mx-auto mb-2 ${
                        selectedRole === 'instructor' ? 'text-[#8b5cf6]' : 'text-[#6b7280]'
                      }`} />
                      <div className={`font-medium ${
                        selectedRole === 'instructor' ? 'text-[#8b5cf6]' : 'text-[#1a1a2e] dark:text-white'
                      }`}>Instructor</div>
                      <div className="text-xs text-[#6b7280] mt-1">Fixed schedules</div>
                    </button>
                  </div>
                </div>

                <form onSubmit={handleSignUp} className="mt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name" className="dark:text-[#d1d5db]">Full Name</Label>
                    <Input 
                      id="signup-name" 
                      type="text" 
                      placeholder="John Doe"
                      className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                      value={signUpName}
                      onChange={e => setSignUpName(e.target.value)}
                      required
                    />
                  </div>
                  {selectedRole === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="signup-university" className="dark:text-[#d1d5db]">University</Label>
                      <Input 
                        id="signup-university" 
                        type="text" 
                        placeholder="e.g. State University"
                        className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                        value={signUpUniversity}
                        onChange={e => setSignUpUniversity(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="dark:text-[#d1d5db]">Email</Label>
                    <Input 
                      id="signup-email" 
                      name="signup-email"
                      type="email" 
                      placeholder="you@example.com"
                      className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                      value={signUpEmail}
                      onChange={e => setSignUpEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="dark:text-[#d1d5db]">Password</Label>
                    <Input 
                      id="signup-password" 
                      name="signup-password"
                      type="password" 
                      placeholder="••••••••"
                      className="bg-[#f9fafb] border-[#e5e7eb] dark:bg-[#111827] dark:border-[#374151] dark:text-white"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className={`w-full ${
                      selectedRole === 'student' 
                        ? 'bg-gradient-to-r from-[#4f46e5] to-[#6366f1]' 
                        : 'bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]'
                    } hover:opacity-90`}
                  >
                    Create {selectedRole === 'student' ? 'Student' : 'Instructor'} Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-[#6b7280] hover:text-[#4f46e5] transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
