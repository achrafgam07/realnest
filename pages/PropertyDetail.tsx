
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { backend } from '../services/backend';
import { MapPin, BedDouble, Bath, Square, Calendar, CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { Property } from '../types';

export const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuthStore();
  
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookingDate, setBookingDate] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const p = await backend.getPropertyById(id);
          setProperty(p || null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleBook = async () => {
    if (!property || !bookingDate) return;
    setBookingStatus('loading');
    
    // Calculate end date (dummy +7 days)
    const start = new Date(bookingDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 7);

    try {
      await backend.createBooking({
        propertyId: property.id,
        propertyName: property.title,
        startDate: bookingDate,
        endDate: end.toISOString().split('T')[0],
        totalPriceCents: property.priceCents // 1 week = price for now (simplified)
      });
      setBookingStatus('success');
    } catch (e) {
      console.error(e);
      setBookingStatus('idle');
    }
  };

  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-primary-600"/></div>;
  }

  if (!property) {
    return <div className="p-10 text-center">Property not found <Link to="/properties" className="text-primary-600 underline">Go Back</Link></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link to="/properties" className="hover:text-primary-600 flex items-center gap-1"><ArrowLeft className="h-4 w-4"/> Back to listings</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-sm border border-gray-100">
              <img 
                src={property.images[activeImage]?.url} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            {property.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {property.images.map((img, idx) => (
                  <button 
                    key={img.id}
                    onClick={() => setActiveImage(idx)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImage ? 'border-primary-500 ring-2 ring-primary-200' : 'border-transparent opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-500 font-medium">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  {property.address}, {property.city}, {property.country}
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-bold text-primary-600">
                   {formatPrice(property.priceCents, property.currency)}
                </div>
                <div className="text-sm text-gray-500 uppercase tracking-wide font-medium mt-1">
                  {property.status}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-6 bg-white rounded-xl border border-gray-200 mb-8 shadow-sm">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-primary-50 p-2.5 rounded-full text-primary-600">
                  <BedDouble className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{property.bedrooms}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Bedrooms</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 border-l border-gray-100">
                <div className="bg-primary-50 p-2.5 rounded-full text-primary-600">
                  <Bath className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{property.bathrooms}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Bathrooms</div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 border-l border-gray-100">
                <div className="bg-primary-50 p-2.5 rounded-full text-primary-600">
                  <Square className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-lg">{property.areaSqm}</div>
                  <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Sq Meters</div>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Description</h3>
            <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed mb-8">
              <p>{property.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            
            {/* Agent Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Listing Agent</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden border border-gray-100">
                   <img src={`https://ui-avatars.com/api/?name=${property.agentName}&background=random`} className="h-full w-full object-cover" alt="Agent"/>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{property.agentName}</div>
                  <div className="text-sm text-gray-500">Senior Real Estate Agent</div>
                </div>
              </div>
              <button className="w-full py-2.5 px-4 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors mb-2">
                Contact Agent
              </button>
            </div>

            {/* Booking Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Schedule a Visit</h3>
              
              {!isAuthenticated ? (
                <div className="text-center py-6">
                  <p className="text-gray-600 mb-4 text-sm">Please log in to book a viewing.</p>
                  <Link to="/login" className="block w-full py-2.5 bg-primary-600 text-white rounded-lg text-center hover:bg-primary-700 font-bold transition-colors">
                    Log In
                  </Link>
                </div>
              ) : bookingStatus === 'success' ? (
                <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
                  <div className="bg-green-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-800 text-lg mb-1">Request Sent!</h4>
                  <p className="text-green-600 text-sm mb-4">You can view your booking in your dashboard.</p>
                  <Link to="/dashboard" className="text-primary-600 font-bold text-sm hover:underline">
                    Go to Dashboard
                  </Link>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleBook(); }} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input 
                        type="date" 
                        required 
                        min={new Date().toISOString().split('T')[0]}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50/50" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <select className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-gray-50/50">
                      <option>09:00 AM</option>
                      <option>11:00 AM</option>
                      <option>02:00 PM</option>
                      <option>04:00 PM</option>
                    </select>
                  </div>
                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={bookingStatus === 'loading' || !bookingDate}
                      className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                    >
                      {bookingStatus === 'loading' ? <Loader2 className="animate-spin h-5 w-5" /> : 'Request Viewing'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
