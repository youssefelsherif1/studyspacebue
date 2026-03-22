import { DashboardLayout } from '../components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  DollarSign, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { statsData, mockBookings, mockUsers, mockRooms, mockSubscriptions } from '../data/mock-data';

const revenueData = [
  { name: 'Mon', revenue: 1200 },
  { name: 'Tue', revenue: 1900 },
  { name: 'Wed', revenue: 1600 },
  { name: 'Thu', revenue: 2200 },
  { name: 'Fri', revenue: 2800 },
  { name: 'Sat', revenue: 2400 },
  { name: 'Sun', revenue: 2100 },
];

const bookingsData = [
  { name: 'Week 1', bookings: 45 },
  { name: 'Week 2', bookings: 52 },
  { name: 'Week 3', bookings: 48 },
  { name: 'Week 4', bookings: 61 },
];

const roomTypeData = [
  { name: 'Quiet Pods', value: 35, color: '#4f46e5' },
  { name: 'Group Rooms', value: 45, color: '#8b5cf6' },
  { name: 'Outdoor', value: 12, color: '#10b981' },
  { name: 'Conference', value: 8, color: '#f59e0b' },
];

export function AdminPanel() {
  const adminUser = { name: 'Admin User', points: 0 };

  return (
    <DashboardLayout 
      userRole="admin" 
      userName={adminUser.name}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">Admin Dashboard</h1>
            <p className="text-[#6b7280]">Complete overview of your study space operations</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline">
              Export Report
            </Button>
            <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
              <Plus className="w-4 h-4 mr-2" />
              Add Room
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#6b7280]">Today's Revenue</CardTitle>
                <DollarSign className="w-4 h-4 text-[#6b7280]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#1a1a2e]">${statsData.todayRevenue}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    <span className="text-xs text-[#10b981]">+12.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#6b7280]">Monthly Revenue</CardTitle>
                <DollarSign className="w-4 h-4 text-[#6b7280]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#1a1a2e]">${statsData.monthlyRevenue.toLocaleString()}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    <span className="text-xs text-[#10b981]">+8.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#6b7280]">Active Bookings</CardTitle>
                <Calendar className="w-4 h-4 text-[#6b7280]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#1a1a2e]">{statsData.activeBookings}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-[#6b7280]">Right now</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-[#6b7280]">Total Users</CardTitle>
                <Users className="w-4 h-4 text-[#6b7280]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-3xl font-bold text-[#1a1a2e]">{statsData.totalUsers}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-4 h-4 text-[#10b981]" />
                    <span className="text-xs text-[#10b981]">+24 this week</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Available Rooms</p>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{statsData.availableRooms}</p>
                </div>
                <MapPin className="w-8 h-8 text-[#4f46e5]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Subscriptions</p>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{statsData.totalSubscriptions}</p>
                </div>
                <Calendar className="w-8 h-8 text-[#8b5cf6]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Points Redeemed</p>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{statsData.pointsUsed}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#10b981]" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb]">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#6b7280] mb-1">Unpaid Bookings</p>
                  <p className="text-2xl font-bold text-[#1a1a2e]">{statsData.unpaidBookings}</p>
                </div>
                <DollarSign className="w-8 h-8 text-[#10b981]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Last 7 days performance</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle>Booking Trends</CardTitle>
              <CardDescription>Weekly bookings this month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bookingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="bookings" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Room Type Distribution */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-[#e5e7eb]">
            <CardHeader>
              <CardTitle>Room Type Usage</CardTitle>
              <CardDescription>Distribution by type</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {roomTypeData.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-[#6b7280]">{item.name}</span>
                    </div>
                    <span className="font-semibold text-[#1a1a2e]">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e5e7eb] md:col-span-2">
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
              <CardDescription>Key performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">Occupancy Rate</span>
                    <span className="text-lg font-bold text-[#1a1a2e]">78%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">Avg. Booking Duration</span>
                    <span className="text-lg font-bold text-[#1a1a2e]">2.5h</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">Peak Hours</span>
                    <span className="text-lg font-bold text-[#1a1a2e]">2-6 PM</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">Customer Satisfaction</span>
                    <span className="text-lg font-bold text-[#10b981]">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">No-Show Rate</span>
                    <span className="text-lg font-bold text-[#ef4444]">2.1%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-[#f9fafb] rounded-lg">
                    <span className="text-sm text-[#6b7280]">Revenue/Room</span>
                    <span className="text-lg font-bold text-[#1a1a2e]">$425</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables */}
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="users">Recent Users</TabsTrigger>
            <TabsTrigger value="rooms">Room Management</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="border-[#e5e7eb]">
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest booking transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Time Slot</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono text-sm">{booking.id}</TableCell>
                        <TableCell>{booking.userName}</TableCell>
                        <TableCell>{booking.roomName}</TableCell>
                        <TableCell className="text-sm text-[#6b7280]">{booking.timeSlot}</TableCell>
                        <TableCell className="font-semibold">${booking.amount}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            className={
                              booking.status === 'confirmed' ? 'bg-[#10b981]' :
                              booking.status === 'completed' ? 'bg-[#6b7280]' :
                              'bg-[#f59e0b]'
                            }
                          >
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-[#e5e7eb]">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly registered members</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Points</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-[#6b7280]">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{user.role}</Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-[#4f46e5]">{user.points} pts</TableCell>
                        <TableCell className="text-sm text-[#6b7280]">{user.joinedDate}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rooms">
            <Card className="border-[#e5e7eb]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Room Management</CardTitle>
                    <CardDescription>Manage all study spaces</CardDescription>
                  </div>
                  <Button className="bg-gradient-to-r from-[#4f46e5] to-[#8b5cf6]">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Room
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price/Hour</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRooms.slice(0, 6).map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">{room.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{room.type}</Badge>
                        </TableCell>
                        <TableCell>{room.capacity} people</TableCell>
                        <TableCell className="font-semibold">${room.pricePerHour}/hr</TableCell>
                        <TableCell>
                          <Badge 
                            variant={room.status === 'available' ? 'default' : 'secondary'}
                            className={room.status === 'available' ? 'bg-[#10b981]' : 'bg-[#ef4444]'}
                          >
                            {room.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4 text-[#4f46e5]" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4 text-[#ef4444]" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
