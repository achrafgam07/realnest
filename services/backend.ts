
import { MOCK_USERS, MOCK_PROPERTIES, MOCK_BOOKINGS, MOCK_REVENUE } from './mockData';
import { User, Property, Booking, Role, PropertyStatus, PropertyType, RevenueData } from '../types';

// Keys for localStorage
const STORAGE_KEYS = {
  USERS: 'realnest_users',
  PROPERTIES: 'realnest_properties',
  BOOKINGS: 'realnest_bookings',
  SESSION: 'realnest_session'
};

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class BackendService {
  private users: User[];
  private properties: Property[];
  private bookings: Booking[];
  private revenue: RevenueData[];

  constructor() {
    this.users = this.load(STORAGE_KEYS.USERS, MOCK_USERS);
    this.properties = this.load(STORAGE_KEYS.PROPERTIES, MOCK_PROPERTIES);
    this.bookings = this.load(STORAGE_KEYS.BOOKINGS, MOCK_BOOKINGS);
    this.revenue = MOCK_REVENUE; // Static for now
  }

  private load<T>(key: string, defaultData: T): T {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    localStorage.setItem(key, JSON.stringify(defaultData));
    return defaultData;
  }

  private save(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // --- AUTH ---

  async login(email: string): Promise<User> {
    await delay(600);
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('User not found');
    
    // Simulate session
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
    return user;
  }

  async logout(): Promise<void> {
    await delay(200);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  }

  async getCurrentUser(): Promise<User | null> {
    await delay(100);
    const stored = localStorage.getItem(STORAGE_KEYS.SESSION);
    return stored ? JSON.parse(stored) : null;
  }

  // --- PROPERTIES ---

  async getProperties(filters?: { query?: string; type?: string }): Promise<Property[]> {
    await delay(400);
    let result = [...this.properties];

    if (filters?.query) {
      const q = filters.query.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q)
      );
    }

    if (filters?.type && filters.type !== 'ALL') {
      result = result.filter(p => p.propertyType === filters.type);
    }

    return result;
  }

  async getPropertyById(id: string): Promise<Property | undefined> {
    await delay(300);
    return this.properties.find(p => p.id === id);
  }

  async createProperty(property: Omit<Property, 'id' | 'status'>): Promise<Property> {
    await delay(800);
    const newProperty: Property = {
      ...property,
      id: `p_${Date.now()}`,
      status: PropertyStatus.AVAILABLE,
    };
    this.properties.unshift(newProperty);
    this.save(STORAGE_KEYS.PROPERTIES, this.properties);
    return newProperty;
  }

  async deleteProperty(id: string): Promise<void> {
    await delay(500);
    this.properties = this.properties.filter(p => p.id !== id);
    this.save(STORAGE_KEYS.PROPERTIES, this.properties);
  }

  // --- BOOKINGS ---

  async getBookingsByUser(userId: string, role: Role): Promise<Booking[]> {
    await delay(500);
    if (role === Role.TENANT) {
      // Tenants see their own bookings (we don't have userId on booking model in mock, assuming ownership logic for demo)
      // For demo purposes, we will return ALL bookings if it's the specific mock tenant, or filter if we had userId on bookings
      // Let's add a hack: random bookings assigned to current user for demo consistency if not present
      return this.bookings; 
    } else {
      // Agents/Admins see all
      return this.bookings;
    }
  }

  async createBooking(booking: Omit<Booking, 'id' | 'status'>): Promise<Booking> {
    await delay(800);
    const newBooking: Booking = {
      ...booking,
      id: `b_${Date.now()}`,
      status: 'PENDING'
    };
    this.bookings.unshift(newBooking);
    this.save(STORAGE_KEYS.BOOKINGS, this.bookings);
    return newBooking;
  }

  // --- METRICS ---
  
  async getRevenueData(): Promise<RevenueData[]> {
    await delay(300);
    return this.revenue;
  }
}

export const backend = new BackendService();
