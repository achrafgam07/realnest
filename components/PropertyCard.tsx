import React from 'react';
import { Property, PropertyStatus } from '../types';
import { BedDouble, Bath, Square, MapPin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (cents: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(cents / 100);
  };

  const getStatusColor = (status: PropertyStatus) => {
    switch (status) {
      case PropertyStatus.AVAILABLE: return 'bg-emerald-500/90 text-white backdrop-blur-md';
      case PropertyStatus.RENTED: return 'bg-blue-500/90 text-white backdrop-blur-md';
      case PropertyStatus.SOLD: return 'bg-rose-500/90 text-white backdrop-blur-md';
      default: return 'bg-slate-800/80 text-white backdrop-blur-md';
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden">
        <Link to={`/properties/${property.id}`}>
          <img 
            src={property.images[0]?.url} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
        
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm ${getStatusColor(property.status)}`}>
            {property.status.replace('_', ' ')}
          </span>
        </div>

        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white transition-colors group/heart">
          <Heart className="h-5 w-5 text-white group-hover/heart:text-rose-500 transition-colors" />
        </button>
        
        <div className="absolute bottom-4 left-4">
           <div className="text-white font-bold text-2xl drop-shadow-md">
            {formatPrice(property.priceCents, property.currency)}
            <span className="text-sm font-medium text-white/90 ml-1 drop-shadow-sm">{property.propertyType === 'COMMERCIAL' ? '/yr' : ''}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <Link to={`/properties/${property.id}`} className="block mb-2">
          <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-primary-600 transition-colors line-clamp-1">{property.title}</h3>
        </Link>
        
        <div className="flex items-start text-slate-500 text-sm mb-4 min-h-[40px]">
          <MapPin className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
          <span className="line-clamp-2">{property.address}, {property.city}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 py-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2">
            <BedDouble className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{property.bedrooms} <span className="text-slate-400 font-normal hidden sm:inline">Beds</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Bath className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{property.bathrooms} <span className="text-slate-400 font-normal hidden sm:inline">Baths</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Square className="h-4 w-4 text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">{property.areaSqm} <span className="text-slate-400 font-normal hidden sm:inline">m²</span></span>
          </div>
        </div>
        
        {/* Agent mini-footer (Optional enhancement) */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="h-6 w-6 rounded-full bg-slate-200 overflow-hidden">
               <img src={`https://ui-avatars.com/api/?name=${property.agentName}&background=random`} alt={property.agentName} className="h-full w-full object-cover" />
             </div>
             <span className="text-xs font-medium text-slate-500">{property.agentName}</span>
           </div>
        </div>
      </div>
    </div>
  );
};