
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Shield, AlertCircle, CheckCircle, Activity, Globe, Database } from 'lucide-react';

const data = [
  { name: 'Mon', threats: 12, blocked: 40 },
  { name: 'Tue', threats: 19, blocked: 45 },
  { name: 'Wed', threats: 3, blocked: 30 },
  { name: 'Thu', threats: 25, blocked: 55 },
  { name: 'Fri', threats: 15, blocked: 48 },
  { name: 'Sat', threats: 10, blocked: 35 },
  { name: 'Sun', threats: 8, blocked: 32 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-bold">Security Overview</h1>
        <p className="text-slate-400">Real-time surveillance and system metrics.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Active Threats', value: '24', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
          { label: 'Total Scans', value: '1,284', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'System Health', value: '98.2%', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Global Nodes', value: '142', icon: Globe, color: 'text-violet-500', bg: 'bg-violet-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live</span>
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Shield className="text-blue-500" size={20} />
            <span>Threat Detection History</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="blocked" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBlocked)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-semibold mb-6 flex items-center space-x-2">
            <Database className="text-emerald-500" size={20} />
            <span>Resource Usage</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Bar dataKey="threats" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
