import React, { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { AlertTriangle, TrendingUp, Activity, Wrench, ShieldAlert, Cpu, Sliders, Database, BellRing, ShieldCheck, Bell, Info, CheckCircle2, Loader2, FileText, List } from 'lucide-react';
import { demandForecastData, failureDistributionData, manufacturingFeedback, heatmapData, mockAlerts, adminNotifications } from '../constants';

const COLORS = ['#0ea5e9', '#d946ef', '#eab308', '#22c55e'];

interface AdminDashboardProps {
  activeTab: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ activeTab }) => {
  // Functional State for Settings
  const [sensitivity, setSensitivity] = useState(65);
  const [autoRca, setAutoRca] = useState(true);
  const [telemetryFreq, setTelemetryFreq] = useState('Real-time (50ms)');
  const [edgeSync, setEdgeSync] = useState(false);
  const [criticalEscalation, setCriticalEscalation] = useState(true);
  const [fleetSummary, setFleetSummary] = useState(false);
  
  // Action States
  const [isGeneratingAudit, setIsGeneratingAudit] = useState(false);
  const [isViewingLogs, setIsViewingLogs] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleGenerateAudit = () => {
    setIsGeneratingAudit(true);
    setTimeout(() => {
      setIsGeneratingAudit(false);
      triggerFeedback("Compliance audit report generated and sent to your email.");
    }, 2000);
  };

  const handleViewLogs = () => {
    setIsViewingLogs(true);
    setTimeout(() => {
      setIsViewingLogs(false);
      triggerFeedback("Access logs exported to the downloads folder.");
    }, 1500);
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Alerts', value: '24', icon: AlertTriangle, color: 'text-red-500', glow: 'shadow-red-500/10' },
          { label: 'Avg Fleet Health', value: '92%', icon: Activity, color: 'text-emerald-500', glow: 'shadow-emerald-500/10' },
          { label: 'Predicted Failures', value: '12', icon: TrendingUp, color: 'text-yellow-500', glow: 'shadow-yellow-500/10' },
          { label: 'RCA Insights', value: '8 New', icon: Cpu, color: 'text-purple-500', glow: 'shadow-purple-500/10' },
        ].map((stat, idx) => (
          <div key={idx} className={`glass p-6 rounded-[24px] flex items-center justify-between shadow-xl ${stat.glow}`}>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-bold text-white mt-2 font-heading tracking-tight">{stat.value}</h3>
            </div>
            <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/5`}>
              <stat.icon className={`w-7 h-7 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass p-8 rounded-[32px] shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-8 font-heading flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Demand Forecast
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={demandForecastData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="value2" stroke="#f97316" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass p-8 rounded-[32px] shadow-2xl">
          <h3 className="text-xl font-semibold text-white mb-8 font-heading text-center">Failure Taxonomy</h3>
          <div className="h-[300px] flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={failureDistributionData} innerRadius={60} outerRadius={80} dataKey="value" stroke="none">
                  {failureDistributionData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 w-full mt-4">
               {failureDistributionData.map((e, i) => (
                 <div key={i} className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-400 p-2 bg-white/[0.02] rounded-lg">
                   <div className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></div>
                   {e.name}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="glass p-8 rounded-[40px]">
        <h3 className="text-2xl font-bold text-white mb-10 font-heading">Component Vulnerability Matrix</h3>
        <div className="space-y-4">
          {heatmapData.map((row) => (
            <div key={row.component} className="grid grid-cols-4 gap-4 items-center">
               <div className="text-slate-400 text-sm font-semibold">{row.component}</div>
               {[row.low, row.med, row.high].map((val, i) => (
                 <div key={i} className={`h-16 rounded-2xl flex items-center justify-center text-sm font-bold border border-white/5 ${
                   val < 3 ? 'bg-emerald-500/10 text-emerald-400' : val < 6 ? 'bg-yellow-500/10 text-yellow-400' : 'bg-red-500/10 text-red-400'
                 }`}>{val} Score</div>
               ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="glass p-8 rounded-[32px] shadow-2xl animate-in fade-in duration-500">
      <h3 className="text-xl font-semibold text-white mb-8 flex items-center gap-3 font-heading">
        <ShieldAlert className="w-6 h-6 text-red-500" />
        Fleet Priority Alerts
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-[10px] text-slate-500 uppercase tracking-widest font-bold bg-white/[0.02]">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Component</th>
              <th className="px-6 py-4">Severity</th>
              <th className="px-6 py-4">Prediction</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {mockAlerts.map((alert) => (
              <tr key={alert.id} className="hover:bg-white/[0.01]">
                <td className="px-6 py-4 font-semibold text-white">{alert.vehicleId}</td>
                <td className="px-6 py-4 text-slate-400">{alert.component}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    alert.severity === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'
                  }`}>
                    {alert.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-cyan-400 italic">"{alert.prediction}"</td>
                <td className="px-6 py-4">
                  <button className="text-cyan-400 hover:text-white text-xs underline">Notify Agent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderManufacturing = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h3 className="text-2xl font-bold text-white mb-4 font-heading">OEM Feedback Loop</h3>
      <div className="grid grid-cols-1 gap-6">
        {manufacturingFeedback.map((fb) => (
          <div key={fb.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all group">
             <div className="flex justify-between items-start mb-4">
                <span className="text-purple-400 font-bold text-lg">{fb.component}</span>
                <span className="text-slate-600 font-mono text-[11px]">{fb.id}</span>
             </div>
             <div className="space-y-2">
               <p className="text-slate-300 text-sm leading-relaxed"><span className="text-slate-500 font-medium">Root Cause:</span> {fb.rootCause}</p>
               <p className="text-slate-300 text-sm leading-relaxed"><span className="text-slate-500 font-medium">Resolution:</span> {fb.actionRequired}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
        <Bell className="w-7 h-7 text-cyan-400" />
        System Notifications
      </h3>
      <div className="space-y-4">
        {adminNotifications.map((notif) => (
          <div key={notif.id} className={`p-6 rounded-3xl border transition-all glass ${notif.read ? 'opacity-70 border-white/5' : 'border-cyan-500/20 shadow-lg shadow-cyan-500/5'}`}>
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-2xl ${
                notif.type === 'alert' ? 'bg-red-500/10 text-red-400' : 
                notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 
                'bg-blue-500/10 text-blue-400'
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
          <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
            <Sliders className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-heading">Command Center Settings</h3>
        </div>
        {successMsg && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-4 py-2 rounded-lg animate-in fade-in slide-in-from-right-2">
            {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Configuration */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <Cpu className="w-4 h-4" /> AI Configuration
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-white text-sm font-medium">Model Sensitivity</p>
                <span className="text-xs font-mono text-cyan-400">{sensitivity}%</span>
              </div>
              <input 
                type="range" 
                value={sensitivity}
                onChange={(e) => setSensitivity(parseInt(e.target.value))}
                className="accent-cyan-400 w-full bg-slate-800 rounded-lg appearance-none h-1.5" 
              />
            </div>
            <div className="flex justify-between items-center">
               <div>
                  <p className="text-white text-sm font-medium">Auto-RCA Generation</p>
                  <p className="text-[10px] text-slate-500">Enable automatic Root Cause Analysis</p>
               </div>
               <button 
                onClick={() => setAutoRca(!autoRca)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${autoRca ? 'bg-cyan-600' : 'bg-slate-700'}`}
               >
                 <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${autoRca ? 'right-0.5' : 'left-0.5 shadow-md'}`}></div>
               </button>
            </div>
          </div>
        </div>

        {/* Data Stream */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <Database className="w-4 h-4" /> Data Stream
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-white text-sm font-medium">Telemetry Frequency</p>
              <select 
                value={telemetryFreq}
                onChange={(e) => setTelemetryFreq(e.target.value)}
                className="bg-slate-800 border-none text-[11px] text-slate-300 rounded-lg p-1.5 focus:ring-1 focus:ring-cyan-500 outline-none"
              >
                <option>Real-time (50ms)</option>
                <option>Periodic (5s)</option>
                <option>Batch (1m)</option>
              </select>
            </div>
            <div className="flex justify-between items-center">
               <p className="text-white text-sm font-medium">Edge Compute Sync</p>
               <button 
                onClick={() => setEdgeSync(!edgeSync)}
                className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${edgeSync ? 'bg-cyan-600' : 'bg-slate-700'}`}
               >
                 <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${edgeSync ? 'right-0.5' : 'left-0.5 shadow-md'}`}></div>
               </button>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <BellRing className="w-4 h-4" /> Notifications
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setCriticalEscalation(!criticalEscalation)}>
               <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${criticalEscalation ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
                    {criticalEscalation && <CheckCircle2 className="w-3 h-3 text-slate-900" />}
                 </div>
                 <p className="text-white text-sm">Critical Alert Escalation</p>
               </div>
             </div>
             <div className="flex items-center justify-between group cursor-pointer" onClick={() => setFleetSummary(!fleetSummary)}>
               <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${fleetSummary ? 'bg-cyan-500 border-cyan-500' : 'border-white/20'}`}>
                    {fleetSummary && <CheckCircle2 className="w-3 h-3 text-slate-900" />}
                 </div>
                 <p className="text-white text-sm">Weekly Fleet Summary</p>
               </div>
             </div>
          </div>
        </div>

        {/* Governance */}
        <div className="glass p-6 rounded-3xl space-y-6 border border-white/5">
          <div className="flex items-center gap-3 text-slate-400 font-semibold text-sm border-b border-white/5 pb-4">
            <ShieldCheck className="w-4 h-4" /> Governance
          </div>
          <div className="space-y-3">
             <button 
              onClick={handleGenerateAudit}
              disabled={isGeneratingAudit}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {isGeneratingAudit ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <FileText className="w-4 h-4" />}
               {isGeneratingAudit ? 'Compiling Report...' : 'Generate Compliance Audit'}
             </button>
             <button 
              onClick={handleViewLogs}
              disabled={isViewingLogs}
              className="w-full py-3 bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
             >
               {isViewingLogs ? <Loader2 className="w-4 h-4 animate-spin text-cyan-400" /> : <List className="w-4 h-4" />}
               {isViewingLogs ? 'Exporting...' : 'View Access Logs'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'analytics' && renderAnalytics()}
      {activeTab === 'alerts' && renderAlerts()}
      {activeTab === 'manufacturing' && renderManufacturing()}
      {activeTab === 'notifications' && renderNotifications()}
      {activeTab === 'settings' && renderSettings()}
    </div>
  );
};

export default AdminDashboard;