import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, Users, DollarSign, Wifi, Monitor, Wind, Sparkles, Check, Award } from 'lucide-react';
import { mockRooms } from '../data/mock-data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const oneHourSlots = [
  '8:00 AM - 9:00 AM',
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:00 AM - 12:00 PM',
  '12:00 PM - 1:00 PM',
  '1:00 PM - 2:00 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM',
  '4:00 PM - 5:00 PM',
  '5:00 PM - 6:00 PM',
  '6:00 PM - 7:00 PM',
  '7:00 PM - 8:00 PM',
  '8:00 PM - 9:00 PM',
  '9:00 PM - 10:00 PM',
];

export function BookingPage() {
  const [selectedDate, setSelectedDate] = useState('2026-03-22');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<typeof mockRooms[0] | null>(null);
  const [payWithPoints, setPayWithPoints] = useState(false);
  const navigate = useNavigate();
  const { user, updatePoints, addBooking } = useAuth();
  const { theme } = useTheme();
  const dark = theme === 'dark';

  if (!user) return null;

  const totalPrice = selectedRoom ? selectedRoom.pricePerHour : 0;
  const pointsCost = 200;
  const canPayWithPoints = user.points >= pointsCost && selectedRoom && selectedRoom.pricePerHour <= 10;

  const handleBooking = () => {
    if (!selectedTime || !selectedRoom) {
      alert('Please select a time slot and a room');
      return;
    }
    if (payWithPoints && canPayWithPoints) {
      const newPoints = user.points - pointsCost;
      updatePoints(newPoints);
      
      // Save the booking
      addBooking({
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        userId: user.id,
        userName: user.name,
        date: selectedDate,
        timeSlot: selectedTime,
        status: 'confirmed',
        paid: true,
        amount: 0,
        qrCode: `QR-BP-${Date.now()}`
      });

      alert(`✅ Booking confirmed! 200 points deducted. Remaining: ${newPoints} pts`);
      const dashboardUrl = user.role === 'student' ? '/student' : '/instructor';
      navigate(dashboardUrl);
    } else {
      // For real payment, we'll handle it in the next step, but let's pass state
      navigate('/payment', { 
        state: { 
          roomId: selectedRoom.id,
          roomName: selectedRoom.name,
          date: selectedDate,
          timeSlot: selectedTime,
          price: totalPrice
        } 
      });
    }
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'whiteboard': return <Sparkles className="w-4 h-4" />;
      case 'pc': return <Monitor className="w-4 h-4" />;
      case 'monitor': return <Monitor className="w-4 h-4" />;
      case 'ac': return <Wind className="w-4 h-4" />;
      default: return <Check className="w-4 h-4" />;
    }
  };

  return (
    <DashboardLayout 
      userRole={user.role} 
      userName={user.name}
      userPoints={user.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-2`}>Book a Study Room</h1>
          <p className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Select your preferred date, time, and room (1-hour slots)</p>
        </div>

        {/* Booking Selection Summary */}
        {selectedRoom && selectedTime && (
          <Card className={`border-[#4f46e5] ${dark ? 'bg-[#4f46e5]/10' : 'bg-gradient-to-br from-[#4f46e5]/5 to-[#8b5cf6]/5'}`}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{selectedRoom.name}</h3>
                    <div className={`flex items-center gap-4 text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                      <span>{selectedDate}</span>
                      <span>•</span>
                      <span>{selectedTime}</span>
                      <span>•</span>
                      <span className="font-semibold text-[#4f46e5]">{totalPrice} EGP (1 hr)</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {canPayWithPoints && (
                    <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all ${payWithPoints ? 'border-[#8b5cf6] bg-[#8b5cf6]/10' : 'border-[#e5e7eb] dark:border-[#374151]'}`}>
                      <input type="checkbox" checked={payWithPoints} onChange={() => setPayWithPoints(!payWithPoints)} className="rounded" />
                      <Award className="w-4 h-4 text-[#8b5cf6]" />
                      <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Pay with 200 pts</span>
                    </label>
                  )}
                  <Button 
                    onClick={handleBooking}
                    className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6] hover:opacity-90"
                  >
                    {payWithPoints ? 'Book with Points' : 'Confirm Booking'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Date & Time Selection */}
          <div className="lg:col-span-1 space-y-6">
            <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                    <div key={i} className={`text-center text-xs font-medium ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} py-2`}>
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                    const date = `2026-03-${day.toString().padStart(2, '0')}`;
                    const isSelected = date === selectedDate;
                    const isPast = day < 21;
                    return (
                      <button
                        key={day}
                        onClick={() => !isPast && setSelectedDate(date)}
                        disabled={isPast}
                        className={`
                          aspect-square rounded-lg text-sm font-medium transition-all
                          ${isPast ? 'text-[#d1d5db] cursor-not-allowed' : ''}
                          ${isSelected 
                            ? 'bg-gradient-to-br from-[#4f46e5] to-[#8b5cf6] text-white' 
                            : `${dark ? 'hover:bg-[#374151] text-[#d1d5db]' : 'hover:bg-[#f3f4f6] text-[#1a1a2e]'}`
                          }
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>Select Time Slot</CardTitle>
                <CardDescription>1-hour sessions available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 max-h-[400px] overflow-y-auto">
                {oneHourSlots.map((slot) => {
                  const isSelected = slot === selectedTime;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`
                        w-full p-3 rounded-lg text-left transition-all border-2
                        ${isSelected 
                          ? 'bg-[#e0e7ff] dark:bg-[#4f46e5]/20 border-[#4f46e5] text-[#4f46e5]' 
                          : `border-[#e5e7eb] dark:border-[#374151] ${dark ? 'hover:border-[#4f46e5]/50' : 'hover:border-[#d1d5db]'}`
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className={`font-medium ${dark && !isSelected ? 'text-[#d1d5db]' : ''}`}>{slot}</span>
                        </div>
                        {isSelected && <Check className="w-5 h-5 text-[#4f46e5]" />}
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Room Selection */}
          <div className="lg:col-span-2">
            <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>Available Rooms</CardTitle>
                <CardDescription>Choose your perfect study space</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockRooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`
                          relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all
                          ${isSelected 
                            ? 'border-[#4f46e5] shadow-lg' 
                            : `${dark ? 'border-[#374151] hover:border-[#4f46e5]/50' : 'border-[#e5e7eb] hover:border-[#d1d5db]'} hover:shadow-md`
                          }
                        `}
                      >
                        <div className="relative h-40">
                          <ImageWithFallback 
                            src={`https://images.unsplash.com/photo-${room.image === 'study-room-quiet' ? '1497366216548-37526070297c' : 
                              room.image === 'meeting-room-modern' ? '1497366754035-f200968a6e72' :
                              room.image === 'outdoor-terrace-study' ? '1519389950473-47ba0277781c' :
                              room.image === 'study-pod-modern' ? '1497366811353-6870744d04b2' :
                              room.image === 'conference-room-large' ? '1497366412874-3415097a27e7' :
                              room.image === 'quiet-workspace' ? '1497015289639-54688650d173' :
                              room.image === 'rooftop-lounge' ? '1522202176988-66273c2fd55f' :
                              '1524758631624-e2822e304c36'}?w=400&h=300&fit=crop`}
                            alt={room.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-3 right-3 w-8 h-8 bg-[#4f46e5] rounded-full flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                          <Badge 
                            className={`absolute top-3 left-3 ${
                              room.status === 'available' 
                                ? 'bg-[#10b981]' 
                                : 'bg-[#ef4444]'
                            }`}
                          >
                            {room.status}
                          </Badge>
                          {room.pricePerHour <= 10 && (
                            <Badge className="absolute bottom-3 left-3 bg-[#8b5cf6]">
                              <Award className="w-3 h-3 mr-1" /> Points eligible
                            </Badge>
                          )}
                        </div>
                        
                        <div className={`p-4 ${dark ? 'bg-[#1f2937]' : ''}`}>
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className={`font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-1`}>{room.name}</h4>
                              <div className={`flex items-center gap-2 text-sm ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                                <Users className="w-4 h-4" />
                                <span>{room.capacity} {room.capacity === 1 ? 'person' : 'people'}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>${room.pricePerHour}</div>
                              <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>per hour</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="outline" className="text-xs capitalize">{room.type}</Badge>
                            {Object.entries(room.features).map(([key, value]) => 
                              value && (
                                <Badge key={key} variant="secondary" className="text-xs flex items-center gap-1">
                                  {getFeatureIcon(key)}
                                  {key === 'pc' ? 'PC' : key === 'ac' ? 'AC' : key.charAt(0).toUpperCase() + key.slice(1)}
                                </Badge>
                              )
                            )}
                          </div>

                          {room.status === 'booked' && room.availableAt && (
                            <div className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} flex items-center gap-1 mt-2`}>
                              <Clock className="w-3 h-3" />
                              Available at {room.availableAt}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
