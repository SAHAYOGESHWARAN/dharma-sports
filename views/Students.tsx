
import React, { useState } from 'react';
import { MOCK_STUDENTS, MOCK_SPORTS, MOCK_ATTENDANCE } from '../constants';
import { Student, AttendanceRecord } from '../types';

const Students: React.FC = () => {
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudentForHistory, setSelectedStudentForHistory] = useState<Student | null>(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    rollNumber: '',
    department: '',
    sportId: MOCK_SPORTS[0].id,
    year: 'I',
    phone: ''
  });

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const student: Student = {
      id: `st${students.length + 1}`,
      role: 'STUDENT' as any,
      ...newStudent
    };
    setStudents([...students, student]);
    setShowAddModal(false);
    setNewStudent({ name: '', email: '', rollNumber: '', department: '', sportId: MOCK_SPORTS[0].id, year: 'I', phone: '' });
  };

  const getStudentHistory = (studentId: string): AttendanceRecord[] => {
    return MOCK_ATTENDANCE.filter(record => record.studentId === studentId);
  };

  const getAttendancePercentage = (studentId: string) => {
    const history = getStudentHistory(studentId);
    if (history.length === 0) return 0;
    const presentCount = history.filter(r => r.status === 'PRESENT').length;
    return Math.round((presentCount / history.length) * 100);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Student Directory</h2>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Official Institutional Registry</p>
        </div>
        <div className="flex gap-4">
            <div className="relative flex-1 md:w-80">
                <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input 
                    type="text" 
                    placeholder="Search name, roll no, or dept..."
                    className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-amber-500/20 outline-none shadow-sm transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button 
                onClick={() => setShowAddModal(true)}
                className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg active:scale-95"
            >
                <i className="fas fa-plus"></i>
                <span className="hidden sm:inline">Enroll Student</span>
            </button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Name</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Roll Number</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Sport</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredStudents.map((student) => {
                const sport = MOCK_SPORTS.find(s => s.id === student.sportId);
                return (
                  <tr key={student.id} className="hover:bg-amber-50/10 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-black text-slate-800 text-sm group-hover:text-amber-600 transition-colors">{student.name}</span>
                          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-xs font-black border border-slate-100 group-hover:bg-white group-hover:border-amber-200 transition-all">
                            {student.rollNumber}
                        </span>
                    </td>
                    <td className="px-8 py-5">
                        <div className="text-sm font-bold text-slate-600">
                            {student.department}
                            <span className="ml-2 text-[10px] text-slate-300 font-black uppercase">Yr-{student.year}</span>
                        </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                          <span className="text-xs font-black text-amber-600 uppercase tracking-widest">
                            {sport?.name || 'Varsity Pool'}
                          </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={() => setSelectedStudentForHistory(student)}
                        className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-amber-500 transition-all shadow-md active:scale-95 inline-flex items-center gap-2 group/btn"
                      >
                        <i className="fas fa-history text-[10px] group-hover/btn:rotate-[-45deg] transition-transform"></i>
                        View Log
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
            <div className="p-24 text-center space-y-4">
                <i className="fas fa-search text-4xl text-slate-200"></i>
                <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">No matching student found</p>
            </div>
        )}
      </div>

      {/* Attendance History Modal */}
      {selectedStudentForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-800/10">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/40">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-amber-500 text-white rounded-3xl flex items-center justify-center text-3xl shadow-xl shadow-amber-500/20">
                  <i className="fas fa-user-check"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight leading-none mb-1">Activity History</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Athlete: <span className="text-amber-600">{selectedStudentForHistory.name}</span></p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStudentForHistory(null)} 
                className="w-12 h-12 rounded-full hover:bg-white hover:text-rose-500 transition-all flex items-center justify-center text-slate-400 shadow-sm"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1 bg-white space-y-6">
              <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Sessions</p>
                    <p className="text-3xl font-black text-slate-800">{getStudentHistory(selectedStudentForHistory.id).length}</p>
                 </div>
                 <div className="bg-slate-900 p-6 rounded-[2rem] flex flex-col items-center justify-center shadow-lg shadow-black/10">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-1">Attendance Rate</p>
                    <p className="text-3xl font-black text-white">{getAttendancePercentage(selectedStudentForHistory.id)}%</p>
                 </div>
              </div>

              <div className="space-y-3">
                {getStudentHistory(selectedStudentForHistory.id).length > 0 ? (
                   getStudentHistory(selectedStudentForHistory.id).reverse().map((record) => {
                     const sport = MOCK_SPORTS.find(s => s.id === record.sportId);
                     return (
                       <div key={record.id} className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:bg-white hover:shadow-xl hover:border-amber-100 transition-all group">
                         <div className="flex items-center gap-5">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                              record.status === 'PRESENT' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
                            }`}>
                              <i className={`fas ${record.status === 'PRESENT' ? 'fa-check' : 'fa-times'} text-xl`}></i>
                            </div>
                            <div>
                               <p className="text-sm font-black text-slate-800">{new Date(record.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sport?.name || 'Practice Session'}</p>
                            </div>
                         </div>
                         <div className="flex flex-col items-end gap-1">
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black tracking-widest border transition-all ${
                              record.status === 'PRESENT' ? 'bg-green-500 text-white border-green-400' : 'bg-rose-500 text-white border-rose-400'
                            }`}>
                              {record.status}
                            </span>
                            {record.reason && (
                              <span className="text-[9px] font-bold text-slate-400 italic">Reason: {record.reason}</span>
                            )}
                         </div>
                       </div>
                     );
                   })
                ) : (
                  <div className="py-20 text-center space-y-4">
                    <i className="fas fa-folder-open text-4xl text-slate-200"></i>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No verified attendance records</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedStudentForHistory(null)}
                className="px-10 py-3 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-black transition-all shadow-lg active:scale-95"
              >
                Dismiss View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Athlete Enrollment</h3>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Digital Registry Office</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="w-10 h-10 rounded-full hover:bg-white hover:text-rose-500 transition-all flex items-center justify-center text-slate-300">
                <i className="fas fa-times text-lg"></i>
              </button>
            </div>
            <form onSubmit={handleAddStudent} className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Student Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none transition-all" placeholder="Enter full name" value={newStudent.name} onChange={(e) => setNewStudent({...newStudent, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Roll Number</label>
                  <input required type="text" placeholder="e.g. 22BSC01" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" value={newStudent.rollNumber} onChange={(e) => setNewStudent({...newStudent, rollNumber: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Department</label>
                  <input required type="text" placeholder="e.g. Computer Science" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" value={newStudent.department} onChange={(e) => setNewStudent({...newStudent, department: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Year</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" value={newStudent.year} onChange={(e) => setNewStudent({...newStudent, year: e.target.value})}>
                    <option value="I">Year I</option>
                    <option value="II">Year II</option>
                    <option value="III">Year III</option>
                    <option value="IV">Year IV</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Phone</label>
                  <input required type="tel" placeholder="Mobile number" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" value={newStudent.phone} onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})} />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Primary Sport</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none" value={newStudent.sportId} onChange={(e) => setNewStudent({...newStudent, sportId: e.target.value})}>
                    {MOCK_SPORTS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full bg-amber-500 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-[0.98]">Confirm Enrollment</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
