
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_SPORTS } from '../constants';
import { User, AbsenceReason } from '../types';

interface AttendanceMark {
  status: 'PRESENT' | 'ABSENT';
  reason?: AbsenceReason;
}

const AttendanceView: React.FC<{ coach: User }> = ({ coach }) => {
  const [selectedSport, setSelectedSport] = useState(coach.sportId || MOCK_SPORTS[0].id);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [markedRecords, setMarkedRecords] = useState<Record<string, AttendanceMark>>({});
  const [isSaving, setIsSaving] = useState(false);

  const studentsInSport = MOCK_STUDENTS.filter(s => s.sportId === selectedSport);
  const sport = MOCK_SPORTS.find(s => s.id === selectedSport);

  const handleStatusChange = (studentId: string, status: 'PRESENT' | 'ABSENT') => {
    setMarkedRecords(prev => ({
      ...prev,
      [studentId]: {
        status,
        reason: status === 'ABSENT' ? 'Absent' : undefined
      }
    }));
  };

  const handleReasonChange = (studentId: string, reason: AbsenceReason) => {
    setMarkedRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        reason
      }
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    // Simulate complex backend processing of status and reasons
    setTimeout(() => {
      console.log('Synchronized Records:', markedRecords);
      alert(`Attendance for ${sport?.name} on ${attendanceDate} has been successfully committed to the institutional database.`);
      setIsSaving(false);
    }, 1500);
  };

  const markAll = (status: 'PRESENT' | 'ABSENT') => {
    const newMarks: Record<string, AttendanceMark> = {};
    studentsInSport.forEach(s => {
      newMarks[s.id] = { 
        status, 
        reason: status === 'ABSENT' ? 'Absent' : undefined 
      };
    });
    setMarkedRecords(newMarks);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Session Roll Call</h2>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Team: <span className="text-amber-600">{sport?.name}</span> • Practice Hub</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl border border-slate-100">
            <div className="flex flex-col px-4 border-r border-slate-200">
              <label className="text-[9px] uppercase font-black text-slate-400 tracking-tighter">Session Date</label>
              <input 
                type="date" 
                value={attendanceDate}
                onChange={(e) => setAttendanceDate(e.target.value)}
                className="bg-transparent font-bold text-slate-700 outline-none text-sm cursor-pointer"
              />
            </div>
            <div className="px-4 text-slate-300">
              <i className="fas fa-calendar-day"></i>
            </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 bg-slate-50/50 border-b border-slate-200 flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Squad Roster ({studentsInSport.length} Athletes)</h3>
            <div className="flex gap-2">
                <button onClick={() => markAll('PRESENT')} className="text-[10px] font-black uppercase text-green-600 hover:bg-green-500 hover:text-white px-4 py-2 rounded-xl border border-green-200 transition-all active:scale-95 shadow-sm bg-white">All Present</button>
                <button onClick={() => markAll('ABSENT')} className="text-[10px] font-black uppercase text-rose-600 hover:bg-rose-500 hover:text-white px-4 py-2 rounded-xl border border-rose-200 transition-all active:scale-95 shadow-sm bg-white">All Absent</button>
            </div>
        </div>
        <div className="divide-y divide-slate-50">
          {studentsInSport.map(student => {
            const current = markedRecords[student.id];
            const isAbsent = current?.status === 'ABSENT';

            return (
              <div key={student.id} className={`px-8 py-6 transition-all group ${isAbsent ? 'bg-rose-50/30' : 'hover:bg-slate-50/50'}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all shadow-sm ${
                      current?.status === 'PRESENT' ? 'bg-green-500 text-white shadow-green-500/20' : 
                      isAbsent ? 'bg-rose-500 text-white shadow-rose-500/20' : 
                      'bg-slate-100 text-slate-400'
                    }`}>
                        {student.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm tracking-tight">{student.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{student.rollNumber} • {student.department}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleStatusChange(student.id, 'PRESENT')}
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                        current?.status === 'PRESENT' 
                        ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-500/30' 
                        : 'bg-white border-slate-200 text-slate-300 hover:border-green-300'
                      }`}
                      title="Mark Present"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button 
                      onClick={() => handleStatusChange(student.id, 'ABSENT')}
                      className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                        isAbsent 
                        ? 'bg-rose-500 border-rose-500 text-white shadow-lg shadow-rose-500/30' 
                        : 'bg-white border-slate-200 text-slate-300 hover:border-rose-300'
                      }`}
                      title="Mark Absent"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                </div>

                {/* Sub-menu for Absence Reason */}
                {isAbsent && (
                   <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pl-16 animate-in slide-in-from-top-2 duration-300">
                      <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2">
                        <i className="fas fa-info-circle"></i> Reason for Absence
                      </span>
                      <div className="flex gap-2 p-1.5 bg-white border border-rose-100 rounded-2xl shadow-inner">
                        {(['Absent', 'Sick', 'Leave', 'General'] as AbsenceReason[]).map((r) => (
                           <button
                             key={r}
                             onClick={() => handleReasonChange(student.id, r)}
                             className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all ${
                               current.reason === r 
                               ? 'bg-rose-500 text-white shadow-md' 
                               : 'text-slate-400 hover:bg-rose-50 hover:text-rose-500'
                             }`}
                           >
                             {r}
                           </button>
                        ))}
                      </div>
                   </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="p-8 bg-slate-50/50 border-t border-slate-200">
            <button 
                disabled={isSaving || Object.keys(markedRecords).length < studentsInSport.length}
                onClick={handleSave}
                className={`w-full py-5 rounded-3xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all ${
                    Object.keys(markedRecords).length < studentsInSport.length
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-black/20 active:scale-[0.98]'
                }`}
            >
                {isSaving ? <i className="fas fa-circle-notch animate-spin text-lg"></i> : <i className="fas fa-cloud-upload-alt text-lg"></i>}
                {isSaving ? 'Processing...' : 'Commit Attendance Log'}
            </button>
            {Object.keys(markedRecords).length < studentsInSport.length && (
                <p className="text-center mt-4 text-[10px] text-rose-500 font-black uppercase tracking-widest animate-pulse">
                    Please mark attendance for the entire roster before committing
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;
