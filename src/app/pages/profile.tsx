import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { mockBookings, mockSubscriptions } from '../data/mock-data';
import { Link } from 'react-router';
import { Calendar, Clock, Award, DollarSign, MapPin, Repeat, User, Mail, GraduationCap, Building } from 'lucide-react';

export function ProfilePage() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === 'dark';

  if (!user) return null;

  const userBookings = mockBookings.filter(b => b.userId === 'u1');
  const userSubscriptions = user.role === 'instructor' ? mockSubscriptions : [];

  return (
    <DashboardLayout userRole={user.role} userName={user.name} userPoints={user.points}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className={`relative overflow-hidden rounded-2xl ${dark ? 'bg-[#1f2937]' : 'bg-white'} border ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'} shadow-lg`}>
          <div className="h-32 bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]" />
          <div className="px-8 pb-8">
            <div className="flex items-end gap-6 -mt-12">
              <Avatar className="w-24 h-24 border-4 border-white dark:border-[#1f2937] shadow-xl">
                <AvatarFallback className="bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white text-3xl font-bold">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="pb-2">
                <h1 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.name}</h1>
                <Badge className="mt-1 capitalize bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">{user.role}</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} text-center`}>
            <CardContent className="pt-6 pb-4">
              <Award className="w-8 h-8 text-[#8b5cf6] mx-auto mb-2" />
              <div className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.points}</div>
              <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Points</div>
            </CardContent>
          </Card>
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} text-center`}>
            <CardContent className="pt-6 pb-4">
              <Calendar className="w-8 h-8 text-[#4f46e5] mx-auto mb-2" />
              <div className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{userBookings.length}</div>
              <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Bookings</div>
            </CardContent>
          </Card>
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} text-center`}>
            <CardContent className="pt-6 pb-4">
              <Clock className="w-8 h-8 text-[#f59e0b] mx-auto mb-2" />
              <div className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>24</div>
              <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Study Hours</div>
            </CardContent>
          </Card>
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} text-center`}>
            <CardContent className="pt-6 pb-4">
              <DollarSign className="w-8 h-8 text-[#10b981] mx-auto mb-2" />
              <div className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>$45</div>
              <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Total Spent</div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Info */}
        <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className={`flex items-center gap-2 ${dark ? 'text-white' : ''}`}>
                <User className="w-5 h-5" /> Personal Information
              </CardTitle>
              <Link to="/settings">
                <Button variant="outline" size="sm">Edit Profile</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dark ? 'bg-[#374151]' : 'bg-[#f3f4f6]'}`}>
                  <User className="w-5 h-5 text-[#4f46e5]" />
                </div>
                <div>
                  <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Full Name</div>
                  <div className={`font-medium ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dark ? 'bg-[#374151]' : 'bg-[#f3f4f6]'}`}>
                  <Mail className="w-5 h-5 text-[#4f46e5]" />
                </div>
                <div>
                  <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Email</div>
                  <div className={`font-medium ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dark ? 'bg-[#374151]' : 'bg-[#f3f4f6]'}`}>
                  <GraduationCap className="w-5 h-5 text-[#8b5cf6]" />
                </div>
                <div>
                  <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Role</div>
                  <div className={`font-medium capitalize ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.role}</div>
                </div>
              </div>
              {user.university && (
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${dark ? 'bg-[#374151]' : 'bg-[#f3f4f6]'}`}>
                    <Building className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>University</div>
                    <div className={`font-medium ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{user.university}</div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={`flex items-center gap-2 ${dark ? 'text-white' : ''}`}>
                  <Calendar className="w-5 h-5" /> Booking History
                </CardTitle>
                <CardDescription>Your past and upcoming room reservations</CardDescription>
              </div>
              <Link to="/booking">
                <Button size="sm" className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">Book New</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userBookings.length > 0 ? (
              <div className="space-y-3">
                {userBookings.map((booking) => (
                  <div key={booking.id} className={`flex items-center gap-4 p-4 rounded-xl border ${dark ? 'bg-[#111827] border-[#374151]' : 'bg-[#f9fafb] border-[#e5e7eb]'}`}>
                    <div className="w-10 h-10 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{booking.roomName}</h4>
                      <div className={`flex items-center gap-2 text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                        <Clock className="w-3 h-3" /> {booking.timeSlot}
                      </div>
                    </div>
                    <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'} className="text-xs">
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`text-center py-8 ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p>No bookings yet</p>
                <Link to="/booking"><Button className="mt-3" size="sm">Make Your First Booking</Button></Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Subscriptions (Instructor only) */}
        {user.role === 'instructor' && (
          <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className={`flex items-center gap-2 ${dark ? 'text-white' : ''}`}>
                    <Repeat className="w-5 h-5" /> Active Subscriptions
                  </CardTitle>
                  <CardDescription>Your recurring room reservations</CardDescription>
                </div>
                <Link to="/instructor/booking">
                  <Button size="sm" variant="outline">New Subscription</Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {userSubscriptions.length > 0 ? (
                <div className="space-y-3">
                  {userSubscriptions.map((sub) => (
                    <div key={sub.id} className={`flex items-center gap-4 p-4 rounded-xl border ${dark ? 'bg-[#111827] border-[#374151]' : 'bg-[#f9fafb] border-[#e5e7eb]'}`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] rounded-lg flex items-center justify-center flex-shrink-0">
                        <Repeat className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{sub.roomName}</h4>
                        <div className={`flex items-center gap-2 text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                          <Clock className="w-3 h-3" /> {sub.schedule} · {sub.timeSlot}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>${sub.amount}/mo</div>
                        <Badge className="mt-1 bg-[#10b981] text-xs">{sub.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`text-center py-8 ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                  <Repeat className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>No active subscriptions</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Points & Rewards Summary */}
        <Card className={`${dark ? 'border-[#374151] bg-gradient-to-br from-[#4f46e5]/10 to-[#8b5cf6]/10' : 'border-[#e5e7eb] bg-gradient-to-br from-[#4f46e5]/5 to-[#8b5cf6]/5'}`}>
          <CardHeader>
            <CardTitle className={`flex items-center gap-2 ${dark ? 'text-white' : ''}`}>
              <Award className="w-5 h-5 text-[#8b5cf6]" /> Points & Rewards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Current Balance</div>
                <div className="text-3xl font-bold text-[#4f46e5]">{user.points} pts</div>
              </div>
              <div>
                <div className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Welcome Bonus</div>
                <div className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>200 pts</div>
              </div>
              <div>
                <div className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Next Reward At</div>
                <div className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>500 pts</div>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/rewards">
                <Button variant="outline" className="border-[#4f46e5] text-[#4f46e5] hover:bg-[#4f46e5]/10">View All Rewards →</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
