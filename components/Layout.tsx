
import React from 'react';
import { UserRole, User } from '../types';
import { INSTITUTION_NAME } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-chart-line', roles: [UserRole.ADMIN, UserRole.COACH, UserRole.STUDENT] },
    { id: 'attendance', label: 'Mark Attendance', icon: 'fa-calendar-check', roles: [UserRole.COACH] },
    { id: 'students', label: 'Student Directory', icon: 'fa-user-graduate', roles: [UserRole.ADMIN, UserRole.COACH] },
    { id: 'sports_events', label: 'Sports & Events', icon: 'fa-trophy', roles: [UserRole.ADMIN, UserRole.COACH] },
    { id: 'history', label: 'Attendance History', icon: 'fa-history', roles: [UserRole.STUDENT] },
    { id: 'reports', label: 'Analytics Reports', icon: 'fa-file-invoice', roles: [UserRole.ADMIN, UserRole.COACH] },
    { id: 'profile', label: 'User Profile', icon: 'fa-user-circle', roles: [UserRole.ADMIN, UserRole.COACH, UserRole.STUDENT] },
    { id: 'about', label: 'System Info', icon: 'fa-circle-info', roles: [UserRole.ADMIN, UserRole.COACH, UserRole.STUDENT] },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex shrink-0">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-amber-500 p-2 rounded-lg">
              <i className="fas fa-running text-white text-xl"></i>
            </div>
            <span className="font-bold text-lg leading-tight">RMV-CAS Sports</span>
          </div>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">{INSTITUTION_NAME}</p>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems
            .filter(item => item.roles.includes(user.role))
            .map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <i className={`fas ${item.icon} w-5`}></i>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl mb-4">
            <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}`} className="w-10 h-10 rounded-full border-2 border-slate-700" alt="avatar" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-[10px] text-slate-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors text-sm"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-slate-800 uppercase tracking-tight">
              {menuItems.find(i => i.id === activeTab)?.label || 'Dashboard'}
            </h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">RMV-CAS Sports Excellence</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 uppercase">Academic Session 2025-26</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-slate-400 hover:text-amber-500 transition-colors">
                  <i className="far fa-bell text-xl"></i>
                  <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}`} className="w-8 h-8 rounded-full border border-slate-200 shadow-sm" alt="profile" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
