
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MOCK_ATTENDANCE, MOCK_STUDENTS, MOCK_SPORTS, PROJECT_FEATURES } from '../constants';
import { User } from '../types';
import { getAttendanceInsights } from '../services/geminiService';

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [aiInsight, setAiInsight] = useState<string>("Analyzing current system metrics...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      const insight = await getAttendanceInsights(MOCK_ATTENDANCE, MOCK_STUDENTS, MOCK_SPORTS);
      setAiInsight(insight || "System insight generated successfully.");
      setLoading(false);
    };
    fetchInsights();
  }, []);

  const stats = [
    { label: 'Total Athletes', value: MOCK_STUDENTS.length, icon: 'fa-users', color: 'bg-blue-500' },
    { label: 'Active Leagues', value: MOCK_SPORTS.length, icon: 'fa-volleyball-ball', color: 'bg-green-500' },
    { label: 'Avg Attendance', value: '86%', icon: 'fa-chart-area', color: 'bg-amber-500' },
    { label: 'Scheduled Meets', value: '08', icon: 'fa-calendar-day', color: 'bg-rose-500' },
  ];

  const sportWiseData = MOCK_SPORTS.map((s, i) => ({ name: s.name, value: 70 + (i * 8) }));
  const COLORS_LIST = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900">Academic Portal 2026</h2>
          <p className="text-slate-500 text-sm">Welcome back, <span className="text-amber-600 font-bold">{user.name}</span>. Your overview is ready.</p>
        </div>
        <div className="flex gap-2">
           <button className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 shadow-sm">Export Stats</button>
           <button className="bg-slate-900 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-lg shadow-black/10">Live Updates</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-slate-50 rounded-full group-hover:bg-slate-100 transition-colors pointer-events-none"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg`}>
                <i className={`fas ${stat.icon} text-lg`}></i>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <div className="flex items-center justify-between mb-8">
               <h3 className="font-black text-slate-800 text-xl">Participation Trends</h3>
               <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
                 <button className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-black uppercase">Weekly</button>
                 <button className="px-3 py-1.5 text-[10px] font-black uppercase text-slate-400">Monthly</button>
               </div>
             </div>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sportWiseData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={15} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dx={-15} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="value" fill="#f59e0b" radius={[10, 10, 0, 0]} barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
           </div>

           {/* Feature Checklist / Project Roadmap */}
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                  <i className="fas fa-check-double text-[200px]"></i>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-6">100+ Feature Project Modules</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PROJECT_FEATURES.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/5 rounded-2xl">
                      <i className="fas fa-check-circle text-amber-500 text-xs shrink-0"></i>
                      <span className="text-xs text-slate-400 font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
           </div>
        </div>

        {/* Sidebar Info Area */}
        <div className="space-y-8">
           <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-20 rotate-12">
               <i className="fas fa-brain text-[180px]"></i>
             </div>
             <div className="relative z-10 flex flex-col h-full">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md border border-white/20">
                   <i className="fas fa-sparkles text-amber-300"></i>
                 </div>
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">AI Performance Engine</h4>
               </div>
               <div className="flex-1 min-h-[150px]">
                 {loading ? (
                   <div className="space-y-4 animate-pulse">
                     <div className="h-4 bg-white/10 rounded w-full"></div>
                     <div className="h-4 bg-white/10 rounded w-5/6"></div>
                     <div className="h-4 bg-white/10 rounded w-4/6"></div>
                   </div>
                 ) : (
                   <p className="text-sm leading-relaxed text-blue-50 font-medium italic opacity-90">
                     "{aiInsight}"
                   </p>
                 )}
               </div>
               <button className="mt-8 bg-white text-blue-700 text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-2xl self-start hover:bg-blue-50 transition-colors shadow-lg shadow-black/20">
                 Run Deep Analysis
               </button>
             </div>
           </div>

           <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <h3 className="font-black text-slate-800 mb-6">Department Leaders</h3>
             <div className="space-y-5">
                {[
                  { name: "Computer Science", val: 94, color: "bg-green-500" },
                  { name: "Commerce (B.Com)", val: 82, color: "bg-blue-500" },
                  { name: "Physics", val: 78, color: "bg-amber-500" },
                  { name: "Mathematics", val: 65, color: "bg-rose-500" }
                ].map((dept, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400">
                      <span>{dept.name}</span>
                      <span className="text-slate-800">{dept.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                      <div className={`h-full ${dept.color} rounded-full`} style={{width: `${dept.val}%`}}></div>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-8 py-3 border border-dashed border-slate-200 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-amber-500 hover:border-amber-200 transition-all">
               Full Rankings Table
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
