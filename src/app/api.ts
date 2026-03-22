/// <reference types="vite/client" />
import { mockRooms, mockBookings, mockUsers } from './data/mock-data';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * API Service for Study Space App
 * Attempts to hit the real C# Web API.
 * Gracefully falls back to mock data if the backend is unavailable or not running.
 */
export const ApiService = {
  // Rooms
  getRooms: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, falling back to mock rooms data.', error);
      return mockRooms;
    }
  },

  getRoomById: async (id: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/rooms/${id}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn(`Backend unavailable, falling back to mock room ${id}.`, error);
      return mockRooms.find((r) => r.id === id);
    }
  },

  // Bookings
  getUserBookings: async (userId: string = '1') => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings?userId=${userId}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, falling back to mock bookings.', error);
      return mockBookings.filter(b => b.userId === userId || true); // Fallback shows all for UI testing
    }
  },

  createBooking: async (bookingData: any) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, simulating booking creation.', error);
      return { success: true, fakeId: Math.floor(Math.random() * 1000) };
    }
  },

  // Users
  getCurrentUser: async () => {
    // Usually uses JWT/Bearer token in headers
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, falling back to mock current user.', error);
      return mockUsers[0]; // Student fallback
    }
  }
};
