import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { ArrowRight, ShieldCheck, Wrench, Zap, Mail, Lock, User, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

type ViewState = 'selection' | 'auth';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [view, setView] = useState<ViewState>('selection');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Clear success message when switching between login/signup or roles
  useEffect(() => {
    setSuccessMessage(null);
  }, [isSignUp, selectedRole, view]);

  const handlePortalClick = (role: UserRole) => {
    setSelectedRole(role);
    setView('auth');
  };

  const handleBack = () => {
    setView('selection');
    setIsSignUp(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      // Simulate account creation
      setIsSignUp(false);
      setSuccessMessage("Account initialized successfully. Please authenticate to continue.");
    } else {
      if (selectedRole) onLogin(selectedRole);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6">
      <div className="max-w-[1000px] w-full min-h-[580px] grid grid-cols-1 md:grid-cols-2 bg-[#0a0f1e] border border-white/5 rounded-[40px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
        
        {/* Left Side - Branding */}
        <div className="p-16 flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-[#1a233a] via-[#0a1125] to-[#020617]">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-[100px]"></div>
          
          <div className="relative z-10">
             <div className="w-20 h-20 bg-gradient-to-br from-[#facc15] to-[#ca8a04] rounded-[24px] flex items-center justify-center shadow-[0_0_40px_rgba(250,204,21,0.25)] mb-10 transition-transform hover:scale-105">
                <Zap className="w-10 h-10 text-slate-900 fill-slate-900" />
             </div>
             
             <h1 className="text-6xl font-extrabold text-white mb-6 tracking-tight font-heading">
                DriveOps
             </h1>
             
             <p className="text-slate-400 text-lg leading-relaxed font-light max-w-sm">
               {view === 'selection' 
                 ? "Agentic AI-based Predictive Maintenance & Proactive Service Scheduling System."
                 : `Accessing the ${selectedRole === 'admin' ? 'OEM Admin' : 'Service Center'} Portal.`
               }
             </p>
             
             <div className="mt-16 flex gap-4">
                <div className="px-5 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-[11px] font-semibold text-cyan-400 uppercase tracking-widest font-sans">
                  AI Powered
                </div>
                <div className="px-5 py-2.5 rounded-full border border-purple-500/30 bg-purple-500/5 text-[11px] font-semibold text-purple-400 uppercase tracking-widest font-sans">
                  Predictive
                </div>
             </div>
          </div>
        </div>

        {/* Right Side - Dynamic Content */}
        <div className="p-16 flex flex-col justify-center bg-[#050a18]">
           
           {view === 'selection' ? (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <h2 className="text-4xl font-semibold text-white mb-4 font-heading">Welcome Back</h2>
                <p className="text-slate-500 text-lg mb-12 font-light">Select your access portal to continue.</p>

                <div className="space-y-6">
                  <button 
                    onClick={() => handlePortalClick('admin')}
                    className="group w-full p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-cyan-500/30 transition-all duration-300 flex items-center justify-between text-left"
                  >
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                           <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div>
                           <h3 className="text-xl font-semibold text-white font-heading">OEM Admin</h3>
                           <p className="text-sm text-slate-500 mt-0.5">Fleet Analytics & Insights</p>
                        </div>
                     </div>
                     <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 transform group-hover:translate-x-1 transition-all duration-300" />
                  </button>

                  <button 
                    onClick={() => handlePortalClick('service')}
                    className="group w-full p-7 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-purple-500/30 transition-all duration-300 flex items-center justify-between text-left"
                  >
                     <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                           <Wrench className="w-7 h-7" />
                        </div>
                        <div>
                           <h3 className="text-xl font-semibold text-white font-heading">Service Center</h3>
                           <p className="text-sm text-slate-500 mt-0.5">Operations & Scheduling</p>
                        </div>
                     </div>
                     <ArrowRight className="w-6 h-6 text-slate-600 group-hover:text-purple-400 transform group-hover:translate-x-1 transition-all duration-300" />
                  </button>
                </div>
             </div>
           ) : (
             <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                <button 
                  onClick={handleBack}
                  className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  <span className="text-[11px] font-bold uppercase tracking-widest font-sans">Back</span>
                </button>

                <h2 className="text-4xl font-semibold text-white mb-2 font-heading tracking-tight">
                  {isSignUp ? 'Create Account' : 'Secure Login'}
                </h2>
                <p className="text-slate-500 text-base mb-6 font-light">
                  {selectedRole === 'admin' ? 'OEM Manufacturer Command' : 'Authorized Service Center Hub'}
                </p>

                {successMessage && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 animate-in zoom-in-95 duration-300">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <p className="text-emerald-400 text-sm font-medium leading-tight">
                      {successMessage}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
                        required
                      />
                    </div>
                  )}
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
                      required
                    />
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 transition-all font-sans"
                      required
                    />
                  </div>

                  <button 
                    type="submit"
                    className={`w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-3 ${
                      selectedRole === 'admin' 
                        ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-cyan-500/20' 
                        : 'bg-purple-500 text-white hover:bg-purple-400 shadow-purple-500/20'
                    }`}
                  >
                    {isSignUp ? 'Complete Registration' : 'Authenticate'}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>

                <div className="mt-8 text-center">
                  <p className="text-slate-500 text-sm font-light">
                    {isSignUp ? 'Already have an account?' : "Don't have an account yet?"}{' '}
                    <button 
                      onClick={() => setIsSignUp(!isSignUp)}
                      className={`font-semibold transition-colors ${selectedRole === 'admin' ? 'text-cyan-400 hover:text-cyan-300' : 'text-purple-400 hover:text-purple-300'}`}
                    >
                      {isSignUp ? 'Login' : 'Sign up'}
                    </button>
                  </p>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default Login;