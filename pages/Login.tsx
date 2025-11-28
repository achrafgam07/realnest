import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { Building2, Loader2, User, Key, Shield, Home } from 'lucide-react';
import { MOCK_USERS } from '../services/mockData';
import { Role } from '../types';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    await login(email);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = async (role: Role) => {
    const demoUser = MOCK_USERS.find(u => u.role === role);
    if (demoUser) {
      setEmail(demoUser.email);
      setIsLoading(true);
      await login(demoUser.email);
      setIsLoading(false);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="inline-flex bg-primary-600 p-3 rounded-2xl shadow-xl shadow-primary-500/20 mb-6">
              <Building2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-500">Sign in to your RealNest account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required 
                />
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-slate-700">Password</label>
                  <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Forgot password?</button>
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30 flex justify-center items-center active:scale-[0.98]"
            >
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Sign In'}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or try a demo account</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => handleDemoLogin(Role.AGENT)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-200 hover:text-primary-700 transition-all group"
            >
              <User className="h-5 w-5 text-slate-400 group-hover:text-primary-500 mb-1" />
              <span className="text-xs font-medium">Agent</span>
            </button>
            <button 
              onClick={() => handleDemoLogin(Role.OWNER)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-200 hover:text-primary-700 transition-all group"
            >
              <Key className="h-5 w-5 text-slate-400 group-hover:text-primary-500 mb-1" />
              <span className="text-xs font-medium">Owner</span>
            </button>
            <button 
              onClick={() => handleDemoLogin(Role.TENANT)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-200 hover:text-primary-700 transition-all group"
            >
              <Home className="h-5 w-5 text-slate-400 group-hover:text-primary-500 mb-1" />
              <span className="text-xs font-medium">Tenant</span>
            </button>
            <button 
              onClick={() => handleDemoLogin(Role.ADMIN)}
              className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-primary-200 hover:text-primary-700 transition-all group"
            >
              <Shield className="h-5 w-5 text-slate-400 group-hover:text-primary-500 mb-1" />
              <span className="text-xs font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Info */}
      <div className="hidden md:block flex-1 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <img 
             src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80" 
             alt="Apartment" 
             className="w-full h-full object-cover"
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-12 text-white z-10">
          <h2 className="text-4xl font-bold mb-4 leading-tight">Manage your properties<br/>with confidence.</h2>
          <p className="text-lg text-slate-300 max-w-md">
            Join thousands of real estate professionals who trust RealNest for their property management needs.
          </p>
        </div>
      </div>
    </div>
  );
};