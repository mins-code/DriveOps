import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  AlertCircle, 
  Settings, 
  Wrench, 
  Users, 
  History, 
  Zap,
  ShieldCheck,
  ClipboardList,
  Bell
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab }) => {
  const adminLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Fleet Analytics', icon: BarChart3 },
    { id: 'alerts', label: 'Active Alerts', icon: AlertCircle },
    { id: 'manufacturing', label: 'OEM Feedback', icon: Zap },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const serviceLinks = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Service Pipeline', icon: ClipboardList },
    { id: 'resources', label: 'Resource Load', icon: Users },
    { id: 'history', label: 'Service History', icon: History },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const links = role === 'admin' ? adminLinks : serviceLinks;

  return (
    <aside className="w-72 h-[calc(100vh-80px)] bg-[#020617]/50 backdrop-blur-xl border-r border-white/5 flex flex-col py-8 sticky top-20 left-0 shrink-0">
      <div className="px-6 mb-10">
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${role === 'admin' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
            {role === 'admin' ? <ShieldCheck className="w-5 h-5" /> : <Wrench className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-sans">Current Role</p>
            <p className="text-sm font-semibold text-white font-heading">
              {role === 'admin' ? 'OEM Executive' : 'Service Manager'}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/[0.05] text-white' 
                  : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              <div className="flex items-center gap-3">
                <link.icon className={`w-5 h-5 transition-colors ${
                  isActive 
                    ? (role === 'admin' ? 'text-cyan-400' : 'text-purple-400') 
                    : 'group-hover:text-slate-200'
                }`} />
                <span className="text-sm font-medium">{link.label}</span>
              </div>
              {isActive && <div className={`w-1 h-4 rounded-full ${role === 'admin' ? 'bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]'}`}></div>}
            </button>
          );
        })}
      </nav>

      <div className="px-4 mt-auto">
        <button 
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group ${
            activeTab === 'settings' 
              ? 'bg-white/[0.05] text-white' 
              : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
          }`}
        >
          <Settings className={`w-5 h-5 transition-transform ${activeTab === 'settings' ? (role === 'admin' ? 'text-cyan-400' : 'text-purple-400') : 'group-hover:rotate-45'}`} />
          <span className="text-sm font-medium">System Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;