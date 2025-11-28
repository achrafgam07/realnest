import React from 'react';
import { Link } from 'react-router-dom';
import { PropertyCard } from '../components/PropertyCard';
import { MOCK_PROPERTIES } from '../services/mockData';
import { ArrowRight, ShieldCheck, Zap, Globe, Star, PlayCircle } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Modern building" 
             className="w-full h-full object-cover opacity-30 scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-900/50 border border-primary-700 text-primary-300 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              #1 Real Estate Management Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight tracking-tight">
              Find your place <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
                in the world.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Seamlessly manage listings, bookings, and tenants. The all-in-one solution for modern real estate agencies and property owners.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/properties" className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white rounded-xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/30 hover:shadow-primary-600/50 hover:-translate-y-0.5">
                Browse Properties
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all">
                <PlayCircle className="mr-2 h-5 w-5" />
                View Demo
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-slate-400 text-sm font-medium">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-slate-900 bg-slate-700 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center text-yellow-400 mb-0.5">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Strip */}
      <div className="border-b border-slate-100 bg-white">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider mb-6">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Simple SVG logos placeholders */}
            <div className="h-8 font-bold text-xl text-slate-800 flex items-center gap-2"><div className="h-6 w-6 bg-slate-800 rounded"></div> ACME Corp</div>
            <div className="h-8 font-bold text-xl text-slate-800 flex items-center gap-2"><div className="h-6 w-6 bg-slate-800 rounded-full"></div> GlobalStay</div>
            <div className="h-8 font-bold text-xl text-slate-800 flex items-center gap-2"><div className="h-6 w-6 bg-slate-800 rotate-45 rounded"></div> UrbanLiving</div>
            <div className="h-8 font-bold text-xl text-slate-800 flex items-center gap-2"><div className="h-6 w-6 bg-slate-800 rounded-tr-xl"></div> Skyline</div>
          </div>
        </div>
      </div>

      {/* Stats/Features */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything you need to manage real estate</h2>
          <p className="text-slate-500 text-lg">Powerful tools built for efficiency and growth.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Verified Listings</h3>
            <p className="text-slate-500 leading-relaxed">Every property is rigorously vetted by our compliance team to ensure maximum quality and authenticity for tenants.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
            <div className="h-14 w-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Booking</h3>
            <p className="text-slate-500 leading-relaxed">Streamline the leasing process. Tenants can book viewings or sign digital contracts instantly through our secure platform.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow group">
            <div className="h-14 w-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Global Reach</h3>
            <p className="text-slate-500 leading-relaxed">Access a worldwide marketplace. We handle currency conversion and multi-language support automatically.</p>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="bg-slate-50/50 py-24 border-y border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Properties</h2>
              <p className="text-slate-500">Handpicked selection of premier properties.</p>
            </div>
            <Link to="/properties" className="hidden md:flex group items-center text-primary-600 font-bold hover:text-primary-700 bg-white px-6 py-3 rounded-xl shadow-sm border border-slate-200 transition-all hover:shadow-md">
              View all listings
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MOCK_PROPERTIES.slice(0, 4).map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/properties" className="inline-flex items-center text-primary-600 font-bold hover:text-primary-700">
              View all listings
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-24">
        <div className="bg-primary-600 rounded-3xl p-8 md:p-20 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-80 h-80 bg-blue-400 rounded-full opacity-50 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Ready to list your property?</h2>
            <p className="text-primary-100 mb-10 text-lg leading-relaxed">
              Join thousands of owners who trust RealNest to manage their real estate portfolio. 
              Get started today and see the difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary-600 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-colors shadow-xl shadow-primary-700/20 text-lg">
                Become a Host
              </button>
              <button className="bg-primary-700 border border-primary-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-800 transition-colors text-lg">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};