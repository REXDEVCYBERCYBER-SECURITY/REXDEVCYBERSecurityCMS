
import React, { useState } from 'react';
import { Plus, MoreVertical, Clock, AlertCircle, Lock, LayoutGrid } from 'lucide-react';
import { Task, TaskStatus, UserRole } from '../types';
import { MOCK_TASKS } from '../constants';

interface TaskBoardProps {
  userRole: UserRole;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ userRole }) => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS as Task[]);
  const canEdit = userRole === UserRole.ADMIN || userRole === UserRole.EDITOR;

  const columns = [
    { id: TaskStatus.BACKLOG, title: 'Backlog', color: 'bg-slate-700' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Execution', color: 'bg-blue-600' },
    { id: TaskStatus.REVIEW, title: 'Security Audit', color: 'bg-amber-600' },
    { id: TaskStatus.DONE, title: 'Resolved', color: 'bg-emerald-600' },
  ];

  return (
    <div className="h-full space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <div className="p-3 bg-slate-900 border border-slate-800 rounded-2xl text-blue-500 shadow-lg">
             <LayoutGrid size={24} />
           </div>
           <div>
            <h1 className="text-2xl font-black tracking-tight">Ops Workflow</h1>
            <p className="text-slate-500 text-sm font-medium">Monitoring internal task lifecycle and research sprints.</p>
          </div>
        </div>
        {canEdit && (
          <button 
            className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all font-bold shadow-lg shadow-blue-900/20 active:scale-95"
          >
            <Plus size={18} />
            <span>Create Task</span>
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)]">
        {columns.map((col) => {
          const columnTasks = tasks.filter(t => t.status === col.id);
          
          return (
            <div key={col.id} className="bg-slate-900/40 border border-slate-800/60 rounded-3xl flex flex-col backdrop-blur-sm">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className={`w-1.5 h-1.5 rounded-full ${col.color} shadow-[0_0_8px_rgba(255,255,255,0.1)]`}></div>
                  <h3 className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-300">{col.title}</h3>
                  <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded-md text-[10px] font-black border border-slate-700/50">
                    {columnTasks.length}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-1 overflow-y-auto space-y-4 custom-scrollbar">
                {columnTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-slate-900 border border-slate-800 p-5 rounded-2xl transition-all duration-300 group ${
                      canEdit 
                        ? 'hover:border-slate-600 cursor-grab active:cursor-grabbing hover:translate-y-[-2px]' 
                        : 'cursor-default opacity-80'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider border ${
                        task.priority === 'high' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                        task.priority === 'medium' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                        'bg-slate-500/10 text-slate-400 border-slate-500/20'
                      }`}>
                        {task.priority}
                      </span>
                      {canEdit && (
                        <button className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-white transition-opacity">
                          <MoreVertical size={14} />
                        </button>
                      )}
                    </div>
                    <h4 className="font-bold text-slate-100 mb-2 leading-snug">{task.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{task.description}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                      <div className="flex -space-x-2.5">
                        {[1, 2].map(i => (
                          <div key={i} className="w-7 h-7 rounded-xl border-2 border-slate-900 bg-slate-800 overflow-hidden shadow-md">
                            <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${task.id + i}`} alt="avatar" />
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center space-x-1 text-slate-600">
                        <Clock size={12} />
                        <span className="text-[10px] font-bold">2d Left</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {canEdit ? (
                  <button className="w-full py-3 border border-dashed border-slate-800 rounded-2xl text-slate-600 hover:text-slate-400 hover:border-slate-600 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 group">
                    <Plus size={14} className="group-hover:scale-125 transition-transform" />
                    <span>New Entry</span>
                  </button>
                ) : (
                  <div className="py-3 flex items-center justify-center space-x-2 opacity-20 select-none grayscale">
                    <Lock size={12} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Read Only Buffer</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskBoard;
