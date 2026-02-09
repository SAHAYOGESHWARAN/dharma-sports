
import React from 'react';
import { User, UserRole } from '../types';
import { MOCK_SPORTS } from '../constants';

const Profile: React.FC<{ user: User }> = ({ user }) => {
  const sport = MOCK_SPORTS.find(s => s.id === user.sportId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-amber-500 to-orange-600 relative">
          <div className="absolute -bottom-16 left-12">
            <div className="p-1.5 bg-white rounded-full">
              <img src={user.profileImage || `https://ui-avatars.com/api/?name=${user.name}`} className="w-32 h-32 rounded-full border-4 border-slate-50 shadow-xl" alt="avatar" />
            </div>
          </div>
        </div>
        
        <div className="pt-20 pb-12 px-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-800">{user.name}</h2>
            <div className="flex flex-wrap items-center gap-4">
              <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-100">{user.role}</span>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <i className="fas fa-envelope text-slate-300"></i> {user.email}
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <i className="fas fa-university text-slate-300"></i> Coimbatore Campus
              </p>
            </div>
          </div>
          <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95">Edit Profile</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-6">Sports Specialization</h3>
            {sport ? (
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 rounded-3xl bg-amber-50 flex items-center justify-center shrink-0">
                  <i className="fas fa-running text-3xl text-amber-500"></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{sport.name}</h4>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">{sport.description}</p>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">No specific sport specialization assigned.</p>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-6">Security & Preferences</h3>
            <div className="space-y-4">
               {[
                 { label: "Two-Factor Authentication", status: "Enabled", icon: "fa-shield-halved", color: "text-green-500" },
                 { label: "Notification Settings", status: "Email & Push", icon: "fa-bell", color: "text-blue-500" },
                 { label: "Data Export Policy", status: "Standard", icon: "fa-database", color: "text-amber-500" }
               ].map((pref, i) => (
                 <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-2xl transition-colors border border-transparent hover:border-slate-100">
                   <div className="flex items-center gap-4">
                     <i className={`fas ${pref.icon} ${pref.color}`}></i>
                     <span className="text-sm font-bold text-slate-700">{pref.label}</span>
                   </div>
                   <span className="text-xs font-bold text-slate-400">{pref.status}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10">
               <i className="fas fa-qrcode text-8xl"></i>
             </div>
             <h3 className="text-lg font-bold mb-4">Smart ID</h3>
             <div className="bg-white p-4 rounded-2xl w-full aspect-square flex items-center justify-center mb-6">
                <i className="fas fa-qrcode text-slate-900 text-[120px]"></i>
             </div>
             <p className="text-[10px] text-slate-400 text-center uppercase tracking-[0.2em]">Scan for Instant Attendance</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
