import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Globe, User, Save, CheckCircle2 } from 'lucide-react';

export function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [name, setName] = useState(user?.name || '');
  const [university, setUniversity] = useState(user?.university || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app this would call the API
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!user) return null;

  return (
    <DashboardLayout userRole={user.role} userName={user.name} userPoints={user.points}>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] dark:text-white mb-2">{t('settings')}</h1>
          <p className="text-[#6b7280] dark:text-[#9ca3af]">Manage your account preferences</p>
        </div>

        {/* Profile */}
        <Card className="border-[#e5e7eb] dark:border-[#374151] dark:bg-[#1f2937]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <User className="w-5 h-5" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="dark:text-[#d1d5db]">{t('full_name')}</Label>
              <Input value={name} onChange={e => setName(e.target.value)} className="dark:bg-[#111827] dark:border-[#374151] dark:text-white" />
            </div>
            <div className="space-y-2">
              <Label className="dark:text-[#d1d5db]">{t('email')}</Label>
              <Input value={user.email} disabled className="bg-[#f3f4f6] dark:bg-[#111827] dark:border-[#374151] dark:text-[#9ca3af]" />
            </div>
            {user.role === 'student' && (
              <div className="space-y-2">
                <Label className="dark:text-[#d1d5db]">{t('university')}</Label>
                <Input value={university} onChange={e => setUniversity(e.target.value)} className="dark:bg-[#111827] dark:border-[#374151] dark:text-white" />
              </div>
            )}
            <Button onClick={handleSave} className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] text-white">
              {saved ? <><CheckCircle2 className="w-4 h-4 mr-2" /> Saved!</> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
            </Button>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="border-[#e5e7eb] dark:border-[#374151] dark:bg-[#1f2937]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />} Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium dark:text-white">{t('dark_mode')}</p>
                <p className="text-sm text-[#6b7280] dark:text-[#9ca3af]">Toggle between light and dark themes</p>
              </div>
              <button
                onClick={toggleTheme}
                className={`relative w-14 h-7 rounded-full transition-colors ${theme === 'dark' ? 'bg-[#4f46e5]' : 'bg-[#d1d5db]'}`}
              >
                <span className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0.5'}`} />
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Language */}
        <Card className="border-[#e5e7eb] dark:border-[#374151] dark:bg-[#1f2937]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 dark:text-white">
              <Globe className="w-5 h-5" /> {t('language')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <button
                onClick={() => setLanguage('en')}
                className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                  language === 'en' ? 'border-[#4f46e5] bg-[#4f46e5]/10 text-[#4f46e5]' : 'border-[#e5e7eb] dark:border-[#374151] text-[#6b7280]'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-6 py-3 rounded-xl border-2 font-medium transition-all ${
                  language === 'ar' ? 'border-[#4f46e5] bg-[#4f46e5]/10 text-[#4f46e5]' : 'border-[#e5e7eb] dark:border-[#374151] text-[#6b7280]'
                }`}
              >
                🇸🇦 العربية
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-[#ef4444]/30 dark:bg-[#1f2937]">
          <CardHeader>
            <CardTitle className="text-[#ef4444]">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10" onClick={logout}>
              {t('logout')}
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
