
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CMS from './components/CMS';
import TaskBoard from './components/TaskBoard';
import SecurityHub from './components/SecurityHub';
import Community from './components/Community';
import Settings from './components/Settings';
import { Search, Bell, User, ChevronDown, ShieldCheck, ShieldAlert, Lock, ArrowLeft } from 'lucide-react';
import { UserRole } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentUserRole, setCurrentUserRole] = useState<UserRole>(UserRole.ADMIN);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const AccessDenied = ({ requiredRole }: { requiredRole: string }) => (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
      <div className="relative">
        <div className="w-24 h-24 bg-rose-500/10 rounded-3xl flex items-center justify-center text-rose-500 border border-rose-500/20 rotate-12">
          <Lock size={48} />
        </div>
        <ShieldAlert size={24} className="absolute -bottom-2 -right-2 text-rose-500 bg-slate-950 rounded-full" />
      </div>
      <div className="space-y-2">
        <h2 className="text-3xl font-black tracking-tighter text-white">ACCESS DENIED</h2>
        <p className="text-slate-400 max-w-sm mx-auto leading-relaxed">
          The requested module requires <span className="text-rose-500 font-bold">{requiredRole}</span> level clearance. 
          Please contact system administration for privilege escalation.
        </p>
      </div>
      <button 
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center space-x-2 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all font-bold"
      >
        <ArrowLeft size={18} />
        <span>Return to Dashboard</span>
      </button>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'cms': return <CMS userRole={currentUserRole} />;
      case 'tasks': return <TaskBoard userRole={currentUserRole} />;
      case 'community': return <Community userRole={currentUserRole} />;
      case 'scanner': 
        if (currentUserRole !== UserRole.ADMIN) return <AccessDenied requiredRole="ADMIN" />;
        return <SecurityHub />;
      case 'settings': 
        if (currentUserRole !== UserRole.ADMIN) return <AccessDenied requiredRole="ADMIN" />;
        return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} userRole={currentUserRole} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-8 sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md py-4">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search assets, logs, or users..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-rose-500 rounded-full border border-slate-950 animate-ping"></span>
            </button>
            <div className="h-6 w-[1px] bg-slate-800 mx-1"></div>
            
            <div className="relative">
              <div 
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center space-x-3 cursor-pointer group hover:bg-slate-900 p-1.5 pr-3 rounded-xl transition-all border border-transparent hover:border-slate-800"
              >
                <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center overflow-hidden shadow-lg group-hover:border-blue-500/30 transition-colors">
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                    <User className="text-white" size={20} />
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black group-hover:text-blue-400 transition-colors leading-none">Rex Commander</p>
                  <div className="flex items-center justify-end space-x-1 mt-1">
                    <p className={`text-[9px] uppercase font-black tracking-widest ${
                      currentUserRole === UserRole.ADMIN ? 'text-rose-500' : 
                      currentUserRole === UserRole.EDITOR ? 'text-emerald-500' : 'text-slate-500'
                    }`}>
                      {currentUserRole}
                    </p>
                    <ChevronDown size={10} className="text-slate-600 group-hover:text-blue-500 transition-colors" />
                  </div>
                </div>
              </div>

              {showRoleDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowRoleDropdown(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-2 mb-1">
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Select Clearance</p>
                    </div>
                    {[UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER].map((role) => (
                      <button
                        key={role}
                        onClick={() => {
                          setCurrentUserRole(role);
                          setShowRoleDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-slate-800 transition-all ${
                          currentUserRole === role ? 'text-blue-400 bg-blue-500/5' : 'text-slate-400'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                           <div className={`w-1.5 h-1.5 rounded-full ${
                             role === UserRole.ADMIN ? 'bg-rose-500' : 
                             role === UserRole.EDITOR ? 'bg-emerald-500' : 'bg-slate-500'
                           }`}></div>
                           <span className="font-bold">{role}</span>
                        </div>
                        {currentUserRole === role && <ShieldCheck size={16} className="text-blue-500" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="pb-24">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
