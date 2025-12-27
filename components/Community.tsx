
import React from 'react';
import { Users, MessageSquare, Heart, Share2, Award, ShieldCheck, Flag } from 'lucide-react';
import { UserRole } from '../types';

interface CommunityProps {
  userRole: UserRole;
}

const Community: React.FC<CommunityProps> = ({ userRole }) => {
  const isAdmin = userRole === UserRole.ADMIN;

  const posts = [
    { 
      author: 'CyberSentinel', 
      role: 'CORE TEAM', 
      content: 'Just patched a major SQL injection vector in the authentication middleware. Everyone, please update your local environments.', 
      likes: 42, 
      comments: 12,
      time: '2h ago'
    },
    { 
      author: 'HexHunter', 
      role: 'MEMBER', 
      content: 'Anyone has resources for learning advanced heap spray techniques? Exploring binary exploitation lately.', 
      likes: 15, 
      comments: 24,
      time: '5h ago'
    },
    { 
      author: 'ZeroDayRex', 
      role: 'ADMIN', 
      content: 'Weekly security briefing starting in 1 hour. We will be discussing the latest CVEs in Webkit.', 
      likes: 89, 
      comments: 5,
      time: '8h ago'
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-3">
            <Users className="text-blue-500" size={32} />
            <span>Community Nexus</span>
          </h1>
          <p className="text-slate-400">Collaborate with fellow security researchers and share intel.</p>
        </div>
        {isAdmin && (
          <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl text-rose-500 text-[10px] font-black uppercase tracking-widest flex items-center space-x-2">
            <Flag size={14} />
            <span>Mod Tools Active</span>
          </div>
        )}
      </header>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-colors">
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-center font-bold text-blue-400">
                    {post.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-bold text-white">{post.author}</h4>
                      {post.role === 'ADMIN' && <ShieldCheck size={14} className="text-rose-500" />}
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">{post.role}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{post.time}</span>
              </div>
              
              <p className="text-slate-300 leading-relaxed">{post.content}</p>
              
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <button className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors">
                    <Heart size={18} />
                    <span className="text-sm font-bold">{post.likes}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors">
                    <MessageSquare size={18} />
                    <span className="text-sm font-bold">{post.comments}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors">
                    <Share2 size={18} />
                  </button>
                </div>
                {isAdmin && (
                  <button className="text-slate-600 hover:text-rose-500 transition-colors p-1" title="Moderate Post">
                    <Flag size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
