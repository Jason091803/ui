import { useState } from 'react';
import { LogOut, Home, Users, ListChecks, CheckSquare, Settings, ChevronRight, AlertTriangle, Circle, Bell } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import femaleIcon1 from '../../assets/d2b0f8035a26d66fec4fcf46ab741ed497858fb8.png'; // Sample avatar replacements
import maleIcon1 from '../../assets/b2c1ba502535293778a6e73cdc21c311f5e2c010.png';
import femaleIcon2 from '../../assets/5bff0feb4470c57adb5c5b527493a9f313a06bf4.png';


interface DoctorHomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToSettings?: () => void;
}

export default function DoctorHomePage({ onNavigateToLogin, onNavigateToConnections, onNavigateToActivities, onNavigateToSettings }: DoctorHomePageProps) {
  const [activeTab, setActiveTab] = useState<'Mood' | 'Sleep' | 'Activity' | 'Symptoms' | 'Medication'>('Mood');
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [infoModalClient, setInfoModalClient] = useState<string | null>(null);

  // Hardcoded UI Data Mockup matching screenshots
  const progressData = [
    { day: 'Sat', value: 7.2 },
    { day: 'Sun', value: 7.9 },
    { day: 'Mon', value: 7.8 },
    { day: 'Tue', value: 6.8 },
    { day: 'Wed', value: 6.8 },
    { day: 'Thu', value: 6.9 },
    { day: 'Fri', value: 6.8 },
  ];

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900">
      
      {/* Top Bar */}
      <div className="px-5 py-5 pb-2 flex justify-between items-center">
        <button onClick={onNavigateToLogin} className="flex items-center gap-2 text-gray-800 font-semibold text-[15px] hover:text-[color:var(--theme-primary)] transition-colors">
           <LogOut className="w-5 h-5 rotate-180" strokeWidth={2.5} />
           Log out
        </button>
        <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative -mr-1">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-[#FDFBF7]"></span>
        </button>

      </div>

      <main className="flex-1 px-5 pb-24 max-w-md mx-auto w-full space-y-5">
        
        {/* Greeting */}
        <h1 className="text-2xl font-bold text-center tracking-tight mb-6">Good Day, Dr. testclinician!</h1>

        {/* Quick Stats Dual Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 flex flex-col items-center border border-gray-50/50">
            <h2 className="text-[15px] font-bold text-[color:var(--theme-dark)] mb-4">Created Activities</h2>
            <div className="text-3xl font-bold text-gray-900 mb-6">0</div>
            <div className="flex gap-2 w-full mt-auto">
               <button className="flex-1 border border-gray-200 text-gray-700 bg-white rounded-full py-1.5 text-xs font-semibold hover:bg-gray-50 transition-colors shadow-sm">Assign</button>
               <button className="flex-1 text-[color:var(--theme-dark)] bg-purple-100/80 rounded-full py-1.5 text-xs font-semibold hover:bg-purple-200 transition-colors">AI Create</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 flex flex-col items-center border border-gray-50/50">
            <h2 className="text-[15px] font-bold text-[color:var(--theme-dark)] mb-4 text-center">Feedback to Review</h2>
            <div className="text-3xl font-bold text-gray-900 mb-6">0</div>
            <button className="w-2/3 mt-auto text-[color:var(--theme-dark)] bg-purple-100/80 rounded-full py-1.5 text-xs font-semibold hover:bg-purple-200 transition-colors">Review</button>
          </div>
        </div>

        {/* AI Insights Module */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[color:var(--theme-primary)]/20"></div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500 fill-yellow-500/20" />
            <h2 className="text-[17px] font-bold text-[color:var(--theme-dark)]">AI Insights</h2>
          </div>
          
          <div className="space-y-3">
            <div onClick={() => setInfoModalClient('Emma L.')} className="flex items-start gap-2 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
               <AlertTriangle className="w-4 h-4 text-yellow-500 fill-yellow-500/20 flex-shrink-0 mt-0.5" />
               <p className="text-sm font-medium text-gray-700 leading-snug"><span className="font-bold text-gray-900">Emma L.</span> — mood score dropped 40% this week</p>
            </div>
            <div onClick={() => setInfoModalClient('James T.')} className="flex items-start gap-2 px-2.5 py-1.5 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
               <Circle className="w-3.5 h-3.5 text-red-500 fill-red-500 flex-shrink-0 mt-1" />
               <p className="text-sm font-medium text-gray-700 leading-snug"><span className="font-bold text-gray-900">James T.</span> — missed medication 3 days in a row</p>
            </div>
          </div>
        </div>

        {/* My Clients Module */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden pt-5 pb-2">
          {/* Subtle colored accent edge */}
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[color:var(--theme-primary)]/80"></div>
          
          <h2 className="text-[17px] font-bold text-[color:var(--theme-dark)] mb-4 px-5">My Clients</h2>
          
          <div className="divide-y divide-gray-100/80">
            {/* Client 1 */}
            <div 
              onClick={() => setSelectedClient(selectedClient === 'Emma L.' ? null : 'Emma L.')}
              className={`px-5 py-3 transition-colors flex items-center justify-between cursor-pointer ${selectedClient === 'Emma L.' ? 'bg-purple-50/50' : 'hover:bg-gray-50/50'}`}
            >
              <div className="flex items-center gap-4">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-orange-100 border border-gray-200">
                     <img src={femaleIcon1} className="w-full h-full object-cover scale-150 translate-y-2" alt="Avatar" />
                   </div>
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div>
                   <h3 className="font-bold text-[15px] mb-0.5">Emma L.</h3>
                   <p className="text-xs text-gray-500 font-medium">1/5 activities completed this week</p>
                 </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-purple-100/60 flex items-center justify-center text-[color:var(--theme-primary)] hover:bg-purple-200/80 transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Client 2 */}
            <div 
              onClick={() => setSelectedClient(selectedClient === 'James T.' ? null : 'James T.')}
              className={`px-5 py-3 transition-colors flex items-center justify-between cursor-pointer ${selectedClient === 'James T.' ? 'bg-purple-50/50' : 'hover:bg-gray-50/50'}`}
            >
              <div className="flex items-center gap-4">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-50 border border-gray-200 flex items-center justify-center">
                     <img src={maleIcon1} className="w-10 h-10 object-contain" alt="Avatar" />
                   </div>
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-yellow-400 border-2 border-white rounded-full"></div>
                 </div>
                 <div>
                   <h3 className="font-bold text-[15px] mb-0.5">James T.</h3>
                   <p className="text-xs text-gray-500 font-medium">2/5 activities completed this week</p>
                 </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-purple-100/60 flex items-center justify-center text-[color:var(--theme-primary)] hover:bg-purple-200/80 transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Client 3 */}
            <div 
              onClick={() => setSelectedClient(selectedClient === 'Sarah P.' ? null : 'Sarah P.')}
              className={`px-5 py-3 transition-colors flex items-center justify-between cursor-pointer ${selectedClient === 'Sarah P.' ? 'bg-purple-50/50' : 'hover:bg-gray-50/50'}`}
            >
              <div className="flex items-center gap-4">
                 <div className="relative">
                   <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-50 border border-gray-200 flex items-center justify-center">
                     <img src={femaleIcon2} className="w-10 h-10 object-contain" alt="Avatar" />
                   </div>
                   <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div>
                   <h3 className="font-bold text-[15px] mb-0.5">Sarah P.</h3>
                   <p className="text-xs text-gray-500 font-medium">3/4 activities completed this week</p>
                 </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-purple-100/60 flex items-center justify-center text-[color:var(--theme-primary)] hover:bg-purple-200/80 transition-colors">
                 <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Chart Module */}
        {selectedClient && (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5">
           <h2 className="text-[17px] font-bold text-[color:var(--theme-dark)] mb-3">{selectedClient}'s Progress <span className="text-gray-400 font-medium">— Last 7 Days</span></h2>
           
           <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1 mb-5">
              {['Mood', 'Sleep', 'Activity', 'Symptoms', 'Medication'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors border ${
                    activeTab === tab 
                      ? 'border-gray-800 text-gray-900 shadow-sm' 
                      : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tab}
                </button>
              ))}
           </div>

           <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--theme-primary)" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="var(--theme-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis 
                   dataKey="day" 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fill: '#6B7280', fontWeight: 500 }} 
                   dy={10} 
                />
                <YAxis 
                   domain={[5, 10]} 
                   ticks={[6, 7, 10]} 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fontSize: 11, fill: '#9CA3AF' }} 
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontSize: '13px', fontWeight: 600 }}
                   itemStyle={{ color: 'var(--theme-primary)' }}
                />
                <Area 
                   type="monotone" 
                   dataKey="value" 
                   stroke="var(--theme-primary)" 
                   strokeWidth={3} 
                   fillOpacity={1} 
                   fill="url(#colorValue)" 
                   activeDot={{ r: 6, fill: '#fff', stroke: 'var(--theme-primary)', strokeWidth: 3 }}
                   dot={{ r: 4, fill: '#fff', stroke: 'var(--theme-primary)', strokeWidth: 2.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
           </div>
           
           <div className="flex items-center justify-center mt-3 gap-2">
             <Circle className="w-2.5 h-2.5 fill-[color:var(--theme-primary)] text-[color:var(--theme-primary)]" />
             <span className="text-xs font-bold text-gray-800">{activeTab} Score</span>
           </div>
        </div>
        )}

      </main>

      {/* Client Info Modal */}
      {infoModalClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setInfoModalClient(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-[340px] p-6 shadow-2xl relative overflow-hidden" onClick={e => e.stopPropagation()}>
            <button onClick={() => setInfoModalClient(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100/80 hover:bg-gray-200 rounded-full p-2 transition-colors focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            
            <div className="text-center mb-6 mt-3">
              <div className="w-[88px] h-[88px] mx-auto bg-purple-50 rounded-full border-[5px] border-white shadow-[0_5px_15px_-5px_rgba(0,0,0,0.1)] mb-4 overflow-hidden flex items-center justify-center">
                <Users className="w-10 h-10 text-[color:var(--theme-primary)] opacity-70" />
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{infoModalClient}</h2>
              <p className="text-gray-500 font-medium text-sm mt-0.5">Therapy Patient</p>
            </div>
            
            <div className="space-y-2.5">
              <div className="bg-gray-50/80 rounded-2xl p-3.5 flex items-center justify-between">
                <div className="text-[13px] text-gray-500 font-medium">Age & Gender</div>
                <div className="font-bold text-gray-800 text-[14px]">28, Female</div>
              </div>
              <div className="bg-gray-50/80 rounded-2xl p-3.5 flex flex-col gap-1">
                <div className="text-[13px] text-gray-500 font-medium">Core Target</div>
                <div className="font-bold text-gray-800 text-[14px]">Anxiety triggers, insomnia</div>
              </div>
              <div className="bg-purple-50/50 rounded-2xl p-3.5 flex items-center justify-between border border-purple-100/50">
                <div className="text-[13px] text-gray-500 font-medium">Next Session</div>
                <div className="font-bold text-[color:var(--theme-primary)] text-[14px]">April 2, 10:00 AM</div>
              </div>
            </div>

            <button onClick={() => setInfoModalClient(null)} className="w-full mt-7 bg-[color:var(--theme-primary)] text-white font-bold py-3.5 rounded-full shadow-[0_8px_16px_-4px_var(--theme-primary)] hover:opacity-90 transition-all text-[15px]">
              Close Profile
            </button>
          </div>
        </div>
      )}

      {/* Bottom Doctor Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center max-w-md mx-auto relative px-2">
          
          <button className="flex flex-col items-center gap-1.5 text-[color:var(--theme-primary)] w-16">
            <Home className="w-[22px] h-[22px]" fill="currentColor" />
            <span className="text-[11px] font-bold">Home</span>
          </button>
          
          <button onClick={onNavigateToConnections} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors w-16">
            <Users className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Clients</span>
          </button>
          
          <button onClick={onNavigateToActivities} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors w-16">
            <ListChecks className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Activities</span>
          </button>

          <button className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors w-16">
            <CheckSquare className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Feedback</span>
          </button>
          
          <button onClick={onNavigateToSettings} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-gray-600 transition-colors w-16">
            <Settings className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
