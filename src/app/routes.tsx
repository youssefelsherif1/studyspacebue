import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/landing";
import { AuthPage } from "./pages/auth";
import { StudentDashboard } from "./pages/student-dashboard";
import { InstructorDashboard } from "./pages/instructor-dashboard";
import { AdminPanel } from "./pages/admin-panel";
import { ReceptionistPanel } from "./pages/receptionist-panel";
import { RoomAvailabilityPage } from "./pages/room-availability";
import { PointsRewardsPage } from "./pages/points-rewards";
import { InstructorBookingPage } from "./pages/instructor-booking";
import { PaymentPage } from "./pages/payment";
import { BookingPage } from "./pages/booking";
import { SettingsPage } from "./pages/settings";
import { ProfilePage } from "./pages/profile";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/auth",
    Component: AuthPage,
  },
  {
    path: "/student",
    element: <ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>,
  },
  {
    path: "/instructor",
    element: <ProtectedRoute allowedRoles={['instructor']}><InstructorDashboard /></ProtectedRoute>,
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={['admin']}><AdminPanel /></ProtectedRoute>,
  },
  {
    path: "/receptionist",
    element: <ProtectedRoute allowedRoles={['admin', 'receptionist']}><ReceptionistPanel /></ProtectedRoute>,
  },
  {
    path: "/booking",
    element: <ProtectedRoute allowedRoles={['student', 'admin', 'receptionist']}><BookingPage /></ProtectedRoute>,
  },
  {
    path: "/rooms",
    element: <ProtectedRoute allowedRoles={['student', 'instructor', 'admin', 'receptionist']}><RoomAvailabilityPage /></ProtectedRoute>,
  },
  {
    path: "/rewards",
    element: <ProtectedRoute allowedRoles={['student', 'instructor']}><PointsRewardsPage /></ProtectedRoute>,
  },
  {
    path: "/instructor/booking",
    element: <ProtectedRoute allowedRoles={['instructor']}><InstructorBookingPage /></ProtectedRoute>,
  },
  {
    path: "/payment",
    element: <ProtectedRoute allowedRoles={['student', 'instructor', 'admin', 'receptionist']}><PaymentPage /></ProtectedRoute>,
  },
  {
    path: "/settings",
    element: <ProtectedRoute allowedRoles={['student', 'instructor', 'admin', 'receptionist']}><SettingsPage /></ProtectedRoute>,
  },
  {
    path: "/profile",
    element: <ProtectedRoute allowedRoles={['student', 'instructor', 'admin', 'receptionist']}><ProfilePage /></ProtectedRoute>,
  },
]);
