export enum Role {
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  OWNER = 'OWNER',
  TENANT = 'TENANT'
}

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  VILLA = 'VILLA',
  LAND = 'LAND',
  COMMERCIAL = 'COMMERCIAL'
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  RESERVED = 'RESERVED',
  UNDER_CONTRACT = 'UNDER_CONTRACT',
  SOLD = 'SOLD',
  RENTED = 'RENTED'
}

export interface User {
  id: string;
  email: string;
  role: Role;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  order: number;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  currency: string;
  address: string;
  city: string;
  country: string;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  areaSqm: number;
  images: PropertyImage[];
  agentName: string; // Simplification for UI
}

export interface Booking {
  id: string;
  propertyId: string;
  propertyName: string;
  startDate: string;
  endDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalPriceCents: number;
}

export interface Metric {
  name: string;
  value: number;
  change?: number; // percentage
}

export interface RevenueData {
  name: string;
  revenue: number;
  bookings: number;
}
