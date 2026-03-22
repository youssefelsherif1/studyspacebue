import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Calendar, QrCode, DollarSign, User, Clock, Check, X, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { mockRooms, mockBookings, timeSlots } from '../data/mock-data';
import { useAuth } from '../context/AuthContext';

export function ReceptionistPanel() {
  const { user, login, signup } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [showQuickBooking, setShowQuickBooking] = useState(false);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === 'login') {
      const result = login(email, password);
      if (!result.success) setError(result.message || 'Login failed');
      else setError('');
    } else {
      signup(name, email, 'receptionist');
      // Signup automatically logs in but might be pending
      setError('');
    }
  };

  if (!user || user.role !== 'receptionist') {
    return (
      <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center p-6 text-[#1a1a2e]">
        <Card className="max-w-md w-full shadow-2xl border-none overflow-hidden">
          <div className="bg-[#1a1a2e] p-6 text-center text-white">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold">Receptionist Portal</h2>
            <p className="text-white/60 text-sm mt-1 capitalize">{authMode} to manage library guest access</p>
          </div>
          <CardContent className="p-8">
            <Tabs value={authMode} onValueChange={(v) => { setAuthMode(v as any); setError(''); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" /> Login
                </TabsTrigger>
                <TabsTrigger value="signup" className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> Register
                </TabsTrigger>
              </TabsList>

              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 mb-6 border border-red-100">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input 
                      placeholder="Your Name" 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    type="email" 
                    placeholder="reception@studyspace.test"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>Password</Label>
                  <Input 
                    type="password" 
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full h-12 bg-[#1a1a2e] hover:bg-[#2d2d4d] text-lg font-semibold">
                  {authMode === 'login' ? 'Access Portal' : 'Apply for Access'}
                </Button>
                {authMode === 'signup' && (
                  <p className="text-xs text-[#f59e0b] text-center mt-3 font-medium">
                    Note: Registration requires Admin approval before login.
                  </p>
                )}
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    );
  }

  const todayBookings = mockBookings.filter(b => b.date === '2026-03-21');

  const handleQRScan = (code: string) => {
    // Simulate QR code scanning
    const booking = mockBookings.find(b => b.qrCode === code);
    if (booking) {
      alert(`✓ Check-in confirmed for ${booking.userName} - ${booking.roomName}`);
      setQrCode('');
    } else {
      alert('❌ Invalid QR code');
    }
  };

  return (
    <DashboardLayout 
      userRole="receptionist" 
      userName="Reception Desk"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Reception Panel</h1>
          <p className="text-[#6b7280]">Manage walk-ins, check-ins, and quick bookings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Today's Bookings</p>
                  <p className="text-3xl font-bold text-[#1a1a2e]">{todayBookings.length}</p>
                </div>
                <Calendar className="w-10 h-10 text-[#4f46e5]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Available Rooms</p>
                  <p className="text-3xl font-bold text-[#10b981]">
                    {mockRooms.filter(r => r.status === 'available').length}
                  </p>
                </div>
                <Check className="w-10 h-10 text-[#10b981]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Pending Check-ins</p>
                  <p className="text-3xl font-bold text-[#f59e0b]">
                    {todayBookings.filter(b => b.status === 'confirmed').length}
                  </p>
                </div>
                <Clock className="w-10 h-10 text-[#f59e0b]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Today's Revenue</p>
                  <p className="text-3xl font-bold text-[#8b5cf6]">
                    ${todayBookings.reduce((sum, b) => sum + b.amount, 0)}
                  </p>
                </div>
                <DollarSign className="w-10 h-10 text-[#8b5cf6]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* QR Code Check-in */}
          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR Code Check-in
              </CardTitle>
              <CardDescription>Scan customer QR codes for check-in</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-8 bg-gradient-to-br from-[#4f46e5]/10 to-[#8b5cf6]/10 rounded-xl border-2 border-dashed border-[#4f46e5]/30 text-center">
                <QrCode className="w-20 h-20 mx-auto mb-4 text-[#4f46e5]" />
                <p className="text-[#6b7280] mb-4">Scan QR code or enter manually</p>
                <div className="flex gap-2 max-w-md mx-auto">
                  <Input 
                    placeholder="QR-XXXX-XXXX"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                    className="bg-white"
                  />
                  <Button 
                    onClick={() => handleQRScan(qrCode)}
                    className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]"
                  >
                    Verify
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm text-[#1a1a2e]">Quick Test</h4>
                <div className="flex flex-wrap gap-2">
                  {mockBookings
                    .filter(b => b.qrCode)
                    .slice(0, 3)
                    .map((booking) => (
                      <Button
                        key={booking.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQRScan(booking.qrCode!)}
                      >
                        {booking.qrCode}
                      </Button>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Booking */}
          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Quick Booking (Walk-in)
              </CardTitle>
              <CardDescription>Create booking for customers without accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog open={showQuickBooking} onOpenChange={setShowQuickBooking}>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-[#10b981] to-[#059669] h-12">
                    Create Walk-in Booking
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Walk-in Booking</DialogTitle>
                    <DialogDescription>Create a new booking for a walk-in customer</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Customer Name</Label>
                      <Input placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number (Optional)</Label>
                      <Input placeholder="+1 234 567 8900" />
                    </div>
                    <div className="space-y-2">
                      <Label>Room</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select room" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockRooms
                            .filter(r => r.status === 'available')
                            .map((room) => (
                              <SelectItem key={room.id} value={room.id}>
                                {room.name} - ${room.pricePerHour}/hr
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Time Slot</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="pt-4 flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setShowQuickBooking(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="flex-1 bg-gradient-to-r from-[#10b981] to-[#059669]"
                        onClick={() => {
                          alert('✓ Walk-in booking created successfully!');
                          setShowQuickBooking(false);
                        }}
                      >
                        Create & Pay
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              <div className="mt-6 space-y-3">
                <h4 className="font-semibold text-sm text-[#1a1a2e]">Available Now</h4>
                {mockRooms
                  .filter(r => r.status === 'available')
                  .slice(0, 3)
                  .map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-3 bg-[#f9fafb] rounded-lg border border-[#e5e7eb]">
                      <div>
                        <p className="font-medium text-[#1a1a2e] text-sm">{room.name}</p>
                        <p className="text-xs text-[#6b7280]">{room.capacity} people · ${room.pricePerHour}/hr</p>
                      </div>
                      <Badge className="bg-[#10b981]">Available</Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        <Card className="border-[#e5e7eb]">
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>All bookings for {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {todayBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-4 p-4 bg-[#f9fafb] rounded-xl border border-[#e5e7eb]">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-semibold text-[#1a1a2e]">{booking.userName}</h4>
                      <Badge 
                        variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                        className={booking.status === 'confirmed' ? 'bg-[#f59e0b]' : 'bg-[#6b7280]'}
                      >
                        {booking.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#6b7280] mb-1">{booking.roomName}</p>
                    <div className="flex items-center gap-4 text-xs text-[#6b7280]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {booking.timeSlot}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        ${booking.amount}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {booking.status === 'confirmed' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-[#10b981] hover:bg-[#059669]"
                          onClick={() => handleQRScan(booking.qrCode!)}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Check In
                        </Button>
                        <Button size="sm" variant="outline" className="text-[#f59e0b] hover:text-[#f59e0b] hover:bg-[#f59e0b]/10 border-[#f59e0b]/50" onClick={() => alert('Marked as No-Show. Points penalized.')}>
                          <X className="w-4 h-4 mr-1" />
                          Mark No-Show
                        </Button>
                      </>
                    )}
                    {booking.status === 'completed' && (
                      <Badge className="bg-[#10b981]">Completed</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#4f46e5] to-[#6366f1] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-1">View All Bookings</h4>
                <p className="text-sm text-[#6b7280]">See complete schedule</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-1">Process Payment</h4>
                <p className="text-sm text-[#6b7280]">Take walk-in payments</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] rounded-xl flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-1">Customer Lookup</h4>
                <p className="text-sm text-[#6b7280]">Find user bookings</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
