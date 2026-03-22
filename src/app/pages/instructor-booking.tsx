import { useState } from 'react';
import { useNavigate } from 'react-router';
import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, MapPin, Users, Monitor, Wind, Sparkles, Check, Repeat, BookOpen, AlertTriangle } from 'lucide-react';
import { mockRooms, timeSlots } from '../data/mock-data';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export function InstructorBookingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === 'dark';
  
  const [selectedDate, setSelectedDate] = useState('2026-03-22');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRoom, setSelectedRoom] = useState<typeof mockRooms[0] | null>(null);
  
  const [sessionTitle, setSessionTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(4);
  const [roomType, setRoomType] = useState('any');
  const [recurring, setRecurring] = useState('none');
  const [selectedPlan, setSelectedPlan] = useState('teaching-hours');

  if (!user) return null;

  const plans = [
    { id: 'fixed-weekly', label: 'Fixed Weekly Room' },
    { id: 'teaching-hours', label: 'Teaching Hours Package' },
    { id: 'recurring', label: 'Recurring Booking Plan' },
    { id: 'premium', label: 'Premium Instructor Plan' }
  ];

  // CLASSROOM FILTER: Exclude single-seat rooms (capacity < 2) for instructors
  const classroomRooms = mockRooms.filter(r => 
    r.capacity >= 2 && // Must have at least 2 seats (no pods/single rooms)
    r.capacity >= capacity && 
    (roomType === 'any' || r.type === roomType)
  );

  const handleBooking = () => {
    if (!selectedTime || !selectedRoom || !sessionTitle || !subject) {
      alert('Please fill out all required fields and select a room and time.');
      return;
    }
    if (selectedRoom.capacity < 2) {
      alert('⚠️ Instructors cannot reserve single-seat rooms. Please select a classroom with multiple seats.');
      return;
    }
    navigate('/payment');
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

  const inputClass = `w-full p-2 border rounded-lg focus:outline-none focus:border-[#8b5cf6] ${dark ? 'bg-[#111827] border-[#374151] text-white' : 'border-[#e5e7eb]'}`;

  return (
    <DashboardLayout 
      userRole="instructor" 
      userName={user.name}
      userPoints={user.points}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className={`text-3xl font-bold ${dark ? 'text-white' : 'text-[#1a1a2e]'} mb-2`}>Instructor Booking Portal</h1>
          <p className={dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}>Schedule classroom sessions. Only multi-seat rooms are shown.</p>
        </div>

        {/* Classroom-only notice */}
        <div className={`flex items-center gap-3 p-4 rounded-xl border ${dark ? 'bg-[#f59e0b]/10 border-[#f59e0b]/30' : 'bg-[#fef3c7] border-[#f59e0b]/30'}`}>
          <AlertTriangle className="w-5 h-5 text-[#f59e0b] flex-shrink-0" />
          <p className={`text-sm ${dark ? 'text-[#fbbf24]' : 'text-[#92400e]'}`}>
            <strong>Classroom Policy:</strong> Instructors can only reserve rooms with 2+ seats suitable for student classes. Single-seat pods and quiet zones are not available.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Instructor Form */}
          <div className="lg:col-span-4 space-y-6">
            <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} shadow-sm`}>
              <CardHeader className={`${dark ? 'bg-[#8b5cf6]/10 border-[#374151]' : 'bg-gradient-to-br from-[#8b5cf6]/10 to-[#a78bfa]/10 border-[#e5e7eb]'} border-b`}>
                <CardTitle className={`text-xl ${dark ? 'text-white' : ''}`}>Session Details</CardTitle>
                <CardDescription>Configure your class or study session</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Session Title *</label>
                  <input type="text" className={inputClass} placeholder="e.g. Advanced Data Structures" value={sessionTitle} onChange={e => setSessionTitle(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Subject *</label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-3 w-4 h-4 text-[#6b7280]" />
                    <input type="text" className={`${inputClass} pl-9`} placeholder="e.g. Computer Science" value={subject} onChange={e => setSubject(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Description</label>
                  <textarea className={`${inputClass} h-24`} placeholder="Session agenda..." value={description} onChange={e => setDescription(e.target.value)} />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Minimum Capacity (seats)</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-4 h-4 text-[#6b7280]" />
                    <input type="number" min="2" max="50" className={`${inputClass} pl-9`} value={capacity} onChange={e => setCapacity(Math.max(2, parseInt(e.target.value) || 2))} />
                  </div>
                  <p className={`text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>Minimum 2 seats for classroom use</p>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Preferred Room Type</label>
                  <select className={inputClass} value={roomType} onChange={e => setRoomType(e.target.value)}>
                    <option value="any">Any Configuration</option>
                    <option value="group">Group / Seminar</option>
                    <option value="indoor">Indoor Tech Lab</option>
                    <option value="outdoor">Outdoor Space</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className={`${dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'} shadow-sm`}>
              <CardHeader className={`${dark ? 'bg-[#8b5cf6]/10 border-[#374151]' : 'bg-gradient-to-br from-[#8b5cf6]/10 to-[#a78bfa]/10 border-[#e5e7eb]'} border-b`}>
                <CardTitle className={`text-xl flex items-center gap-2 ${dark ? 'text-white' : ''}`}><Repeat className="w-5 h-5 text-[#8b5cf6]"/> Scheduling & Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Recurring Schedule</label>
                  <select className={inputClass} value={recurring} onChange={e => setRecurring(e.target.value)}>
                    <option value="none">One-time booking</option>
                    <option value="weekly">Weekly</option>
                    <option value="biweekly">Bi-weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>Apply Instructor Plan</label>
                  <div className="space-y-2">
                    {plans.map(plan => (
                      <label key={plan.id} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-all ${
                        selectedPlan === plan.id ? `border-[#8b5cf6] ${dark ? 'bg-[#8b5cf6]/10' : 'bg-[#8b5cf6]/5'}` : `${dark ? 'border-[#374151] hover:border-[#8b5cf6]/50' : 'border-[#e5e7eb] hover:border-[#8b5cf6]/50'}`
                      }`}>
                        <input type="radio" name="plan" value={plan.id} checked={selectedPlan === plan.id} 
                               onChange={() => setSelectedPlan(plan.id)} className="text-[#8b5cf6] focus:ring-[#8b5cf6]" />
                        <span className={`text-sm font-medium ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{plan.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {selectedRoom && selectedTime && sessionTitle && (
              <Button onClick={handleBooking} className="w-full h-14 text-lg bg-gradient-to-r from-[#8b5cf6] to-[#4f46e5] text-white shadow-lg hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </Button>
            )}
          </div>

          {/* Right Column: Selections */}
          <div className="lg:col-span-8 space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
                <CardHeader>
                  <CardTitle className={dark ? 'text-white' : ''}>Date</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 14 }, (_, i) => i + 21).map((day) => {
                      const date = `2026-03-${day.toString().padStart(2, '0')}`;
                      const isSelected = date === selectedDate;
                      return (
                        <button
                          key={day}
                          onClick={() => setSelectedDate(date)}
                          className={`
                            aspect-square rounded-lg text-sm font-medium transition-all
                            ${isSelected ? 'bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] text-white' : `${dark ? 'hover:bg-[#374151] text-[#d1d5db]' : 'hover:bg-[#f3f4f6] text-[#1a1a2e]'}`}
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
                  <CardTitle className={dark ? 'text-white' : ''}>Session Times (2hr Blocks)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 h-[220px] overflow-y-auto pr-2">
                  {timeSlots.map((slot) => {
                    const isSelected = slot === selectedTime;
                    return (
                      <button key={slot} onClick={() => setSelectedTime(slot)}
                        className={`w-full p-3 rounded-lg text-left transition-all border-2 
                          ${isSelected ? `${dark ? 'bg-[#8b5cf6]/10' : 'bg-[#8b5cf6]/10'} border-[#8b5cf6] text-[#8b5cf6]` : `${dark ? 'border-[#374151] hover:border-[#8b5cf6]/50' : 'border-[#e5e7eb] hover:border-[#8b5cf6]/50'}`}
                        `}>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className={`font-medium ${dark && !isSelected ? 'text-[#d1d5db]' : ''}`}>{slot}</span>
                        </div>
                      </button>
                    );
                  })}
                </CardContent>
              </Card>
            </div>

            <Card className={dark ? 'border-[#374151] bg-[#1f2937]' : 'border-[#e5e7eb]'}>
              <CardHeader>
                <CardTitle className={dark ? 'text-white' : ''}>Available Classrooms</CardTitle>
                <CardDescription>Filtered: {capacity}+ seats, multi-seat only (no pods/single rooms)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classroomRooms.map((room) => {
                    const isSelected = selectedRoom?.id === room.id;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`
                          relative rounded-xl border-2 overflow-hidden cursor-pointer transition-all flex flex-col
                          ${isSelected ? 'border-[#8b5cf6] shadow-md transform scale-[1.02]' : `${dark ? 'border-[#374151] hover:border-[#8b5cf6]/50' : 'border-[#e5e7eb] hover:border-[#d1d5db]'}`}
                        `}
                      >
                        <div className="relative h-32">
                          <ImageWithFallback src={`https://images.unsplash.com/photo-${room.image === 'study-room-quiet' ? '1497366216548-37526070297c' : 
                            room.image === 'meeting-room-modern' ? '1497366754035-f200968a6e72' :
                            room.image === 'conference-room-large' ? '1497366412874-3415097a27e7' :
                            '1524758631624-e2822e304c36'}?w=400&h=300&fit=crop`} alt={room.name} className="w-full h-full object-cover"/>
                          {isSelected && (
                            <div className="absolute top-2 right-2 w-6 h-6 bg-[#8b5cf6] rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className={`p-4 flex-1 flex flex-col ${dark ? 'bg-[#1f2937]' : ''}`}>
                          <h4 className={`font-bold text-sm mb-2 ${dark ? 'text-white' : 'text-[#1a1a2e]'}`}>{room.name}</h4>
                          <div className={`flex items-center gap-2 text-xs ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'} mb-3`}>
                            <Users className="w-3 h-3" /> {room.capacity} seats
                          </div>
                          <div className="mt-auto flex justify-between items-end">
                            <Badge variant="outline" className="text-[10px] capitalize">{room.type}</Badge>
                            <span className="font-bold text-[#8b5cf6] text-sm">${room.pricePerHour}/hr</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {classroomRooms.length === 0 && (
                  <div className={`text-center py-10 ${dark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No classrooms match your capacity or type requirements.</p>
                    <p className="text-sm mt-2">Try reducing the minimum capacity.</p>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
