
import React from 'react';
import { Settings as SettingsIcon, Save, RefreshCcw, ShieldCheck, Database, BellRing } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Configuration</h1>
          <p className="text-slate-400">Manage global security protocols and infrastructure parameters.</p>
        </div>
        <button className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-bold shadow-lg shadow-blue-900/20 active:scale-95">
          <Save size={18} />
          <span>Apply Changes</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <ShieldCheck className="text-blue-500" size={20} />
            <h3 className="font-bold">Encryption & Auth</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Force MFA for all Users', enabled: true },
              { label: 'Rotate API Keys Monthly', enabled: false },
              { label: 'Enable AES-256 for Docs', enabled: true },
            ].map((toggle, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{toggle.label}</span>
                <div className={`w-10 h-5 rounded-full p-1 cursor-pointer transition-colors ${toggle.enabled ? 'bg-blue-600' : 'bg-slate-800'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${toggle.enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <Database className="text-emerald-500" size={20} />
            <h3 className="font-bold">Storage & Logs</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Retention Period</label>
              <select className="w-full bg-[#020617] border border-slate-800 rounded-lg p-2 text-sm text-slate-300 focus:outline-none focus:border-blue-500 transition-colors">
                <option>30 Days (Standard)</option>
                <option>90 Days (Extended)</option>
                <option>1 Year (Compliant)</option>
              </select>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
              <RefreshCcw size={16} className="text-blue-400" />
              <p className="text-xs text-blue-400 font-medium">Auto-backup active. Last sync: 12m ago.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center space-x-3 mb-6">
          <BellRing className="text-amber-500" size={20} />
          <h3 className="font-bold">Alert Routing</h3>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-slate-400">Critical system failures and security breaches will be routed to the primary NOC terminal.</p>
          <div className="flex flex-wrap gap-2">
            {['Email', 'Slack', 'Terminal Pipe', 'SMS'].map(m => (
              <span key={m} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-bold text-slate-300 border border-slate-700">{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
