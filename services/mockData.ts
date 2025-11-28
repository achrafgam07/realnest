import { Property, PropertyStatus, PropertyType, User, Role, Booking, RevenueData } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'u_agent',
    email: 'agent@realnest.com',
    firstName: 'Sarah',
    lastName: 'Connor',
    role: Role.AGENT,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'u_owner',
    email: 'owner@realnest.com',
    firstName: 'Robert',
    lastName: 'Sterling',
    role: Role.OWNER,
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'u_tenant',
    email: 'tenant@realnest.com',
    firstName: 'Emily',
    lastName: 'Chen',
    role: Role.TENANT,
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    id: 'u_admin',
    email: 'admin@realnest.com',
    firstName: 'Marcus',
    lastName: 'Wright',
    role: Role.ADMIN,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

export const MOCK_USER = MOCK_USERS[0]; // Default for fallback

export const MOCK_PROPERTIES: Property[] = [
  {
    id: 'p1',
    title: 'Modern Waterfront Apartment',
    description: 'Stunning 2-bedroom apartment with panoramic ocean views. Features include a modern kitchen, spacious balcony, and access to a private pool. Located in the heart of the marina district, you are steps away from fine dining and entertainment.',
    priceCents: 45000000, // 450k
    currency: 'EUR',
    address: '12 Marina Blvd',
    city: 'Barcelona',
    country: 'Spain',
    propertyType: PropertyType.APARTMENT,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 2,
    bathrooms: 2,
    areaSqm: 95,
    agentName: 'Sarah Connor',
    images: [
      { id: 'i1', url: 'https://images.unsplash.com/photo-1512918760532-3ed4659b2132?auto=format&fit=crop&w=1600&q=80', order: 1 },
      { id: 'i2', url: 'https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&w=1600&q=80', order: 2 },
    ]
  },
  {
    id: 'p2',
    title: 'Luxury Villa in the Hills',
    description: 'Exclusive 5-bedroom villa located in the quiet hills. Large garden, private infinity pool, and smart home integration throughout. Perfect for those seeking privacy and luxury.',
    priceCents: 125000000, // 1.25M
    currency: 'EUR',
    address: '45 Hilltop Rd',
    city: 'Nice',
    country: 'France',
    propertyType: PropertyType.VILLA,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 5,
    bathrooms: 4,
    areaSqm: 350,
    agentName: 'Sarah Connor',
    images: [
      { id: 'i3', url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80', order: 1 },
      { id: 'i4', url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80', order: 2 },
    ]
  },
  {
    id: 'p3',
    title: 'Downtown Commercial Space',
    description: 'Prime location for a retail store or office. High foot traffic area with large display windows. Recently renovated with modern fixtures.',
    priceCents: 320000, 
    currency: 'EUR',
    address: '88 High St',
    city: 'London',
    country: 'UK',
    propertyType: PropertyType.COMMERCIAL,
    status: PropertyStatus.RENTED,
    bedrooms: 0,
    bathrooms: 1,
    areaSqm: 120,
    agentName: 'Marcus Wright',
    images: [
      { id: 'i5', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80', order: 1 },
    ]
  },
  {
    id: 'p4',
    title: 'Cozy City Studio',
    description: 'Perfect for young professionals. Close to metro station and city center. Includes a compact kitchenette and modern bathroom.',
    priceCents: 21000000,
    currency: 'EUR',
    address: '22 Baker St',
    city: 'London',
    country: 'UK',
    propertyType: PropertyType.APARTMENT,
    status: PropertyStatus.UNDER_CONTRACT,
    bedrooms: 1,
    bathrooms: 1,
    areaSqm: 45,
    agentName: 'Sarah Connor',
    images: [
      { id: 'i6', url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80', order: 1 },
    ]
  },
  {
    id: 'p5',
    title: 'Minimalist Modern Home',
    description: 'Architecturally designed home featuring clean lines, open spaces, and abundant natural light. A true masterpiece of modern living.',
    priceCents: 85000000,
    currency: 'EUR',
    address: '101 Design Ave',
    city: 'Berlin',
    country: 'Germany',
    propertyType: PropertyType.VILLA,
    status: PropertyStatus.AVAILABLE,
    bedrooms: 3,
    bathrooms: 3,
    areaSqm: 180,
    agentName: 'Marcus Wright',
    images: [
      { id: 'i7', url: 'https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&w=1600&q=80', order: 1 },
    ]
  },
  {
    id: 'p6',
    title: 'Historic Townhouse',
    description: 'Beautifully preserved townhouse with original features. Located in a historic district with cobblestone streets.',
    priceCents: 62000000,
    currency: 'EUR',
    address: '14 Old Town Sq',
    city: 'Prague',
    country: 'Czech Republic',
    propertyType: PropertyType.APARTMENT,
    status: PropertyStatus.SOLD,
    bedrooms: 4,
    bathrooms: 2,
    areaSqm: 210,
    agentName: 'Robert Sterling',
    images: [
      { id: 'i8', url: 'https://images.unsplash.com/photo-1505577058444-a3dab90d4253?auto=format&fit=crop&w=1600&q=80', order: 1 },
    ]
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    propertyId: 'p1',
    propertyName: 'Modern Waterfront Apartment',
    startDate: '2023-11-10',
    endDate: '2023-11-15',
    status: 'CONFIRMED',
    totalPriceCents: 120000
  },
  {
    id: 'b2',
    propertyId: 'p2',
    propertyName: 'Luxury Villa in the Hills',
    startDate: '2023-12-20',
    endDate: '2023-12-27',
    status: 'PENDING',
    totalPriceCents: 550000
  },
  {
    id: 'b3',
    propertyId: 'p5',
    propertyName: 'Minimalist Modern Home',
    startDate: '2024-01-05',
    endDate: '2024-01-12',
    status: 'CONFIRMED',
    totalPriceCents: 350000
  }
];

export const MOCK_REVENUE: RevenueData[] = [
  { name: 'Jan', revenue: 42000, bookings: 24 },
  { name: 'Feb', revenue: 38000, bookings: 18 },
  { name: 'Mar', revenue: 51000, bookings: 28 },
  { name: 'Apr', revenue: 47000, bookings: 25 },
  { name: 'May', revenue: 62000, bookings: 32 },
  { name: 'Jun', revenue: 75000, bookings: 38 },
  { name: 'Jul', revenue: 84000, bookings: 43 },
  { name: 'Aug', revenue: 81000, bookings: 40 },
  { name: 'Sep', revenue: 68000, bookings: 35 },
];