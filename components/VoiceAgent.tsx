import React, { useState } from 'react';
import { Mic, PhoneCall, CheckCircle, X, Activity } from 'lucide-react';

const VoiceAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'calling' | 'connected' | 'completed'>('idle');

  const initiateCall = () => {
    setStatus('calling');
    setTimeout(() => setStatus('connected'), 2000);
    setTimeout(() => setStatus('completed'), 8000);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:scale-110 transition-transform z-40 group"
      >
        <Mic className="w-6 h-6 text-white group-hover:animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-40 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-slate-800 px-4 py-3 flex justify-between items-center border-b border-slate-700">
        <div className="flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span className="font-semibold text-slate-200 text-sm">AI Voice Agent</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 flex flex-col items-center justify-center min-h-[200px] relative">
        {/* Background Animation */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        
        {status === 'idle' && (
          <div className="text-center z-10">
            <p className="text-slate-400 text-sm mb-4">Proactive Customer Confirmation</p>
            <button 
              onClick={initiateCall}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium text-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              Call Customer
            </button>
          </div>
        )}

        {status === 'calling' && (
          <div className="text-center z-10">
            <div className="w-16 h-16 rounded-full border-2 border-cyan-500/50 flex items-center justify-center mb-3 mx-auto relative">
               <div className="absolute inset-0 rounded-full border-2 border-cyan-500 animate-ping opacity-20"></div>
               <PhoneCall className="w-6 h-6 text-cyan-400" />
            </div>
            <p className="text-cyan-400 text-sm font-medium animate-pulse">Dialing +91 9036...</p>
          </div>
        )}

        {status === 'connected' && (
          <div className="w-full z-10">
            <div className="flex items-center justify-center gap-1 mb-6 h-8">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-1 bg-purple-500 rounded-full animate-music-bar" style={{height: `${Math.random() * 20 + 10}px`, animationDelay: `${i * 0.1}s`}}></div>
               ))}
            </div>
            <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700 text-xs text-slate-300">
              <span className="text-purple-400 font-bold">AI:</span> "Hello Atul, we detected a potential engine anomaly. Can we schedule a checkup for tomorrow at 2 PM?"
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="text-center z-10">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-white font-medium">Service Confirmed</p>
            <p className="text-xs text-slate-400 mt-1">Slot booked: Tomorrow, 14:00</p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-4 text-xs text-cyan-400 hover:underline"
            >
              Start New Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;