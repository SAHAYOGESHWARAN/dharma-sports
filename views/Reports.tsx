
import React, { useState, useEffect } from 'react';
import { MOCK_SPORTS, MOCK_STUDENTS, MOCK_ATTENDANCE } from '../constants';
import { generateSmartReport } from '../services/geminiService';

const Reports: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [smartReport, setSmartReport] = useState<any>(null);

  useEffect(() => {
    const fetchReport = async () => {
      const report = await generateSmartReport(MOCK_ATTENDANCE, MOCK_STUDENTS);
      setSmartReport(report);
    };
    fetchReport();
  }, []);

  const handleDownload = (type: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`${type.toUpperCase()} Report generated and ready for download!`);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-800">Generate Report</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Report Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none">
                  <option>Daily Attendance Summary</option>
                  <option>Monthly Participation Report</option>
                  <option>Sport-wise Analysis</option>
                  <option>Departmental Ranking</option>
                  <option>Event Attendance</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Time Period</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500/20 outline-none">
                  <option>Last 7 Days</option>
                  <option>Current Month</option>
                  <option>Academic Term</option>
                  <option>Custom Range</option>
                </select>
              </div>
              <button 
                onClick={() => handleDownload('PDF')}
                disabled={isGenerating}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-3 active:scale-95"
              >
                {isGenerating ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-file-pdf"></i>}
                Export as PDF
              </button>
              <button 
                onClick={() => handleDownload('Excel')}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-3 active:scale-95 border border-slate-200"
              >
                <i className="fas fa-file-excel text-green-600"></i>
                Export as Excel
              </button>
            </div>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100">
            <h4 className="font-bold text-amber-800 mb-2">Report Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-amber-700">
                <span className="w-3 h-3 rounded bg-green-500"></span>
                <span>Above 90% (Excellent)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-700">
                <span className="w-3 h-3 rounded bg-amber-500"></span>
                <span>75% - 90% (Good)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-amber-700">
                <span className="w-3 h-3 rounded bg-rose-500"></span>
                <span>Below 75% (Shortage)</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Analytics Summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                <i className="fas fa-chart-pie text-[200px]"></i>
            </div>
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Smart Analytics Dashboard</h3>
                  <p className="text-slate-400 text-sm">Automated analysis by Gemini AI</p>
                </div>
                <div className="bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-medium backdrop-blur-md">
                   May 2024 Report
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Overall Performance</p>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-black text-amber-400">{smartReport?.overallPercentage || '84'}%</span>
                    <span className="text-xs text-green-400 mb-1 flex items-center gap-1">
                        <i className="fas fa-arrow-up"></i> 3.2%
                    </span>
                  </div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Top Performing Dept</p>
                  <h4 className="text-xl font-bold">{smartReport?.topDepartment || 'Computer Science'}</h4>
                  <p className="text-xs text-slate-400">Consistent attendance records</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <i className="fas fa-magic text-amber-400"></i>
                  <h4 className="font-bold text-sm">Executive Summary</h4>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                  <p className="text-slate-300 text-sm leading-relaxed italic">
                    {smartReport?.attendanceSummary || "Synchronizing with the latest attendance data to provide a comprehensive summary of student participation across all sports divisions..."}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                        <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?u=1" alt="" />
                        <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?u=2" alt="" />
                        <img className="w-8 h-8 rounded-full border-2 border-slate-900" src="https://i.pravatar.cc/100?u=3" alt="" />
                    </div>
                    <span className="text-xs text-slate-500 font-medium">Reports reviewed by 3 coordinators</span>
                </div>
                <div className="text-xs text-slate-500 italic">
                    Last updated: Just now
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Attendance Distribution</h3>
            <div className="space-y-6">
                {MOCK_SPORTS.map((sport, i) => (
                    <div key={i} className="space-y-2">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-slate-600">{sport.name}</span>
                            <span className="text-slate-800">85%</span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-amber-500 rounded-full" 
                                style={{ width: `${80 + (i * 5)}%`, transition: 'width 1s ease-out' }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
