import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Repeat, DollarSign, Users, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { mockSubscriptions, mockBookings } from '../data/mock-data';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';

export function InstructorDashboard() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dark = theme === 'dark';
  const [editDialog, setEditDialog] = useState<string | null>(null);
  const [calendarDialog, setCalendarDialog] = useState<string | null>(null);

  if (!user) return null;

  const userSubscriptions = mockSubscriptions.filter(s => s.instructorId === user.id || (user.name === 'Dr. Carol' && s.instructorId === 'u2'));
  const totalSpent = userSubscriptions.reduce((sum, sub) => sum + sub.amount, 0);
  const totalSessions = userSubscriptions.length * 4; // Simplified: 4 sessions per month per sub

  const handleCancel = (id: string) => {
    if (confirm('Are you sure you want to cancel this subscription?')) {
      alert('Subscription cancelled successfully.');
    }
  };

  return (
    <DashboardLayout 
      userRole="instructor" 
      userName={user.name}
      userPoints={user.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-2`}>Welcome, {user.name}! 🎓</h1>
          <p className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Manage your recurring sessions and track your study space usage.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Active Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{userSubscriptions.length}</span>
                <Repeat className="w-8 h-8 text-[#8b5cf6]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>Fixed schedules</p>
            </CardContent>
          </Card>

          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Monthly Spend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[#10b981]">${totalSpent}</span>
                <DollarSign className="w-8 h-8 text-[#10b981]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>Subscription total</p>
            </CardContent>
          </Card>

          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Total Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#4f46e5]'}`}>{totalSessions}</span>
                <Calendar className="w-8 h-8 text-[#4f46e5]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>This semester</p>
            </CardContent>
          </Card>

          <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} hover:shadow-lg transition-shadow`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Reward Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-[#f59e0b]">{user.points}</span>
                <TrendingUp className="w-8 h-8 text-[#f59e0b]" />
              </div>
              <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mt-2`}>Earned points</p>
            </CardContent>
          </Card>
        </div>

        {/* Subscription Management */}
        <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className={dark ? 'text-white' : ''}>Active Subscriptions</CardTitle>
                <CardDescription>Your recurring room bookings</CardDescription>
              </div>
              <Link to="/instructor/booking">
                <Button className="bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]">
                  New Subscription
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {userSubscriptions.map((subscription) => (
              <div key={subscription.id} className={`p-6 ${dark ? 'bg-[#8b5cf6]/5 border-[#374151]' : 'bg-gradient-to-br from-[#8b5cf6]/5 to-[#a78bfa]/5 border-[#e5e7eb]'} rounded-xl border`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] rounded-lg flex items-center justify-center">
                      <Repeat className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{subscription.roomName}</h4>
                      <p className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mb-2`}>{subscription.schedule}</p>
                      <div className={`flex items-center gap-2 text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                        <Clock className="w-4 h-4" />
                        {subscription.timeSlot}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>${subscription.amount}</div>
                    <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>per month</p>
                    <Badge className="mt-2 bg-[#10b981]">{subscription.status}</Badge>
                  </div>
                </div>
                <div className={`flex items-center gap-3 pt-4 border-t ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
                  <Button variant="outline" size="sm" onClick={() => setEditDialog(subscription.id)}>Edit Schedule</Button>
                  <Button variant="outline" size="sm" onClick={() => setCalendarDialog(subscription.id)}>View Calendar</Button>
                  <Button variant="outline" size="sm" className="text-[#ef4444] hover:text-[#ef4444]" onClick={() => handleCancel(subscription.id)}>Cancel</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Edit Schedule Dialog */}
        {editDialog && (
          <Dialog open={!!editDialog} onOpenChange={() => setEditDialog(null)}>
            <DialogContent className={dark ? 'bg-[#1f2937] border-[#374151]' : ''}>
              <DialogHeader>
                <DialogTitle className={dark ? 'text-white' : ''}>Edit Schedule</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${dark ? 'text-[#d1d5db]' : ''}`}>Day of Week</label>
                  <select className={`w-full p-2 border rounded-lg ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`}>
                    <option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${dark ? 'text-[#d1d5db]' : ''}`}>Time Slot</label>
                  <select className={`w-full p-2 border rounded-lg ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`}>
                    <option>5:00 PM - 8:00 PM</option><option>6:00 PM - 9:00 PM</option><option>9:00 AM - 12:00 PM</option>
                  </select>
                </div>
                <Button className="w-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]" onClick={() => { alert('Schedule updated!'); setEditDialog(null); }}>
                  Save Changes
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Calendar Dialog */}
        {calendarDialog && (
          <Dialog open={!!calendarDialog} onOpenChange={() => setCalendarDialog(null)}>
            <DialogContent className={dark ? 'bg-[#1f2937] border-[#374151]' : ''}>
              <DialogHeader>
                <DialogTitle className={dark ? 'text-white' : ''}>Subscription Calendar</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <div key={i} className={`text-center text-xs font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                    <div key={day} className={`aspect-square rounded-lg text-sm font-medium flex items-center justify-center
                      ${day % 7 === 0 || day % 7 === 3 ? 'bg-[#8b5cf6]/20 text-[#8b5cf6] font-bold' : dark ? 'text-[#d1d5db]' : 'text-[#1a1a2e]'}
                    `}>{day}</div>
                  ))}
                </div>
                <p className={`text-sm mt-4 ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                  Purple highlighted days show your scheduled sessions.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* This Week's Sessions */}
          <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
            <CardHeader>
              <CardTitle className={dark ? 'text-white' : ''}>This Week's Sessions</CardTitle>
              <CardDescription>Your scheduled study room sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { day: 'Sunday', date: 'Mar 23', room: 'Collaboration Space B', time: '5:00 PM - 8:00 PM', type: 'Subscription' },
                { day: 'Wednesday', date: 'Mar 26', room: 'Conference Room C', time: '6:00 PM - 9:00 PM', type: 'Subscription' },
              ].map((session, index) => (
                <div key={index} className={`flex items-center gap-4 p-4 ${dark ? 'bg-[#111827] border-[#374151]' : 'bg-[#f9fafb] border-[#e5e7eb]'} rounded-lg border`}>
                  <div className="flex-shrink-0 text-center">
                    <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} uppercase`}>{session.day}</div>
                    <div className={`text-xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{session.date.split(' ')[1]}</div>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{session.room}</h4>
                    <div className={`flex items-center gap-2 text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                      <Clock className="w-4 h-4" />
                      {session.time}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-[#8b5cf6]/10 text-[#8b5cf6]">
                    {session.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
            <CardHeader>
              <CardTitle className={dark ? 'text-white' : ''}>Usage Statistics</CardTitle>
              <CardDescription>Your study space analytics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { label: 'Most Used Room', value: 'Collaboration Space B' },
                  { label: 'Total Hours (Month)', value: '36 hours' },
                  { label: 'Average Session', value: '3 hours' },
                  { label: 'Points This Month', value: '+180 pts', color: 'text-[#8b5cf6]' },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>{stat.label}</span>
                    <span className={`font-semibold ${stat.color || (dark ? 'text-white' : 'text-[#1a1a2e]')}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
              
              <div className={`pt-4 border-t ${dark ? 'border-[#374151]' : 'border-[#e5e7eb]'}`}>
                <h4 className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-3`}>Preferred Days</h4>
                <div className="space-y-2">
                  {[
                    { day: 'Sunday', percent: 100 },
                    { day: 'Wednesday', percent: 100 },
                    { day: 'Friday', percent: 25 },
                  ].map((item) => (
                    <div key={item.day}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>{item.day}</span>
                        <span className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{item.percent}%</span>
                      </div>
                      <div className={`h-2 ${dark ? 'bg-[#374151]' : 'bg-[#e5e7eb]'} rounded-full overflow-hidden`}>
                        <div 
                          className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa]"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructor Benefits */}
        <Card className={`${dark ? 'border-[#374151] bg-gradient-to-br from-[#4f46e5]/10 to-[#8b5cf6]/10' : 'border-[#e5e7eb] bg-gradient-to-br from-[#4f46e5]/5 to-[#8b5cf6]/5'}`}>
          <CardHeader>
            <CardTitle className={dark ? 'text-white' : ''}>Instructor Benefits</CardTitle>
            <CardDescription>Advantages of subscription plans</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: DollarSign, color: '#10b981', title: 'Save 20%', desc: 'Subscription pricing is 20% cheaper than pay-as-you-go' },
                { icon: Repeat, color: '#4f46e5', title: 'Fixed Schedule', desc: 'Same room, same time, every week - guaranteed' },
                { icon: TrendingUp, color: '#8b5cf6', title: 'Earn More Points', desc: 'Get 1.5x points on all subscription bookings' },
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0`} style={{ backgroundColor: benefit.color }}>
                    <benefit.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{benefit.title}</h4>
                    <p className={`text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
