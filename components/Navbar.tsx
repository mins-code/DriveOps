import React from 'react';
import { LogOut, Zap } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  role: UserRole;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ role, onLogout }) => {
  return (
    <nav className="w-full h-20 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-10 sticky top-0 z-50">
      <div className="flex items-center gap-4 group cursor-pointer">
        <div className="w-12 h-12 bg-gradient-to-br from-[#facc15] to-[#ca8a04] rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/20 transition-transform group-hover:scale-105">
          <Zap className="text-slate-900 w-7 h-7 fill-slate-900" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tighter font-heading">
            DriveOps
          </h1>
          <p className="text-[10px] text-slate-500 font-semibold mt-1 uppercase tracking-[0.2em] font-sans">
            {role === 'admin' ? 'OEM Command Center' : 'Service Hub'}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <button 
          onClick={onLogout}
          className="flex items-center gap-2.5 text-sm font-semibold text-slate-400 hover:text-red-400 transition-colors group px-4 py-2 rounded-lg hover:bg-red-500/5"
        >
          <LogOut className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;