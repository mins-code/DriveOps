import React, { useState } from 'react';
import { Calendar, Users, Wrench, Clock, AlertCircle, Phone, Smartphone, UserCheck, Sliders, Bell, AlertTriangle, CheckCircle2, Info, Loader2, Save } from 'lucide-react';
import { mockServiceRequests, serviceNotifications } from '../constants';
import VoiceAgent from './VoiceAgent';

interface ServiceDashboardProps {
  activeTab: string;
}

const ServiceDashboard: React.FC<ServiceDashboardProps> = ({ activeTab }) => {
  // Functional State for Service Hub Settings
  const [activeVoice, setActiveVoice] = useState('Kore (Friendly)');
  const [autoCallPriority, setAutoCallPriority] = useState(true);
  const [dailyLimit, setDailyLimit] = useState(10);
  const [overbookingBuffer, setOverbookingBuffer] = useState(false);
  const [humanReview, setHumanReview] = useState(true);
  const [followUpSurvey, setFollowUpSurvey] = useState(false);
  
  // Action States
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSuccessMsg("Configuration saved successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
    }, 1200);
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Upcoming', value: '8', icon: Calendar, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Availability', value: '3/10', icon: Wrench, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Staff', value: '12', icon: Users, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Critical', value: '2', icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className="glass p-6 rounded-2xl flex items-center justify-between group">
            <div>
              <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-1 font-heading">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-xl ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-[32px] border border-white/5">
          <h3 className="text-xl font-semibold text-white mb-6 font-heading flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            Today's Shifts
          </h3>
          <div className="space-y-4">
             {['Morning (8AM - 1PM)', 'Afternoon (1PM - 6PM)', 'Evening (6PM - 10PM)'].map((shift, i) => (
               <div key={i} className="flex justify-between items-center p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                 <span className="text-slate-300 text-sm font-medium">{shift}</span>
                 <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${i === 1 ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                   {i === 1 ? 'Peak Load' : 'Normal'}
                 </span>
               </div>
             ))}
          </div>
        </div>

        <div className="glass p-8 rounded-[32px] border border-white/5">
           <h3 className="text-xl font-semibold text-white mb-6 font-heading flex items-center gap-3">
             <AlertCircle className="w-5 h-5 text-red-400" />
             Pending High Priority
           </h3>
           <div className="space-y-3">
              {mockServiceRequests.filter(r => r.priority === 'High').map(req => (
                <div key={req.id} className="p-4 bg-red-500/5 rounded-2xl border border-red-500/10 flex justify-between items-center">
                   <div>
                     <p className="text-white text-sm font-bold">{req.vehicleId}</p>
                     <p className="text-slate-500 text-[11px] uppercase tracking-wider">{req.issue}</p>
                   </div>
                   <span className="text-red-400 font-mono text-[10px]">{req.scheduledTime}</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );

  const renderPipeline = () => (
    <div className="glass p-8 rounded-[32px] shadow-2xl animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-white mb-8 font-heading flex items-center gap-3">
        <Wrench className="w-6 h-6 text-emerald-400" />
        Live Service Pipeline
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-white/[0.02]">
            <tr>
              <th className="px-6 py-4">Job ID</th>
              <th className="px-6 py-4">Vehicle & Owner</th>
              <th className="px-6 py-4">Primary Issue</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockServiceRequests.map((req) => (
              <tr key={req.id} className="hover:bg-white/[0.01] transition-colors">
                <td className="px-6 py-4 font-mono text-[11px] text-slate-500">{req.id}</td>
                <td className="px-6 py-4">
                  <div className="text-white font-semibold">{req.vehicleId}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{req.owner}</div>
                </td>
                <td className="px-6 py-4 text-slate-300 italic font-light text-sm">"{req.issue}"</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    req.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                    req.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                    'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-xs font-bold text-slate-400 hover:text-white transition-colors">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass p-8 rounded-[32px]">
        <h3 className="text-2xl font-bold text-white mb-8 font-heading text-center">Operational Load</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {[
            { name: 'Service Bays', current: 3, total: 10, color: 'bg-emerald-500' },
            { name: 'Diagnostics', current: 1, total: 4, color: 'bg-cyan-500' },
            { name: 'Lead Mechanics', current: 4, total: 6, color: 'bg-purple-500' },
            { name: 'AI Schedulers', current: 2, total: 2, color: 'bg-blue-500' },
          ].map((res) => (
            <div key={res.name} className="p-6 bg-white/[0.02] rounded-3xl border border-white/5">
               <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-4">
                 <span className="text-slate-500">{res.name}</span>
                 <span className="text-white">{res.current} / {res.total}</span>
               </div>
               <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
                 <div className={`${res.color} h-full rounded-full`} style={{width: `${(res.current/res.total)*100}%`}}></div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="glass p-8 rounded-[32px] animate-in fade-in duration-500">
       <h3 className="text-xl font-semibold text-white mb-6 font-heading">Historical Analytics</h3>
       <div className="p-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
          <Clock className="w-12 h-12 text-slate-700 mx-auto mb-4" />
          <p className="text-slate-500 font-medium">Historical data view is currently under maintenance.</p>
       </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
        <Bell className="w-7 h-7 text-purple-400" />
        Service Hub Notifications
      </h3>
      <div className="space-y-4">
        {serviceNotifications.map((notif) => (
          <div key={notif.id} className={`p-6 rounded-3xl border transition-all glass ${notif.read ? 'opacity-70 border-white/5' : 'border-purple-500/20 shadow-lg shadow-purple-500/5'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${
                notif.type === 'alert' ? 'bg-red-500/10 text-red-400' : 
                notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
                'bg-purple-500/10 text-purple-400'
              }`}>
                {notif.type === 'alert' ? <AlertTriangle className="w-5 h-5" /> : 
                 notif.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : 
                 <Info className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-white font-bold">{notif.title}</h4>
                  <span className="text-[10px] text-slate-500 font-mono">{notif.time}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">Service Hub Configuration</h3>
        </div>
        <div className="flex items-center gap-4">
          {successMsg && <span className="text-emerald-400 text-xs animate-in slide-in-from-right-2">{successMsg}</span>}
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {isSaving ? 'Saving...' : 'Apply Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Voice Personalization */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <Phone className="w-4 h-4" /> Voice Agent Personalization
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-white text-sm font-medium">Active Voice Profile</p>
              <select 
                value={activeVoice}
                onChange={(e) => setActiveVoice(e.target.value)}
                className="bg-slate-800 border-none text-[11px] text-slate-300 rounded-lg p-1.5 focus:ring-1 focus:ring-purple-500 outline-none"
              >
                <option>Kore (Friendly)</option>
                <option>Zephyr (Professional)</option>
                <option>Puck (Enthusiastic)</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
               <div>
                 <p className="text-white text-sm font-medium">Auto-Call Priority</p>
                 <p className="text-[10px] text-slate-500">Automate calls for critical detections</p>
               </div>
               <button 
                onClick={() => setAutoCallPriority(!autoCallPriority)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${autoCallPriority ? 'bg-purple-600' : 'bg-slate-700'}`}
               >
                 <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${autoCallPriority ? 'right-0.5' : 'left-0.5 shadow-md'}`}></div>
               </button>
            </div>
          </div>
        </div>

        {/* Slot Capacity */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <Clock className="w-4 h-4" /> Slot Capacity
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
               <p className="text-white text-sm font-medium">Daily Limit (Bays)</p>
               <input 
                type="number" 
                value={dailyLimit} 
                onChange={(e) => setDailyLimit(parseInt(e.target.value) || 0)}
                className="w-16 bg-slate-800 text-slate-100 text-center rounded-lg border border-white/5 py-1 text-sm focus:ring-1 focus:ring-purple-500 outline-none" 
               />
            </div>
            <div className="flex justify-between items-center">
               <p className="text-white text-sm font-medium">Overbooking Buffer</p>
               <button 
                onClick={() => setOverbookingBuffer(!overbookingBuffer)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${overbookingBuffer ? 'bg-purple-600' : 'bg-slate-700'}`}
               >
                 <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${overbookingBuffer ? 'right-0.5' : 'left-0.5 shadow-md'}`}></div>
               </button>
            </div>
          </div>
        </div>

        {/* Omni-channel Sync */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <Smartphone className="w-4 h-4" /> Omni-channel Sync
          </div>
          <div className="space-y-3">
             <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                 <p className="text-white text-xs">WhatsApp API</p>
               </div>
               <span className="text-[10px] text-emerald-400 font-bold uppercase">Linked</span>
             </div>
             <div className="flex items-center justify-between p-2 bg-white/5 rounded-xl border border-white/5">
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-red-400"></div>
                 <p className="text-white text-xs">SMS Gateway</p>
               </div>
               <button className="text-[9px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded text-slate-300 font-bold uppercase transition-colors">Retry</button>
             </div>
          </div>
        </div>

        {/* Agent Preferences */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <UserCheck className="w-4 h-4" /> Agent Preferences
          </div>
          <div className="space-y-3">
             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setHumanReview(!humanReview)}>
               <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${humanReview ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                    {humanReview && <CheckCircle2 className="w-3 h-3 text-white" />}
                 </div>
                 <p className="text-white text-sm">Human review for 'High' priority</p>
               </div>
             </div>
             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setFollowUpSurvey(!followUpSurvey)}>
               <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${followUpSurvey ? 'bg-purple-500 border-purple-500' : 'border-white/20'}`}>
                    {followUpSurvey && <CheckCircle2 className="w-3 h-3 text-white" />}
                 </div>
                 <p className="text-white text-sm">Post-completion survey</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto">
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'pipeline' && renderPipeline()} 
      {activeTab === 'resources' && renderResources()}
      {activeTab === 'history' && renderHistory()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'settings' && renderSettings()}
      <VoiceAgent />
    </div>
  );
};

export default ServiceDashboard;