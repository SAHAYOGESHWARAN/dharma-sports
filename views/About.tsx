
import React from 'react';

const About: React.FC = () => {
  const sections = [
    { 
      id: 1, 
      title: "Introduction", 
      icon: "fa-info-circle", 
      color: "blue",
      content: "Sports activities play a vital role in the physical and mental development of students. Managing attendance manually in sports departments is time-consuming, error-prone, and difficult to track over long periods. The Online Sports Attendance Management System is designed to automate the process of recording, managing, and monitoring student attendance for sports activities. This system provides accurate attendance records, reduces manual workload, and improves efficiency for coaches, sports coordinators, and administrators."
    },
    {
      id: 2,
      title: "Objectives",
      icon: "fa-bullseye",
      color: "green",
      list: [
        "To digitize the sports attendance process",
        "To reduce manual paperwork and human errors",
        "To provide real-time attendance tracking",
        "To generate attendance reports easily",
        "To improve transparency and data accuracy",
        "To allow access through mobile and PC devices"
      ]
    },
    {
      id: 3,
      title: "Scope",
      icon: "fa-binoculars",
      color: "purple",
      list: [
        "Student registration and profile management",
        "Sports and event management",
        "Daily attendance marking by coaches",
        "Attendance approval and verification",
        "Report generation (daily, monthly, event-wise)",
        "Secure login for Admin, Coach, and Student",
        "Web-based system accessible from any device"
      ]
    },
    {
      id: 4,
      title: "Existing System Analysis",
      icon: "fa-history",
      color: "amber",
      content: "Current Method: Attendance is recorded manually using registers. Data is difficult to store and retrieve. High chance of data loss and duplication. No centralized monitoring system. Limitations: Time-consuming process, manual errors, difficult to generate reports, no real-time updates."
    },
    {
      id: 5,
      title: "Proposed System",
      icon: "fa-laptop-code",
      color: "indigo",
      content: "The proposed system is a web-based online application that manages sports attendance digitally. The system allows coaches to mark attendance online, administrators to monitor records, and students to view their attendance status. Advantages: Fast and accurate tracking, centralized database, easy report generation, secure authentication system, accessible via mobile and PC."
    },
    {
      id: 7,
      title: "System Architecture",
      icon: "fa-sitemap",
      color: "rose",
      content: "Architecture Type: Client–Server Architecture. Components: Frontend (Web UI), Backend (Business Logic), Database (Data Storage), Authentication & Authorization Module."
    },
    {
        id: 10,
        title: "Technology Stack",
        icon: "fa-layer-group",
        color: "emerald",
        content: "Frontend: HTML, CSS, JavaScript, React. Backend: Node.js, PHP, Python. Database: MySQL, PostgreSQL. Tools: VS Code, Git, GitHub, Browser (Chrome)."
    },
    {
        id: 15,
        title: "Future Enhancements",
        icon: "fa-forward",
        color: "orange",
        list: [
            "Mobile application (Android/iOS)",
            "Biometric or QR-based attendance",
            "Push notifications",
            "Analytics dashboard",
            "Cloud deployment"
        ]
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Specifications</h1>
        <div className="w-24 h-1.5 bg-amber-500 mx-auto rounded-full"></div>
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mt-10 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                <i className="fas fa-university text-9xl"></i>
            </div>
            <p className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-4">Educational Institution</p>
            <h2 className="text-2xl font-black text-slate-800 leading-tight">Ramakrishna Mission Vidyalaya College of Arts and Science, Coimbatore</h2>
            <div className="h-px bg-slate-100 my-8 w-1/2 mx-auto"></div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Project Title</p>
            <h3 className="text-3xl font-black text-slate-900 uppercase">Online Sports Attendance Management System</h3>
            <p className="mt-8 text-sm font-bold text-slate-500">
                A digital transformation initiative by <span className="text-amber-600">Dharmaprakash</span> (Academic Year 2025-26)
            </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((sec) => (
          <section key={sec.id} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors
                    ${sec.color === 'blue' ? 'bg-blue-100 text-blue-600' : ''}
                    ${sec.color === 'green' ? 'bg-green-100 text-green-600' : ''}
                    ${sec.color === 'purple' ? 'bg-purple-100 text-purple-600' : ''}
                    ${sec.color === 'amber' ? 'bg-amber-100 text-amber-600' : ''}
                    ${sec.color === 'indigo' ? 'bg-indigo-100 text-indigo-600' : ''}
                    ${sec.color === 'rose' ? 'bg-rose-100 text-rose-600' : ''}
                    ${sec.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' : ''}
                    ${sec.color === 'orange' ? 'bg-orange-100 text-orange-600' : ''}
                `}>
                    <i className={`fas ${sec.icon} text-xl`}></i>
                </div>
                <h3 className="text-xl font-black text-slate-800">{sec.id}. {sec.title}</h3>
            </div>
            {sec.content && <p className="text-slate-600 text-sm leading-relaxed">{sec.content}</p>}
            {sec.list && (
                <ul className="space-y-3">
                    {sec.list.map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm text-slate-600">
                            <i className="fas fa-check-circle text-amber-500 mt-1 shrink-0"></i>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
          </section>
        ))}
      </div>

      <section className="bg-slate-900 text-white p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 opacity-10 pointer-events-none">
            <i className="fas fa-flag-checkered text-[300px]"></i>
        </div>
        <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-black">16. Conclusion</h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
                The Online Sports Attendance Management System provides an efficient and reliable solution for managing sports attendance digitally. 
                It reduces manual effort, improves accuracy, and ensures easy access to attendance data for all stakeholders of RMV-CAS.
            </p>
            <div className="pt-8">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 rounded-2xl border border-white/10 backdrop-blur-md">
                    <span className="text-xs font-black uppercase tracking-widest text-amber-400">Ready for Deployment</span>
                    <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                </div>
            </div>
        </div>
      </section>
      
      <footer className="text-center pt-10">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.5em]">
            © 2026 RMV-CAS Coimbatore • Developed by Dharmaprakash
        </p>
      </footer>
    </div>
  );
};

export default About;
