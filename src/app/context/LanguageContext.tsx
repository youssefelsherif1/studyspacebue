import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

const translations: Record<string, Record<Language, string>> = {
  'dashboard': { en: 'Dashboard', ar: 'لوحة التحكم' },
  'book_room': { en: 'Book Room', ar: 'حجز غرفة' },
  'rooms': { en: 'Rooms', ar: 'الغرف' },
  'rewards': { en: 'Rewards', ar: 'المكافآت' },
  'settings': { en: 'Settings', ar: 'الإعدادات' },
  'logout': { en: 'Logout', ar: 'تسجيل الخروج' },
  'sign_in': { en: 'Sign In', ar: 'تسجيل الدخول' },
  'sign_up': { en: 'Sign Up', ar: 'إنشاء حساب' },
  'welcome_back': { en: 'Welcome back', ar: 'مرحباً بعودتك' },
  'email': { en: 'Email', ar: 'البريد الإلكتروني' },
  'password': { en: 'Password', ar: 'كلمة المرور' },
  'full_name': { en: 'Full Name', ar: 'الاسم الكامل' },
  'university': { en: 'University', ar: 'الجامعة' },
  'student': { en: 'Student', ar: 'طالب' },
  'instructor': { en: 'Instructor', ar: 'مدرّس' },
  'admin': { en: 'Admin', ar: 'مسؤول' },
  'receptionist': { en: 'Receptionist', ar: 'استقبال' },
  'active_bookings': { en: 'Active Bookings', ar: 'الحجوزات النشطة' },
  'total_points': { en: 'Total Points', ar: 'إجمالي النقاط' },
  'study_hours': { en: 'Study Hours', ar: 'ساعات الدراسة' },
  'book_now': { en: 'Book Now', ar: 'احجز الآن' },
  'view_rooms': { en: 'View Rooms', ar: 'عرض الغرف' },
  'quick_actions': { en: 'Quick Actions', ar: 'إجراءات سريعة' },
  'upcoming_bookings': { en: 'Upcoming Bookings', ar: 'الحجوزات القادمة' },
  'payment': { en: 'Payment', ar: 'الدفع' },
  'checkout': { en: 'Checkout', ar: 'الدفع' },
  'confirm_booking': { en: 'Confirm Booking', ar: 'تأكيد الحجز' },
  'select_date': { en: 'Select Date', ar: 'اختر التاريخ' },
  'select_time': { en: 'Select Time Slot', ar: 'اختر الوقت' },
  'available_rooms': { en: 'Available Rooms', ar: 'الغرف المتاحة' },
  'dark_mode': { en: 'Dark Mode', ar: 'الوضع الداكن' },
  'light_mode': { en: 'Light Mode', ar: 'الوضع الفاتح' },
  'language': { en: 'Language', ar: 'اللغة' },
  'view_qr': { en: 'View QR Code', ar: 'عرض رمز QR' },
  'booking_confirmed': { en: 'Booking Confirmed!', ar: '!تم تأكيد الحجز' },
  'pay_with_points': { en: 'Pay with Points', ar: 'ادفع بالنقاط' },
  'access_denied': { en: 'Access Denied', ar: 'تم رفض الوصول' },
  'no_permission': { en: 'You do not have permission to view this page.', ar: 'ليس لديك صلاحية لعرض هذه الصفحة.' },
  'manage_rooms': { en: 'Manage Rooms', ar: 'إدارة الغرف' },
  'bookings': { en: 'Bookings', ar: 'الحجوزات' },
  'new_booking': { en: 'New Booking', ar: 'حجز جديد' },
  'back_home': { en: '← Back to Home', ar: '← العودة للرئيسية' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLang] = useState<Language>(() => {
    return (localStorage.getItem('studyspace_lang') as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('studyspace_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => setLang(lang);

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
