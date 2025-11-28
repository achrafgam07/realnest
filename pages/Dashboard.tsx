
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { backend } from '../services/backend';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Building, DollarSign, CalendarDays, MoreHorizontal, Clock, ArrowRight, Heart, Plus, Trash2, X, MapPin } from 'lucide-react';
import { Role, Property, Booking, RevenueData, PropertyType } from '../types';

export const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  
  // Local State for Data
  const [properties, setProperties] = useState<Property[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProp, setNewProp] = useState({
    title: '', price: '', address: '', city: '', type: 'APARTMENT', bedrooms: '1', bathrooms: '1'
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [props, books, rev] = await Promise.all([
          backend.getProperties(),
          user ? backend.getBookingsByUser(user.id, user.role) : [],
          backend.getRevenueData()
        ]);
        setProperties(props);
        setBookings(books);
        setRevenueData(rev);
      } catch (e) {
        console.error("Failed to load dashboard data", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, user, navigate]);

  const handleDeleteProperty = async (id: string) => {
    if (confirm('Are you sure you want to delete this property?')) {
      await backend.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const priceCents = parseInt(newProp.price) * 100;
    
    // Create random image for demo
    const randomImgId = Math.floor(Math.random() * 10) + 10;
    
    try {
      const created = await backend.createProperty({
        title: newProp.title,
        description: 'Newly listed property awaiting full description.',
        priceCents,
        currency: 'EUR',
        address: newProp.address,
        city: newProp.city,
        country: 'Demo Country',
        propertyType: newProp.type as PropertyType,
        bedrooms: parseInt(newProp.bedrooms),
        bathrooms: parseInt(newProp.bathrooms),
        areaSqm: 100, // default
        agentName: `${user.firstName} ${user.lastName}`,
        images: [{ 
          id: `new_${Date.now()}`, 
          url: `https://images.unsplash.com/photo-1600596542815-2a4d9f6facb8?auto=format&fit=crop&w=800&q=80`, 
          order: 1 
        }]
      });
      
      setProperties([created, ...properties]);
      setIsAddModalOpen(false);
      setNewProp({ title: '', price: '', address: '', city: '', type: 'APARTMENT', bedrooms: '1', bathrooms: '1' });
    } catch (e) {
      console.error(e);
    }
  };

  if (!isAuthenticated || !user) return null;
  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div></div>;

  const isTenant = user.role === Role.TENANT;
  const isOwner = user.role === Role.OWNER;

  // --- TENANT VIEW ---
  if (isTenant) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">My Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage your bookings and favorites.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Bookings */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary-600" />
              Your Bookings
            </h2>
            
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map(booking => (
                  <div key={booking.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow">
                    <div className="h-32 w-full sm:w-48 bg-slate-100 rounded-xl overflow-hidden flex-shrink-0">
                      {/* We'd normally fetch the property image here, just using placeholder for list */}
                      <img src="https://images.unsplash.com/photo-1512918760532-3ed4659b2132?auto=format&fit=crop&w=400&q=80" alt="Prop" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg text-slate-900">{booking.propertyName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                            ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}
                          `}>
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-slate-500 text-sm mb-4">
                          {booking.startDate} — {booking.endDate}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                        <span className="font-bold text-slate-900 text-lg">${(booking.totalPriceCents/100).toLocaleString()}</span>
                        <button onClick={() => navigate(`/properties/${booking.propertyId}`)} className="text-primary-600 font-medium text-sm hover:text-primary-700 flex items-center gap-1">
                          View Property <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center">
                <CalendarDays className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No bookings yet</h3>
                <p className="text-slate-500 mb-6">Start your journey by finding the perfect property.</p>
                <button onClick={() => navigate('/properties')} className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Browse Properties
                </button>
              </div>
            )}
          </div>

          {/* Sidebar / Favorites */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Saved Properties
            </h2>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
               {properties.slice(0, 2).map(p => (
                 <div key={p.id} className="flex gap-4 items-center group cursor-pointer" onClick={() => navigate(`/properties/${p.id}`)}>
                    <div className="h-16 w-16 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={p.images[0].url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-slate-900 truncate group-hover:text-primary-600 transition-colors">{p.title}</h4>
                      <p className="text-xs text-slate-500 truncate">{p.city}, {p.country}</p>
                    </div>
                 </div>
               ))}
               <button onClick={() => navigate('/properties')} className="w-full py-2 text-sm text-slate-500 hover:text-primary-600 border border-dashed border-slate-300 rounded-lg hover:border-primary-300 transition-colors mt-2">
                 Find more homes
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- AGENT / ADMIN / OWNER VIEW ---
  const totalRevenue = revenueData.reduce((acc, curr) => acc + curr.revenue, 0);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* ADD PROPERTY MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-900">Add New Property</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAddProperty} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Property Title</label>
                <input required value={newProp.title} onChange={e => setNewProp({...newProp, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="e.g. Sunset Villa" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Price (EUR)</label>
                   <input required type="number" value={newProp.price} onChange={e => setNewProp({...newProp, price: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="500000" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                   <select value={newProp.type} onChange={e => setNewProp({...newProp, type: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none bg-white">
                     <option value="APARTMENT">Apartment</option>
                     <option value="VILLA">Villa</option>
                     <option value="COMMERCIAL">Commercial</option>
                     <option value="LAND">Land</option>
                   </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                   <input required value={newProp.city} onChange={e => setNewProp({...newProp, city: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Paris" />
                </div>
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                   <input required value={newProp.address} onChange={e => setNewProp({...newProp, address: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="123 Main St" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Bedrooms</label>
                   <input type="number" value={newProp.bedrooms} onChange={e => setNewProp({...newProp, bedrooms: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-medium text-slate-700 mb-1">Bathrooms</label>
                   <input type="number" value={newProp.bathrooms} onChange={e => setNewProp({...newProp, bathrooms: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-colors mt-4">
                Create Listing
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isOwner ? 'Owner Dashboard' : 'Agency Dashboard'}
          </h1>
          <p className="text-slate-500">Welcome back, {user?.firstName}. Here's what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
            Download Report
          </button>
          {!isOwner && (
            <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 shadow-sm shadow-primary-500/20 flex items-center gap-2">
              <Plus className="h-4 w-4" /> New Listing
            </button>
          )}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
            <div className="p-2.5 bg-green-50 rounded-xl">
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">${totalRevenue.toLocaleString()}</div>
          <p className="text-sm text-green-600 mt-2 flex items-center font-medium">
            +12.5% <span className="text-slate-400 font-normal ml-1">vs last month</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Active Listings</h3>
            <div className="p-2.5 bg-blue-50 rounded-xl">
              <Building className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{properties.length}</div>
          <p className="text-sm text-slate-500 mt-2">
            2 pending approval
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Bookings (YTD)</h3>
            <div className="p-2.5 bg-purple-50 rounded-xl">
              <CalendarDays className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">{bookings.length}</div>
          <p className="text-sm text-purple-600 mt-2 font-medium">
            +8.2% <span className="text-slate-400 font-normal ml-1">vs last year</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-500">Avg. Occupancy</h3>
            <div className="p-2.5 bg-orange-50 rounded-xl">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">84%</div>
          <p className="text-sm text-slate-500 mt-2">
            Top 5% in your area
          </p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-900">Revenue Overview</h3>
             <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 text-slate-600 outline-none">
               <option>Last 6 Months</option>
               <option>This Year</option>
             </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px'}} 
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-lg font-bold text-slate-900">Booking Trends</h3>
             <select className="bg-slate-50 border border-slate-200 text-xs rounded-lg px-2 py-1 text-slate-600 outline-none">
               <option>All Properties</option>
             </select>
          </div>
          <div className="h-80 w-full">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="bookings" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Manage Properties Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Your Properties</h3>
            <button onClick={() => navigate('/properties')} className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <tbody className="divide-y divide-slate-100">
                {properties.map((property) => (
                  <tr key={property.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-lg bg-slate-200 mr-3 overflow-hidden flex-shrink-0">
                          <img src={property.images[0]?.url} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900 line-clamp-1">{property.title}</div>
                          <div className="text-xs text-slate-500">{property.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                      ${(property.priceCents / 100).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                       <button 
                        onClick={() => handleDeleteProperty(property.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors" title="Delete">
                         <Trash2 className="h-4 w-4" />
                       </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900">Recent Bookings</h3>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-slate-900 line-clamp-1">{booking.propertyName}</div>
                      <div className="text-xs text-slate-500">{booking.startDate}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide
                        ${booking.status === 'CONFIRMED' ? 'bg-green-100 text-green-700' : 
                          booking.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
