import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ServiceDashboard from './components/ServiceDashboard';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setActiveTab('overview');
  };

  const handleLogout = () => {
    setRole(null);
  };

  if (!role) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30">
      <Navbar role={role} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar role={role} activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 min-w-0 overflow-y-auto h-[calc(100vh-80px)] p-8">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {role === 'admin' ? (
              <AdminDashboard activeTab={activeTab} />
            ) : (
              <ServiceDashboard activeTab={activeTab} />
            )}
          </div>
        </main>
      </div>
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px] opacity-30"></div>
      </div>
    </div>
  );
};

export default App;