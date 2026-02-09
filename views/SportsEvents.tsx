
import React, { useState } from 'react';
import { MOCK_SPORTS, MOCK_EVENTS, MOCK_COACHES } from '../constants';
import { Sport, Event } from '../types';

const SportsEvents: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'sports' | 'events'>('sports');
  const [sports, setSports] = useState<Sport[]>(MOCK_SPORTS);
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [showSportModal, setShowSportModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);

  const [newSport, setNewSport] = useState({ name: '', description: '', coachId: MOCK_COACHES[0].id });
  const [newEvent, setNewEvent] = useState({ name: '', date: '', sportId: MOCK_SPORTS[0].id, location: '' });

  const handleAddSport = (e: React.FormEvent) => {
    e.preventDefault();
    const sport: Sport = { id: `s${sports.length + 1}`, ...newSport };
    setSports([...sports, sport]);
    setShowSportModal(false);
    setNewSport({ name: '', description: '', coachId: MOCK_COACHES[0].id });
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const event: Event = { id: `e${events.length + 1}`, ...newEvent };
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({ name: '', date: '', sportId: MOCK_SPORTS[0].id, location: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4 border-b border-slate-200 pb-2">
        <button 
          onClick={() => setActiveSubTab('sports')}
          className={`px-6 py-3 font-bold text-sm transition-all relative ${activeSubTab === 'sports' ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Sports Registry
          {activeSubTab === 'sports' && <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 rounded-full"></div>}
        </button>
        <button 
          onClick={() => setActiveSubTab('events')}
          className={`px-6 py-3 font-bold text-sm transition-all relative ${activeSubTab === 'events' ? 'text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Event Calendar
          {activeSubTab === 'events' && <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 rounded-full"></div>}
        </button>
      </div>

      {activeSubTab === 'sports' ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-800">Managed Sports</h2>
                <p className="text-sm text-slate-500">Official RMV-CAS sports programs and divisions.</p>
            </div>
            <button 
              onClick={() => setShowSportModal(true)}
              className="bg-amber-500 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
            >
              <i className="fas fa-plus"></i>
              Add Sport
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map(sport => {
              const coach = MOCK_COACHES.find(c => c.id === sport.coachId);
              return (
                <div key={sport.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <i className="fas fa-basketball-ball text-6xl"></i>
                  </div>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500">
                        <i className="fas fa-medal text-xl"></i>
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-slate-800">{sport.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{sport.description}</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                      <img src={`https://ui-avatars.com/api/?name=${coach?.name}`} className="w-8 h-8 rounded-full border border-slate-100" alt="coach" />
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Assigned Coach</p>
                        <p className="text-xs font-bold text-slate-700">{coach?.name || 'Vacant'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
           <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-black text-slate-800">Upcoming Events</h2>
                <p className="text-sm text-slate-500">Scheduled tournaments, training camps, and meets.</p>
            </div>
            <button 
              onClick={() => setShowEventModal(true)}
              className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-black/10 hover:bg-black transition-all active:scale-95"
            >
              <i className="fas fa-calendar-plus"></i>
              Schedule Event
            </button>
          </div>

          <div className="space-y-4">
            {events.map(event => {
              const sport = sports.find(s => s.id === event.sportId);
              return (
                <div key={event.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                      <span className="text-[10px] uppercase font-bold opacity-60">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                      <span className="text-xl font-black">{new Date(event.date).getDate()}</span>
                    </div>
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">{event.name}</h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1">
                        <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded uppercase border border-amber-100">{sport?.name}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <i className="fas fa-location-dot"></i> {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-colors">Details</button>
                    <button className="px-4 py-2 bg-slate-900 hover:bg-black text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-95">Register Attendance</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Modals for Adding Sport/Event */}
      {showSportModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Register New Sport</h3>
               <button onClick={() => setShowSportModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                  <i className="fas fa-times text-lg"></i>
               </button>
             </div>
             <form onSubmit={handleAddSport} className="p-8 space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sport Title</label>
                  <input required value={newSport.name} onChange={e => setNewSport({...newSport, name: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" placeholder="e.g. Basketball Men's Team" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sport Description</label>
                  <textarea required value={newSport.description} onChange={e => setNewSport({...newSport, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none h-24 resize-none" placeholder="Briefly describe the sport and vision..."></textarea>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Appoint Coach</label>
                  <select value={newSport.coachId} onChange={e => setNewSport({...newSport, coachId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none">
                    {MOCK_COACHES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-amber-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95">Register Sport Category</button>
             </form>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
           <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden">
             <div className="p-8 border-b border-slate-100 flex justify-between items-center">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Schedule New Event</h3>
               <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                  <i className="fas fa-times text-lg"></i>
               </button>
             </div>
             <form onSubmit={handleAddEvent} className="p-8 space-y-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Event Name</label>
                  <input required value={newEvent.name} onChange={e => setNewEvent({...newEvent, name: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" placeholder="e.g. Zonal Football Qualifiers" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</label>
                    <input required value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} type="date" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sport Category</label>
                    <select value={newEvent.sportId} onChange={e => setNewEvent({...newEvent, sportId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none">
                      {sports.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location / Venue</label>
                  <input required value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" placeholder="e.g. Main Ground Arena" />
                </div>
                <button type="submit" className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-black/20 hover:bg-black transition-all active:scale-95">Confirm Event Booking</button>
             </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsEvents;
