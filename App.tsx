
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import AttendanceView from './views/Attendance';
import Reports from './views/Reports';
import About from './views/About';
import Students from './views/Students';
import SportsEvents from './views/SportsEvents';
import Profile from './views/Profile';
import { User, UserRole } from './types';
import { MOCK_ADMIN, MOCK_COACHES, MOCK_STUDENTS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-slate-800/50 animate-in fade-in zoom-in duration-700">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 md:w-2/5 p-12 text-white flex flex-col justify-center relative overflow-hidden shrink-0">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
               <i className="fas fa-running text-[20rem] absolute -bottom-10 -right-10"></i>
            </div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center mb-8 backdrop-blur-xl border border-white/30 shadow-2xl animate-bounce duration-[2000ms]">
                <i className="fas fa-running text-3xl"></i>
              </div>
              <h1 className="text-4xl font-black mb-4 leading-tight">RMV-CAS Sports</h1>
              <p className="text-amber-50 font-medium opacity-80 leading-relaxed">
                Ramakrishna Mission Vidyalaya College of Arts and Science.
              </p>
              <div className="mt-12 space-y-4">
                 <div className="flex items-center gap-3 text-sm">
                    <i className="fas fa-check-circle text-amber-200"></i>
                    <span>Automated Attendance</span>
                 </div>
                 <div className="flex items-center gap-3 text-sm">
                    <i className="fas fa-check-circle text-amber-200"></i>
                    <span>Smart Analytics</span>
                 </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-12 bg-white flex flex-col">
            <div className="mb-12">
              <h2 className="text-3xl font-black text-slate-800 mb-2">Login Portal</h2>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Academic Session 2025-26</p>
            </div>
            
            <div className="space-y-4 flex-1">
              {[
                { title: "Administrator", role: MOCK_ADMIN, icon: "fa-user-shield", desc: "Institutional oversight", portal: "dashboard" },
                { title: "Coach Portal", role: MOCK_COACHES[0], icon: "fa-whistle", desc: "Team & attendance", portal: "attendance" },
                { title: "Student Portal", role: MOCK_STUDENTS[0], icon: "fa-user-graduate", desc: "Personal history", portal: "history" }
              ].map((portal, i) => (
                <button 
                  key={i}
                  onClick={() => { setUser(portal.role); setActiveTab(portal.portal); }}
                  className="w-full flex items-center justify-between p-5 border border-slate-100 hover:border-amber-500 rounded-3xl transition-all duration-300 group hover:bg-amber-50/50 hover:shadow-xl hover:shadow-amber-500/10 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 group-hover:bg-amber-500 group-hover:text-white flex items-center justify-center text-slate-400 transition-all duration-500 ease-out shadow-sm group-hover:shadow-lg group-hover:shadow-amber-500/40">
                      <i className={`fas ${portal.icon} text-xl`}></i>
                    </div>
                    <div className="text-left">
                      <p className="font-black text-slate-800 group-hover:text-amber-600 transition-colors">{portal.title}</p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-0.5">{portal.desc}</p>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-amber-500 transition-all duration-300 shadow-inner group-hover:shadow-lg">
                    <i className="fas fa-arrow-right text-slate-300 group-hover:text-white text-sm transform group-hover:translate-x-1 transition-transform"></i>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-12 text-center">
               <p className="text-[10px] text-slate-300 uppercase tracking-[0.4em] font-black">
                 © 2026 RMV-CAS Coimbatore • Developed by Dharmaprakash
               </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'attendance':
        return user.role === UserRole.COACH ? <AttendanceView coach={user} /> : <div className="p-20 text-center text-slate-400 font-bold uppercase tracking-widest">Unauthorized Access</div>;
      case 'students':
        return <Students />;
      case 'sports_events':
        return <SportsEvents />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return <Profile user={user} />;
      case 'about':
        return <About />;
      case 'history':
        return (
          <div className="bg-white p-12 rounded-[3rem] border border-slate-200 text-center shadow-sm max-w-4xl mx-auto animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-amber-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-amber-600 text-4xl shadow-lg shadow-amber-500/10">
              <i className="fas fa-history"></i>
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4">Participation History</h2>
            <p className="text-slate-500 mb-12 max-w-md mx-auto text-sm">Track your progress and attendance metrics across all registered sports programs.</p>
            <div className="grid grid-cols-1 gap-4 text-left">
              {[
                { activity: "Cricket Practice", date: "May 12, 2026", status: "PRESENT", color: "green" },
                { activity: "Football Training", date: "May 11, 2026", status: "ABSENT", color: "rose" },
                { activity: "Fitness Drill", date: "May 10, 2026", status: "PRESENT", color: "green" }
              ].map((h, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-xl hover:border-amber-200 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${h.status === 'PRESENT' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'}`}>
                      <i className={`fas ${h.status === 'PRESENT' ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    </div>
                    <div>
                        <p className="text-base font-black text-slate-800">{h.activity}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{h.date}</p>
                    </div>
                  </div>
                  <span className={`px-5 py-2 rounded-full text-[10px] font-black tracking-widest border transition-all ${
                    h.status === 'PRESENT' ? 'bg-green-500 text-white border-green-400 shadow-lg shadow-green-500/20' : 'bg-rose-500 text-white border-rose-400 shadow-lg shadow-rose-500/20'
                  }`}>
                    {h.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-6 py-32 opacity-20">
            <i className="fas fa-tools text-9xl"></i>
            <h2 className="text-2xl font-black uppercase tracking-[0.5em]">Maintenance</h2>
          </div>
        );
    }
  };

  return (
    <Layout 
      user={user} 
      onLogout={() => setUser(null)} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
