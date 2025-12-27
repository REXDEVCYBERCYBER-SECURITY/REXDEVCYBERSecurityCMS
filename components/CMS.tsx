
import React, { useState, useEffect } from 'react';
import { Save, Sparkles, Eye, EyeOff, Loader2, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react';
import { getAIWritingAssistant } from '../services/geminiService';
import { UserRole } from '../types';

interface CMSProps {
  userRole: UserRole;
}

const CMS: React.FC<CMSProps> = ({ userRole }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [eyeCareMode, setEyeCareMode] = useState(false);
  const [isAiProcessing, setIsAiProcessing] = useState(false);

  const canEdit = userRole === UserRole.ADMIN || userRole === UserRole.EDITOR;

  useEffect(() => {
    if (!canEdit) return;
    const timer = setInterval(() => {
      if (content || title) {
        autoSave();
      }
    }, 30000);
    return () => clearInterval(timer);
  }, [content, title, canEdit]);

  const autoSave = () => {
    if (!canEdit) return;
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date());
    }, 800);
  };

  const handleAiImprovement = async () => {
    if (!content || !canEdit) return;
    setIsAiProcessing(true);
    const improved = await getAIWritingAssistant(content);
    if (improved) {
      setContent(improved);
    }
    setIsAiProcessing(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500">
      {!canEdit && (
        <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 px-5 py-3 rounded-2xl flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <Lock size={18} />
            <div>
              <p className="font-bold text-sm">Read-Only Mode</p>
              <p className="text-xs opacity-70">Elevate your clearance level to edit this document.</p>
            </div>
          </div>
          <AlertCircle size={20} className="opacity-40" />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-blue-500">
            <FileText size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">Document Editor</h1>
            <div className="flex items-center space-x-3 mt-0.5">
               {isSaving ? (
                <span className="text-[10px] uppercase font-black text-blue-400 flex items-center space-x-1 tracking-widest">
                  <Loader2 size={10} className="animate-spin" />
                  <span>Auto-saving</span>
                </span>
              ) : lastSaved ? (
                <span className="text-[10px] uppercase font-black text-slate-500 flex items-center space-x-1 tracking-widest">
                  <CheckCircle2 size={10} className="text-emerald-500" />
                  <span>Synced {lastSaved.toLocaleTimeString()}</span>
                </span>
              ) : (
                <span className="text-[10px] uppercase font-black text-slate-500 tracking-widest">Working Draft</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setEyeCareMode(!eyeCareMode)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 transition-all active:scale-95"
            title="Toggle Eye-Care Mode"
          >
            {eyeCareMode ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          
          {canEdit && (
            <>
              <button 
                onClick={handleAiImprovement}
                disabled={isAiProcessing || !content}
                className="flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl transition-all font-bold shadow-lg shadow-indigo-900/20 active:scale-95"
              >
                {isAiProcessing ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                <span>AI Polish</span>
              </button>
              <button 
                onClick={autoSave}
                className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20 active:scale-95"
              >
                <Save size={18} />
                <span>Save</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className={`rounded-3xl border transition-all duration-500 shadow-2xl overflow-hidden ${
        eyeCareMode 
          ? 'bg-[#1a1c18] border-[#2e312b] text-[#c7c8c4]' 
          : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <input
          type="text"
          value={title}
          readOnly={!canEdit}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Intelligence Report ID..."
          className={`w-full p-8 text-3xl font-black bg-transparent border-b focus:outline-none tracking-tight ${
            eyeCareMode ? 'border-[#2e312b] placeholder-[#5d6057]' : 'border-slate-800 placeholder-slate-700'
          } ${!canEdit ? 'cursor-default' : ''}`}
        />
        <textarea
          value={content}
          readOnly={!canEdit}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Secure terminal input initialized. Begin transmission..."
          className={`w-full min-h-[550px] p-8 bg-transparent focus:outline-none resize-none leading-relaxed text-lg font-medium ${
            eyeCareMode ? 'placeholder-[#5d6057]' : 'placeholder-slate-700'
          } ${!canEdit ? 'cursor-default scrollbar-hide' : ''}`}
        />
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4 flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
        <div className="flex space-x-6">
          <span className="flex items-center space-x-2">
            <span className="text-slate-700">Words:</span>
            <span className="text-slate-300">{content.trim() ? content.trim().split(/\s+/).length : 0}</span>
          </span>
          <span className="flex items-center space-x-2">
            <span className="text-slate-700">Chars:</span>
            <span className="text-slate-300">{content.length}</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-emerald-500">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            <span>Encrypted Node</span>
          </div>
          <div className="w-[1px] h-3 bg-slate-800"></div>
          <span className="text-slate-600">v2.4.0-STABLE</span>
        </div>
      </div>
    </div>
  );
};

export default CMS;
