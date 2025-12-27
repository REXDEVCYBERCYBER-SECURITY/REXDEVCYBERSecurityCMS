
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  Loader2, 
  AlertTriangle, 
  ShieldCheck, 
  Code, 
  ArrowRight, 
  Zap, 
  Info, 
  Wrench, 
  Copy, 
  CheckCircle2,
  AlertOctagon,
  Activity,
  Terminal,
  ShieldQuestion,
  Tag,
  ListChecks,
  AlertCircle
} from 'lucide-react';
import { runSecurityScan } from '../services/geminiService';
import { SecurityScanResult } from '../types';

const SecurityHub: React.FC = () => {
  const [code, setCode] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [results, setResults] = useState<SecurityScanResult[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleScan = async () => {
    if (!code.trim()) return;
    setIsScanning(true);
    const scanResults = await runSecurityScan(code);
    setResults(scanResults);
    setIsScanning(false);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clear = () => {
    setCode('');
    setResults([]);
  };

  const getSeverityStyles = (sev: string) => {
    switch(sev.toLowerCase()) {
      case 'critical': return {
        text: 'text-rose-400',
        bg: 'bg-rose-500/10',
        border: 'border-rose-500/30',
        glow: 'shadow-[0_0_30px_rgba(244,63,94,0.15)]',
        accent: 'bg-rose-500',
        badge: 'bg-rose-500 text-white',
        icon: AlertOctagon
      };
      case 'high': return {
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        glow: 'shadow-[0_0_25px_rgba(249,115,22,0.15)]',
        accent: 'bg-orange-500',
        badge: 'bg-orange-500 text-white',
        icon: AlertTriangle
      };
      case 'medium': return {
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        accent: 'bg-amber-500',
        badge: 'bg-amber-500 text-white',
        icon: Info
      };
      default: return {
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        glow: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',
        accent: 'bg-blue-500',
        badge: 'bg-blue-500 text-white',
        icon: ShieldCheck
      };
    }
  };

  const counts = {
    critical: results.filter(r => r.severity.toLowerCase() === 'critical').length,
    high: results.filter(r => r.severity.toLowerCase() === 'high').length,
    medium: results.filter(r => r.severity.toLowerCase() === 'medium').length,
    low: results.filter(r => r.severity.toLowerCase() === 'low').length,
  };

  const healthScore = results.length === 0 ? 100 : Math.max(0, 100 - (counts.critical * 30 + counts.high * 15 + counts.medium * 5));

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-emerald-500 shadow-xl shadow-emerald-950/20">
            <ShieldAlert size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-500 tracking-tight">Vulnerability Matrix</h1>
            <p className="text-slate-500 font-medium">Heuristic threat detection and AI-assisted patch generation.</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={clear}
            className="p-3 text-slate-500 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
            title="Wipe Target Buffer"
          >
            <Trash2 size={20} />
          </button>
          <button 
            onClick={handleScan}
            disabled={isScanning || !code}
            className="flex items-center space-x-3 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl transition-all font-black shadow-lg shadow-emerald-900/20 active:scale-95 group"
          >
            {isScanning ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} className="group-hover:animate-pulse" />}
            <span>{isScanning ? 'RUNNING HEURISTICS...' : 'EXECUTE SCAN'}</span>
          </button>
        </div>
      </header>

      {results.length > 0 && !isScanning && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 animate-in slide-in-from-top-6 duration-500">
          <div className="bg-slate-900/80 backdrop-blur border border-slate-800 p-5 rounded-3xl flex flex-col items-center justify-center shadow-xl">
             <div className="relative w-20 h-20 flex items-center justify-center mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="5" fill="transparent" className="text-slate-800" />
                  <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="5" fill="transparent" strokeDasharray={213.6} strokeDashoffset={213.6 - (213.6 * healthScore) / 100} className={`${healthScore > 70 ? 'text-emerald-500' : healthScore > 40 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000`} strokeLinecap="round" />
                </svg>
                <span className="absolute text-xl font-black">{healthScore}</span>
             </div>
             <span className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Asset Health</span>
          </div>
          {[
            { label: 'Critical', count: counts.critical, color: 'text-rose-500', bg: 'bg-rose-500/10' },
            { label: 'High Risk', count: counts.high, color: 'text-orange-500', bg: 'bg-orange-500/10' },
            { label: 'Medium', count: counts.medium, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { label: 'Low', count: counts.low, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/80 backdrop-blur border border-slate-800 p-5 rounded-3xl flex flex-col justify-center shadow-lg hover:border-slate-700 transition-colors">
              <p className={`text-3xl font-black ${stat.count > 0 ? stat.color : 'text-slate-700'}`}>{stat.count}</p>
              <p className="text-[10px] uppercase font-black text-slate-500 tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* IDE Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col border-t-slate-700">
            <div className="bg-slate-800/90 backdrop-blur px-5 py-3.5 border-b border-slate-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Terminal size={14} className="text-emerald-500" />
                <span className="text-[10px] text-slate-300 font-black tracking-[0.2em] uppercase">Security Research Lab</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[750px] p-8 bg-[#020617] text-emerald-500/80 font-mono text-sm focus:outline-none resize-none leading-relaxed selection:bg-emerald-500/20 placeholder:text-slate-800"
              placeholder="// Paste suspect source code for deep inspection... (Node, Python, Go, etc.)"
            />
          </div>
        </div>

        {/* Audit Results Section */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl flex flex-col h-[815px] overflow-hidden shadow-2xl">
          <div className="p-7 border-b border-slate-900 flex items-center justify-between bg-slate-950/80 backdrop-blur sticky top-0 z-10">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <h3 className="text-xl font-black tracking-tight flex items-center space-x-3 text-white">
                <span>Detailed Audit Logs</span>
              </h3>
            </div>
            <div className="flex items-center space-x-4">
               <span className="text-[10px] text-slate-600 font-black tracking-[0.2em] uppercase">Deep Scan Active</span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-10 p-7 custom-scrollbar scroll-smooth">
            {!results.length && !isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 opacity-20 group">
                <ShieldQuestion size={100} className="text-slate-600 group-hover:scale-110 transition-transform duration-700" />
                <div>
                  <p className="text-2xl font-black text-slate-300">Target Neutralized</p>
                  <p className="max-w-xs text-sm text-slate-500 mt-2 mx-auto font-medium leading-relaxed">System awaiting data input. No vulnerabilities currently mapped in the local buffer.</p>
                </div>
              </div>
            )}

            {isScanning && (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-10">
                <div className="relative">
                   <div className="w-32 h-32 border-[6px] border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
                   <Activity className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={48} />
                </div>
                <div className="space-y-3">
                  <p className="text-emerald-500 font-mono text-xl animate-pulse tracking-[0.4em] font-black">DECRYPTING VECTORS</p>
                  <p className="text-slate-600 text-xs font-black uppercase tracking-widest">Running taint analysis & pattern matching...</p>
                </div>
              </div>
            )}

            {results.map((res, i) => {
              const styles = getSeverityStyles(res.severity);
              const SevIcon = styles.icon;

              return (
                <div key={i} className={`group relative bg-slate-900/40 border ${styles.border} ${styles.glow} rounded-[2rem] overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:bg-slate-900/60 shadow-2xl`}>
                  {/* Visual Indicator Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${styles.accent}`}></div>
                  
                  <div className="p-8 space-y-8">
                    {/* Header: Title & Severity */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-5">
                        <div className={`p-4 rounded-2xl ${styles.bg} ${styles.text} shadow-lg border ${styles.border}`}>
                          <SevIcon size={28} />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3 mb-1">
                             <span className={`text-[9px] uppercase font-black px-2.5 py-1 rounded-md tracking-[0.2em] ${styles.badge}`}>
                               {res.severity}
                             </span>
                             <div className="flex items-center space-x-1.5 text-blue-400 bg-blue-500/5 px-2 py-1 rounded-md border border-blue-500/10 text-[9px] font-black uppercase tracking-widest">
                               <Tag size={10} />
                               <span>{res.cweId || 'CWE-??'}</span>
                             </div>
                          </div>
                          <h4 className="font-black text-slate-100 text-2xl leading-tight tracking-tight">{res.vulnerability}</h4>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-slate-500 bg-slate-950/50 px-4 py-2 rounded-xl border border-slate-800 text-[11px] font-mono shadow-inner">
                        <Code size={14} className="text-emerald-500" />
                        <span className="font-bold">Detected at line: {res.lineNumber || 'Unknown'}</span>
                      </div>
                    </div>

                    {/* Findings & Risk */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800/50 space-y-3">
                        <div className="flex items-center space-x-2 text-rose-500/70">
                          <AlertCircle size={16} />
                          <p className="text-[10px] font-black uppercase tracking-widest">Impact Analysis</p>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium italic">
                          "{res.description}"
                        </p>
                      </div>

                      <div className="bg-slate-950/50 p-6 rounded-3xl border border-slate-800/50 space-y-3">
                        <div className="flex items-center space-x-2 text-emerald-500/70">
                          <ListChecks size={16} />
                          <p className="text-[10px] font-black uppercase tracking-widest">Mitigation Strategy</p>
                        </div>
                        <ul className="space-y-2">
                          {res.mitigationSteps?.map((step, idx) => (
                            <li key={idx} className="text-[11px] text-slate-400 flex items-start space-x-2">
                              <span className="text-emerald-500 font-black mt-0.5">•</span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* VULNERABLE CODE BLOCK with IDE UI */}
                    {res.codeSnippet && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase text-rose-500/70 tracking-widest px-2 flex items-center space-x-2">
                          <ShieldAlert size={12} />
                          <span>Offending Syntax Block</span>
                        </p>
                        <div className="bg-[#050914] rounded-2xl overflow-hidden border border-rose-500/10 shadow-inner group/snippet">
                          <div className="flex">
                            {/* Gutter */}
                            <div className="w-12 bg-rose-950/10 border-r border-rose-500/5 flex flex-col items-center py-5 space-y-0.5 select-none text-[10px] font-mono text-rose-900 font-black">
                               {Array.from({length: Math.min(5, res.codeSnippet.split('\n').length)}).map((_, idx) => (
                                 <div key={idx} className={idx === 0 ? "text-rose-500 bg-rose-500/10 w-full text-center" : ""}>
                                   {parseInt(res.lineNumber || "1") + idx}
                                 </div>
                               ))}
                            </div>
                            <div className="p-5 flex-1 overflow-x-auto">
                              <pre className="text-[13px] font-mono text-rose-400/90 whitespace-pre-wrap leading-relaxed italic"><code>{res.codeSnippet}</code></pre>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* REMEDIATION WORKFLOW */}
                    <div className="pt-8 border-t border-slate-800 space-y-6">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                            <Wrench size={18} />
                          </div>
                          <span className="text-sm font-black uppercase text-emerald-500 tracking-[0.2em]">Validated Remediation</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(res.remediationCode, i)}
                          className="flex items-center space-x-2 px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-emerald-400 rounded-xl border border-slate-800 transition-all text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95"
                        >
                          {copiedIndex === i ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
                          <span>{copiedIndex === i ? 'Copied' : 'Copy Patch'}</span>
                        </button>
                      </div>

                      <div className="p-6 bg-emerald-500/5 rounded-[1.5rem] border border-emerald-500/10 shadow-inner">
                         <div className="flex items-start space-x-3">
                           <ArrowRight size={16} className="text-emerald-500 mt-1 shrink-0" />
                           <p className="text-sm text-emerald-400/90 leading-relaxed font-medium">
                             {res.remediationExplanation}
                           </p>
                         </div>
                      </div>

                      <div className="space-y-3">
                         <p className="text-[10px] font-black uppercase text-emerald-500/50 tracking-widest px-2">Proposed Secure Refactor</p>
                         <div className="bg-[#01040a] rounded-2xl overflow-hidden border border-emerald-500/20 shadow-2xl relative group/fix">
                           <div className="absolute top-4 right-4 opacity-0 group-hover/fix:opacity-100 transition-opacity">
                             <ShieldCheck size={20} className="text-emerald-500/40" />
                           </div>
                           <div className="flex">
                             <div className="w-12 bg-emerald-950/10 border-r border-emerald-500/5 flex flex-col items-center py-5 space-y-0.5 select-none text-[10px] font-mono text-emerald-900 font-black opacity-30">
                                {Array.from({length: Math.min(5, res.remediationCode.split('\n').length)}).map((_, idx) => (
                                  <div key={idx}>{idx + 1}</div>
                                ))}
                             </div>
                             <div className="p-6 flex-1 overflow-x-auto">
                               <pre className="text-[13px] font-mono text-emerald-400 whitespace-pre-wrap leading-relaxed"><code>{res.remediationCode}</code></pre>
                             </div>
                           </div>
                         </div>
                      </div>

                      <div className="flex items-center space-x-3 text-[10px] text-slate-500 bg-slate-950/50 p-4 rounded-2xl border border-slate-900 italic shadow-inner">
                        <Activity size={14} className="text-slate-700" />
                        <span>Intelligence Note: This patch addresses the root vector. Ensure integration tests are executed prior to deployment.</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityHub;
