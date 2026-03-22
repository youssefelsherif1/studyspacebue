export interface Room {
  id: string;
  name: string;
  type: 'quiet' | 'group' | 'outdoor' | 'indoor' | 'pod';
  capacity: number;
  features: {
    whiteboard: boolean;
    pc: boolean;
    monitor: boolean;
    ac: boolean;
  };
  status: 'available' | 'booked';
  availableAt?: string;
  image: string;
  pricePerHour: number;
}

export interface Booking {
  id: string;
  roomId: string;
  roomName: string;
  userId: string;
  userName: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled' | 'no-show';
  paid: boolean;
  amount: number;
  qrCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'instructor' | 'admin' | 'receptionist';
  points: number;
  avatar: string;
  joinedDate: string;
}

export interface Subscription {
  id: string;
  instructorId: string;
  instructorName: string;
  roomId: string;
  roomName: string;
  schedule: string;
  timeSlot: string;
  status: 'active' | 'expired';
  amount: number;
}



export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  type: 'free-hours' | 'coffee' | 'drinks' | 'discount';
  icon: string;
}

export const mockRooms: Room[] = [
  {
    id: '1',
    name: 'Focus Room A',
    type: 'quiet',
    capacity: 1,
    features: {
      whiteboard: false,
      pc: true,
      monitor: true,
      ac: true,
    },
    status: 'available',
    image: 'study-room-quiet',
    pricePerHour: 250,
  },
  {
    id: '2',
    name: 'Collaboration Space B',
    type: 'group',
    capacity: 6,
    features: {
      whiteboard: true,
      pc: true,
      monitor: true,
      ac: true,
    },
    status: 'booked',
    availableAt: '6:00 PM',
    image: 'meeting-room-modern',
    pricePerHour: 750,
  },
  {
    id: '3',
    name: 'Garden Terrace',
    type: 'outdoor',
    capacity: 4,
    features: {
      whiteboard: false,
      pc: false,
      monitor: false,
      ac: false,
    },
    status: 'available',
    image: 'outdoor-terrace-study',
    pricePerHour: 400,
  },
  {
    id: '4',
    name: 'Study Pod 1',
    type: 'pod',
    capacity: 1,
    features: {
      whiteboard: false,
      pc: false,
      monitor: true,
      ac: true,
    },
    status: 'available',
    image: 'study-pod-modern',
    pricePerHour: 300,
  },
  {
    id: '5',
    name: 'Conference Room C',
    type: 'group',
    capacity: 10,
    features: {
      whiteboard: true,
      pc: true,
      monitor: true,
      ac: true,
    },
    status: 'available',
    image: 'conference-room-large',
    pricePerHour: 1000,
  },
  {
    id: '6',
    name: 'Silent Zone',
    type: 'quiet',
    capacity: 1,
    features: {
      whiteboard: false,
      pc: true,
      monitor: false,
      ac: true,
    },
    status: 'booked',
    availableAt: '4:30 PM',
    image: 'quiet-workspace',
    pricePerHour: 250,
  },
  {
    id: '7',
    name: 'Rooftop Lounge',
    type: 'outdoor',
    capacity: 8,
    features: {
      whiteboard: false,
      pc: false,
      monitor: false,
      ac: false,
    },
    status: 'available',
    image: 'rooftop-lounge',
    pricePerHour: 600,
  },
  {
    id: '8',
    name: 'Tech Lab D',
    type: 'indoor',
    capacity: 4,
    features: {
      whiteboard: true,
      pc: true,
      monitor: true,
      ac: true,
    },
    status: 'available',
    image: 'tech-lab-modern',
    pricePerHour: 900,
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'b2',
    roomId: '1',
    roomName: 'Focus Room A',
    userId: 'u2',
    userName: 'Michael Chen',
    date: '2026-03-21',
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'completed',
    paid: true,
    amount: 500,
  },
  {
    id: 'b3',
    roomId: '6',
    roomName: 'Silent Zone',
    userId: 'u3',
    userName: 'Emily Davis',
    date: '2026-03-21',
    timeSlot: '1:00 PM - 4:30 PM',
    status: 'confirmed',
    paid: true,
    amount: 875,
    qrCode: 'QR-B3-2026',
  },
  {
    id: 'b4',
    roomId: '3',
    roomName: 'Garden Terrace',
    userId: 'u4',
    userName: 'James Wilson',
    date: '2026-03-22',
    timeSlot: '3:00 PM - 5:00 PM',
    status: 'confirmed',
    paid: true,
    amount: 800,
    qrCode: 'QR-B4-2026',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u2',
    name: 'Michael Chen',
    email: 'michael.c@example.com',
    role: 'instructor',
    points: 580,
    avatar: 'man-asian-professional',
    joinedDate: '2024-06-20',
  },
  {
    id: 'u3',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    role: 'student',
    points: 120,
    avatar: 'woman-student',
    joinedDate: '2026-01-10',
  },
  {
    id: 'u4',
    name: 'James Wilson',
    email: 'james.w@example.com',
    role: 'student',
    points: 340,
    avatar: 'man-student',
    joinedDate: '2025-11-05',
  },
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 's1',
    instructorId: 'u2',
    instructorName: 'Michael Chen',
    roomId: '2',
    roomName: 'Collaboration Space B',
    schedule: 'Every Sunday',
    timeSlot: '5:00 PM - 8:00 PM',
    status: 'active',
    amount: 1500,
  },
  {
    id: 's2',
    instructorId: 'u2',
    instructorName: 'Michael Chen',
    roomId: '5',
    roomName: 'Conference Room C',
    schedule: 'Every Wednesday',
    timeSlot: '6:00 PM - 9:00 PM',
    status: 'active',
    amount: 2500,
  },
];



export const mockRewards: Reward[] = [
  {
    id: 'r1',
    title: '1 Free Hour',
    description: 'Redeem for 1 hour of free study space',
    pointsRequired: 100,
    type: 'free-hours',
    icon: 'clock',
  },
  {
    id: 'r2',
    title: 'Free Coffee',
    description: 'Get a complimentary coffee',
    pointsRequired: 50,
    type: 'coffee',
    icon: 'coffee',
  },
  {
    id: 'r3',
    title: 'Free Drink',
    description: 'Any drink from our cafe',
    pointsRequired: 30,
    type: 'drinks',
    icon: 'droplet',
  },
  {
    id: 'r4',
    title: '20% Discount',
    description: 'Get 20% off your next booking',
    pointsRequired: 150,
    type: 'discount',
    icon: 'percent',
  },
  {
    id: 'r5',
    title: '3 Free Hours',
    description: 'Redeem for 3 hours of free study space',
    pointsRequired: 250,
    type: 'free-hours',
    icon: 'clock',
  },
  {
    id: 'r6',
    title: '50% Discount',
    description: 'Get 50% off your next booking',
    pointsRequired: 400,
    type: 'discount',
    icon: 'percent',
  },
];

export const timeSlots = [
  '8:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 2:00 PM',
  '2:00 PM - 4:00 PM',
  '4:00 PM - 6:00 PM',
  '6:00 PM - 8:00 PM',
  '8:00 PM - 10:00 PM',
];

export const statsData = {
  todayRevenue: 1245,
  monthlyRevenue: 18650,
  activeBookings: 12,
  availableRooms: 5,
  totalUsers: 234,
  totalSubscriptions: 8,
  pointsUsed: 1520,
  unpaidBookings: 0,
};
