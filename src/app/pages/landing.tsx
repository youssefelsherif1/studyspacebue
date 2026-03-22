import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { BookOpen, Clock, Zap, Check, Award, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] via-white to-[#e0e7ff]">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-[#1a1a2e]">StudySpace</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[#6b7280] hover:text-[#1a1a2e] transition-colors">Features</a>
            <a href="#pricing" className="text-[#6b7280] hover:text-[#1a1a2e] transition-colors">Pricing</a>
            {user ? (
              <Link to={user.role === 'student' ? '/student' : user.role === 'instructor' ? '/instructor' : user.role === 'admin' ? '/admin' : '/receptionist'}>
                <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90">Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline" className="border-[#e5e7eb]">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90">Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#e0e7ff] rounded-full mb-6">
              <Zap className="w-4 h-4 text-[#4f46e5]" />
              <span className="text-sm text-[#4f46e5] font-medium">Smart Study Space Management</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#1a1a2e] mb-6 leading-tight">
              Your Perfect Study Space Awaits
            </h1>
            <p className="text-xl text-[#6b7280] mb-8 leading-relaxed">
              Book premium study rooms and earn rewards. The modern way to manage your study time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90 text-lg h-14 px-8">
                  Start Booking
                </Button>
              </Link>
              <Link to="/rooms">
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 border-2 border-[#e5e7eb]">
                  Explore Rooms
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#4f46e5]/20 to-[#8b5cf6]/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-2">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Modern study space"
                className="w-full h-[400px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">Everything You Need</h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Powerful features designed to enhance your study experience
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#4f46e5] to-[#6366f1] rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">Real-Time Booking</h3>
              <p className="text-[#6b7280] leading-relaxed">
                See available rooms instantly and book your perfect study space in seconds with our smart calendar system.
              </p>
            </div>


            <div className="bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#06b6d4] to-[#0891b2] rounded-xl flex items-center justify-center mb-6">
                <Award className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">Points & Rewards</h3>
              <p className="text-[#6b7280] leading-relaxed">
                Earn points with every booking and redeem them for free hours, coffee, drinks, and exclusive discounts.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">Multiple Locations</h3>
              <p className="text-[#6b7280] leading-relaxed">
                Choose from quiet pods, group rooms, outdoor terraces, and more. Perfect space for every study style.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">QR Check-In</h3>
              <p className="text-[#6b7280] leading-relaxed">
                Seamless check-in with QR codes. Quick, contactless, and secure access to your booked spaces.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#f9fafb] to-white border border-[#e5e7eb] rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-gradient-to-br from-[#ef4444] to-[#dc2626] rounded-xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1a2e] mb-3">Instructor Subscriptions</h3>
              <p className="text-[#6b7280] leading-relaxed">
                Fixed recurring schedules for instructors. Book your favorite room at the same time every week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-[#f9fafb] to-[#e0e7ff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1a1a2e] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-[#6b7280] max-w-2xl mx-auto">
              Pay as you go or subscribe for better rates
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-[#1a1a2e] mb-2">Quiet Pods</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1a1a2e]">$5</span>
                <span className="text-[#6b7280]">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Perfect for solo study
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  PC & Monitor included
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Air conditioning
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Earn 5 points/hour
                </li>
              </ul>
              <Link to="/auth">
                <Button className="w-full" variant="outline">Get Started</Button>
              </Link>
            </div>

            <div className="bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-2xl p-8 hover:shadow-xl transition-shadow text-white relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#10b981] text-white px-4 py-1 rounded-full text-sm font-medium">
                Popular
              </div>
              <h3 className="text-2xl font-semibold mb-2">Group Rooms</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$15</span>
                <span className="text-white/80">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Premium features included
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Whiteboard & PC
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Large monitor
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Earn 15 points/hour
                </li>
              </ul>
              <Link to="/auth">
                <Button className="w-full bg-white text-[#4f46e5] hover:bg-white/90">Get Started</Button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-[#e5e7eb] p-8 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-[#1a1a2e] mb-2">Outdoor Spaces</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold text-[#1a1a2e]">$8</span>
                <span className="text-[#6b7280]">/hour</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Premium features included
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Ergonomic seating
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Quiet environment
                </li>
                <li className="flex items-center gap-2 text-[#6b7280]">
                  <Check className="w-5 h-5 text-[#10b981]" />
                  Earn 8 points/hour
                </li>
              </ul>
              <Link to="/auth">
                <Button className="w-full" variant="outline">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-[#1a1a2e] mb-6">Ready to Transform Your Study Experience?</h2>
          <p className="text-xl text-[#6b7280] mb-8">
            Join thousands of students and instructors using StudySpace
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90 text-lg h-14 px-10">
              Get Started for Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-lg font-semibold">StudySpace</span>
              </div>
              <p className="text-gray-400 text-sm">
                The modern way to manage your study time and space.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Locations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2026 StudySpace. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
