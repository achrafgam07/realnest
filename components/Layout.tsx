import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, LayoutDashboard, Search, Menu, X, LogOut, User as UserIcon, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200 supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="bg-primary-600 p-2 rounded-xl group-hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20">
              <Building2 className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">RealNest</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/properties" 
              className={`text-sm font-medium transition-colors hover:text-primary-600 ${isActive('/properties') ? 'text-primary-600' : 'text-slate-600'}`}
            >
              Browse Properties
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${isActive('/dashboard') ? 'text-primary-600' : 'text-slate-600'}`}
              >
                Dashboard
              </Link>
            )}
            
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Resources</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors">Contact</a>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="text-right hidden lg:block">
                     <p className="text-sm font-bold text-slate-900 leading-none">{user?.firstName} {user?.lastName}</p>
                     <p className="text-xs text-slate-500 mt-0.5 font-medium uppercase tracking-wide">{user?.role}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                    <img src={user?.avatarUrl} alt="User" className="h-full w-full object-cover" />
                  </div>
                </div>
                <button 
                  onClick={() => logout()}
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                 <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-primary-600 px-3 py-2">
                  Log in
                </Link>
                <Link to="/login" className="text-sm font-semibold bg-primary-600 text-white px-5 py-2.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <Link to="/properties" className="block text-base font-medium text-slate-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                Properties
              </Link>
              {isAuthenticated && (
                <Link to="/dashboard" className="block text-base font-medium text-slate-600 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
               <div className="pt-4 border-t border-slate-100">
                {isAuthenticated ? (
                   <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                       <img src={user?.avatarUrl} alt="" className="h-8 w-8 rounded-full" />
                       <span className="font-bold text-slate-900">{user?.firstName}</span>
                     </div>
                     <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="text-sm text-red-600 font-medium">
                       Logout
                     </button>
                   </div>
                ) : (
                   <div className="grid gap-3">
                     <Link to="/login" className="w-full text-center py-3 rounded-xl border border-slate-200 font-bold text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>
                       Log in
                     </Link>
                     <Link to="/login" className="w-full text-center py-3 rounded-xl bg-primary-600 text-white font-bold" onClick={() => setIsMobileMenuOpen(false)}>
                       Get Started
                     </Link>
                   </div>
                )}
               </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <div className="bg-primary-600 p-1.5 rounded-lg">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">RealNest</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Modern real estate management for the digital age. Empowering agencies and owners since 2024.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Platform</h4>
            <ul className="space-y-3 text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Listing Management</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Tenant Portal</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Agent CRM</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Analytics</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Company</h4>
            <ul className="space-y-3 text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-3 text-slate-500">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-400">
          <div>© 2024 RealNest Inc. All rights reserved.</div>
          <div className="flex gap-6 mt-4 md:mt-0">
             <a href="#" className="hover:text-slate-600">Twitter</a>
             <a href="#" className="hover:text-slate-600">LinkedIn</a>
             <a href="#" className="hover:text-slate-600">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};