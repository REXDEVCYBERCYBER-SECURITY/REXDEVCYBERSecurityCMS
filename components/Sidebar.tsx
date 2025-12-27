
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Kanban, 
  ShieldAlert, 
  Users, 
  Settings, 
  Terminal, 
  Lock,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview', roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER] },
    { id: 'cms', icon: FileText, label: 'Drafting Room', roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER] },
    { id: 'tasks', icon: Kanban, label: 'Ops Board', roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER] },
    { id: 'scanner', icon: ShieldAlert, label: 'Security Hub', roles: [UserRole.ADMIN] },
    { id: 'community', icon: Users, label: 'Community', roles: [UserRole.ADMIN, UserRole.EDITOR, UserRole.VIEWER] },
    { id: 'settings', icon: Settings, label: 'System Config', roles: [UserRole.ADMIN] },
  ];

  const getRoleColor = (role: UserRole) => {
    switch(role) {
      case UserRole.ADMIN: return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      case UserRole.EDITOR: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col fixed left-0 top-0 z-50">
      <div className="p-8 flex items-center space-x-3">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
          <Terminal className="text-white w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-black text-lg tracking-tighter text-white leading-none">REXDEV</span>
          <span className="text-[10px] text-blue-500 font-bold tracking-[0.2em] uppercase">Security</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1">
        <p className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Command Center</p>
        {menuItems.map((item) => {
          const hasAccess = item.roles.includes(userRole);
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => hasAccess && setActiveTab(item.id)}
              disabled={!hasAccess}
              className={`w-full group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 relative ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/30' 
                  : hasAccess 
                    ? 'text-slate-400 hover:bg-slate-800 hover:text-white'
                    : 'text-slate-600 opacity-60 cursor-not-allowed grayscale'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon size={18} className={`${isActive ? 'text-white' : hasAccess ? 'text-slate-500 group-hover:text-blue-400' : 'text-slate-700'} transition-colors`} />
                <span className={`text-sm font-semibold tracking-tight ${isActive ? 'text-white' : 'text-inherit'}`}>{item.label}</span>
              </div>
              
              {!hasAccess ? (
                <Lock size={12} className="text-slate-700" />
              ) : isActive ? (
                <ChevronRight size={14} className="text-blue-300" />
              ) : null}
            </button>
          );
        })}
      </nav>
      
      <div className="p-4 mt-auto">
        <div className={`p-4 rounded-2xl border ${getRoleColor(userRole)} transition-all duration-500`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] uppercase font-black tracking-widest opacity-70">Active Identity</p>
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              userRole === UserRole.ADMIN ? 'bg-rose-500' : 
              userRole === UserRole.EDITOR ? 'bg-emerald-500' : 'bg-slate-400'
            }`}></div>
          </div>
          <p className="text-sm font-black tracking-tight mb-1">{userRole}</p>
          <p className="text-[10px] opacity-60 font-medium">Session ID: REX-{Math.floor(Math.random() * 9000) + 1000}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
