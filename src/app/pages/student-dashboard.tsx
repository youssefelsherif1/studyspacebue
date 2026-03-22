import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Calendar, Clock, MapPin, TrendingUp, Users, Award } from 'lucide-react';
import { Link } from 'react-router';
import { mockBookings } from '../data/mock-data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

export function StudentDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [qrBookingId, setQrBookingId] = useState<string | null>(null);

  if (!user) return null;

  const userBookings = mockBookings.filter(b => b.userId === user.id || (user.name === 'Alice Smith' && b.userId === 'u1')); // Match current user or fallback for Alice demo data
  const confirmedBookings = userBookings.filter(b => b.status === 'confirmed');
  const studyHours = confirmedBookings.length; // Each booking is 1 hour
  
  const nextReward = 250;
  const progress = Math.min((user.points / nextReward) * 100, 100);
  const dark = theme === 'dark';

  return (
    <DashboardLayout 
      userRole="student" 
      userName={user.name}
      userPoints={user.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-2`}>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p className={`${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Here's what's happening with your study sessions today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Active Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{confirmedBookings.length}</span>
                <Calendar className="w-8 h-8 text-[#4f46e5]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>This week</p>
            </CardContent>
          </Card>

          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Total Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[#8b5cf6]">{user.points}</span>
                <Award className="w-8 h-8 text-[#8b5cf6]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>Earned total</p>
            </CardContent>
          </Card>

          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Study Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold text-[#f59e0b]`}>{studyHours}</span>
                <Clock className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Progress */}
        <Card className={`${dark ? 'border-[#374151] bg-gradient-to-br from-[#4f46e5]/10 to-[#8b5cf6]/10' : 'border-[#e5e7eb] bg-gradient-to-br from-[#4f46e5]/5 to-[#8b5cf6]/5'}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={dark ? 'text-white' : ''}>Rewards Progress</CardTitle>
                <CardDescription>You're {Math.max(nextReward - user.points, 0)} points away from your next reward!</CardDescription>
              </div>
              <Link to="/rewards">
                <Button variant="outline">View Rewards</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>{user.points} / {nextReward} points</span>
                <span className="font-semibold text-[#4f46e5]">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className={dark ? 'text-white' : ''}>Upcoming Bookings</CardTitle>
                <Link to="/booking">
                  <Button size="sm" className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
                    Book Now
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {userBookings.length > 0 ? (
                userBookings.map((booking) => (
                  <div key={booking.id} className={`flex items-start gap-4 p-4 ${dark ? 'bg-[#111827]' : 'bg-[#f9fafb]'} rounded-xl border ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{booking.roomName}</h4>
                      <div className={`flex items-center gap-2 text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mb-2`}>
                        <Clock className="w-4 h-4" />
                        {booking.timeSlot}
                      </div>
                      <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                        {booking.status}
                      </Badge>
                    </div>
                    {booking.qrCode && (
                      <Button variant="outline" size="sm" onClick={() => setQrBookingId(qrBookingId === booking.id ? null : booking.id)}>
                        View QR
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-[#6b7280]">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No upcoming bookings</p>
                  <Link to="/booking">
                    <Button className="mt-4" size="sm">Book Your First Room</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* QR Code Panel */}
          {qrBookingId && (
            <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>QR Code</CardTitle>
                <CardDescription>Show this QR to the receptionist for check-in</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-48 h-48 bg-white p-4 rounded-xl border-2 border-[#4f46e5] mb-4">
                  {/* Simple QR simulation using CSS grid */}
                  <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-0.5">
                    {Array.from({ length: 64 }, (_, i) => (
                      <div key={i} className={`${(i + Math.floor(i / 8)) % 3 === 0 ? 'bg-[#1a1a2e]' : i % 5 === 0 ? 'bg-[#4f46e5]' : 'bg-white'} rounded-[1px]`} />
                    ))}
                  </div>
                </div>
                <p className={`text-sm font-mono ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                  QR-{qrBookingId.toUpperCase()}-2026
                </p>
                <Badge className="mt-2 bg-[#10b981]">Valid</Badge>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
          <CardHeader>
            <CardTitle className={dark ? 'text-white' : ''}>Quick Actions</CardTitle>
            <CardDescription>Shortcuts to common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/booking" className="group">
                <div className={`p-6 bg-gradient-to-br from-[#4f46e5]/10 to-[#6366f1]/10 rounded-xl border ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'} hover:shadow-md transition-all cursor-pointer`}>
                  <Calendar className="w-8 h-8 text-[#4f46e5] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Book Room</h4>
                </div>
              </Link>
              <Link to="/rooms" className="group">
                <div className={`p-6 bg-gradient-to-br from-[#8b5cf6]/10 to-[#a78bfa]/10 rounded-xl border ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'} hover:shadow-md transition-all cursor-pointer`}>
                  <MapPin className="w-8 h-8 text-[#8b5cf6] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>View Rooms</h4>
                </div>
              </Link>
              <Link to="/rewards" className="group">
                <div className={`p-6 bg-gradient-to-br from-[#f59e0b]/10 to-[#d97706]/10 rounded-xl border ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'} hover:shadow-md transition-all cursor-pointer`}>
                  <Award className="w-8 h-8 text-[#f59e0b] mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Rewards</h4>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
