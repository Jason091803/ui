import { useState } from 'react';
import { Search, ChevronRight, Home, Users, ListChecks, CheckSquare, Settings, Clock, BarChart3, Calendar as CalendarIcon } from 'lucide-react';

import femaleIcon1 from '../../assets/d2b0f8035a26d66fec4fcf46ab741ed497858fb8.png'; 
import maleIcon1 from '../../assets/b2c1ba502535293778a6e73cdc21c311f5e2c010.png';
import femaleIcon2 from '../../assets/5bff0feb4470c57adb5c5b527493a9f313a06bf4.png';

interface DoctorClientsPageProps {
  onNavigateToHome: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToFeedback?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
  onNavigateToSettings?: () => void;
}

export default function DoctorClientsPage({ onNavigateToHome, onNavigateToActivities, onNavigateToFeedback, onNavigateToCalendar, onNavigateToData, onNavigateToSettings }: DoctorClientsPageProps) {
  const [filter, setFilter] = useState<'attention' | 'track' | 'completed' | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<any | null>(null);
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [addClientSearch, setAddClientSearch] = useState('');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [assignActivityToClient, setAssignActivityToClient] = useState<any | null>(null);

  const mockActivities = [
    { id: 'a1', title: 'Daily Mood Journal', category: 'Journaling', duration: '10 min', icon: '📝', bg: 'bg-purple-100', text: 'text-purple-700' },
    { id: 'a2', title: '5-Min Breathing', category: 'Mindfulness', duration: '5 min', icon: '🧘', bg: 'bg-emerald-100', text: 'text-emerald-700' },
    { id: 'a3', title: 'Gratitude Reflection', category: 'Coping Skills', duration: '10 min', icon: '🌻', bg: 'bg-orange-100', text: 'text-orange-700' }
  ];

  const [clients, setClients] = useState([
    {
      id: '1',
      name: 'Emma L.',
      plan: 'Anxiety & Stress Management',
      avatar: femaleIcon1,
      bg: 'bg-orange-100',
      completed: 2,
      total: 5,
      lastActive: '2 hours ago',
      status: 'attention' // red
    },
    {
      id: '2',
      name: 'James T.',
      plan: 'Mood & Motivation',
      avatar: maleIcon1,
      bg: 'bg-blue-50',
      completed: 2,
      total: 5,
      lastActive: '4 hours ago',
      status: 'track' // yellow
    },
    {
      id: '3',
      name: 'Sarah P.',
      plan: 'Depression & Coping Skills',
      avatar: femaleIcon2,
      bg: 'bg-rose-50',
      completed: 4,
      total: 4,
      lastActive: '6 hours ago',
      status: 'completed' as const // green
    }
  ]);

  const filteredClients = clients.filter(c => {
    if (filter !== 'all' && c.status !== filter) return false;
    if (selectedCategory && !c.plan.toLowerCase().includes(selectedCategory.toLowerCase())) return false;
    if (searchQuery && !c.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="px-5 py-5 flex items-center justify-between">
        <div className="w-24"></div> {/* spacer */}
        <h1 className="text-[22px] font-bold text-center tracking-tight text-gray-900 flex-1">My Clients</h1>
        <button onClick={() => setShowAddClientModal(true)} className="bg-[color:var(--theme-dark)] text-white text-sm font-semibold py-2 px-3.5 rounded-xl shadow-sm hover:opacity-90 transition-colors">
           + Add Client
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 px-5 max-w-md mx-auto w-full flex flex-col gap-4">
        
        {/* Search */}
        <div className="relative flex items-center">
          <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
             <input 
               type="text" 
               placeholder="Search clients..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)]/20"
             />
             <button 
               onClick={() => setShowCategoryFilter(!showCategoryFilter)}
               className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 rounded-xl text-[13px] font-semibold transition-colors flex items-center gap-1 ${showCategoryFilter || selectedCategory ? 'bg-[color:var(--theme-dark)] text-white shadow-md' : 'bg-purple-50 text-[color:var(--theme-dark)] hover:bg-purple-100 shadow-[0_2px_10px_-4px_var(--theme-primary)]'}`}
             >
               Filter <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showCategoryFilter ? 'rotate-90' : ''}`} />
             </button>
          </div>
          
          {/* Category Dropdown Area */}
          {showCategoryFilter && (
            <div className="absolute top-full right-0 mt-3 bg-white w-[200px] rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
               <h3 className="text-[11px] font-extrabold text-gray-400 uppercase tracking-widest px-3 py-2">Condition</h3>
               {['Anxiety', 'Depression', 'Mood', 'Stress', 'Assessment'].map(cat => (
                 <button 
                   key={cat}
                   onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                   className={`w-full text-left px-3 py-2.5 rounded-xl text-[13.5px] font-bold transition-all ${selectedCategory === cat ? 'bg-purple-50 text-[color:var(--theme-dark)]' : 'text-gray-700 hover:bg-gray-50'}`}
                 >
                   {cat}
                   {selectedCategory === cat && <CheckSquare className="w-4 h-4 inline-block float-right text-[color:var(--theme-primary)]" />}
                 </button>
               ))}
               <div className="h-px bg-gray-100 my-1 mx-2"></div>
               <button 
                 onClick={() => { setSelectedCategory(null); setShowCategoryFilter(false); }} 
                 className="w-full text-left px-3 py-2 rounded-xl text-[13px] font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
               >
                 Clear Filter
               </button>
            </div>
          )}
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 w-full mt-1 overflow-x-auto no-scrollbar py-1">
           <button 
             onClick={() => setFilter(filter === 'attention' ? 'all' : 'attention')}
             className={`flex-1 min-w-[30%] py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-center transition-all border ${filter === 'attention' ? 'bg-[#EE5352] text-white border-[#EE5352] shadow-md shadow-red-500/20 scale-[1.02]' : 'bg-[#EF5350] border-transparent text-[#FFE5E5] hover:bg-[#EE5352] shadow-sm'}`}
           >
              3 Needs Attention
           </button>
           <button 
             onClick={() => setFilter(filter === 'track' ? 'all' : 'track')}
             className={`flex-1 min-w-[30%] py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-center transition-all border ${filter === 'track' ? 'bg-[#FFCC52] text-[#604217] border-[#FCCC57] shadow-md shadow-yellow-500/20 scale-[1.02]' : 'bg-[#FCCC57] border-transparent text-[#795B2A] hover:bg-[#FFCC52] shadow-sm'}`}
           >
              5 On Track
           </button>
           <button 
             onClick={() => setFilter(filter === 'completed' ? 'all' : 'completed')}
             className={`flex-1 min-w-[30%] py-2.5 px-2 rounded-xl text-[11px] font-extrabold text-center transition-all border ${filter === 'completed' ? 'bg-[#92D050] text-[#FFFFFF] border-[#9CCC65] shadow-md shadow-green-500/20 scale-[1.02]' : 'bg-[#A3D977] border-transparent text-[#3A7612] hover:bg-[#92D050] shadow-sm'}`}
           >
              8 Completed All
           </button>
        </div>

        {/* Client Cards List */}
        <div className="flex flex-col gap-4 mt-2">
           {filteredClients.map(client => (
             <div key={client.id} className="bg-white rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-5 relative cursor-pointer border border-gray-50 hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.05)] transition-all">
               
               {/* Clickable Card Body */}
               <div className="flex justify-between items-start mb-4 relative z-10" onClick={() => setSelectedClient(client)}>
                 <div className="flex items-center gap-4">
                    <div className={`w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 border-gray-50 overflow-hidden ${client.bg}`}>
                      <img src={client.avatar} alt={client.name} className="w-12 h-12 object-contain scale-[1.1]" />
                    </div>
                    <div>
                      <h2 className="text-[17px] font-bold text-gray-900 mb-0.5">{client.name}</h2>
                      <p className="text-[13px] text-gray-500 font-medium">{client.plan}</p>
                    </div>
                 </div>

                 {/* Right status elements (Dot and Chevron) */}
                 <div className="flex flex-col items-center justify-center gap-2 pt-1 h-full pr-1">
                    {client.status === 'attention' && <div className="w-[11px] h-[11px] rounded-full bg-[#E53935]"></div>}
                    {client.status === 'track' && <div className="w-[11px] h-[11px] rounded-full bg-[#FBC02D]"></div>}
                    {client.status === 'completed' && <div className="w-[11px] h-[11px] rounded-full bg-[#43A047]"></div>}
                    <ChevronRight className="w-5 h-5 text-gray-700 translate-y-1" strokeWidth={2.5} />
                 </div>
               </div>

               {/* Progress Area */}
               <div className="pr-[90px] relative z-10" onClick={() => setSelectedClient(client)}>
                 {/* Custom Progress Bar Segmented */}
                 <div className="w-full h-2 bg-[#F3E8FF] rounded-full flex overflow-hidden mb-2.5">
                   {client.status === 'attention' && (
                     <div className="h-full bg-[#EF5350] rounded-full" style={{width: `${(client.completed / client.total) * 100}%`}}></div>
                   )}
                   {client.status === 'track' && (
                     <div className="h-full bg-[#FBC02D] rounded-full" style={{width: `${(client.completed / client.total) * 100}%`}}></div>
                   )}
                   {client.status === 'completed' && (
                     <div className="h-full bg-[#66BB6A] rounded-full" style={{width: `100%`}}></div>
                   )}
                 </div>
                 
                 <p className="text-[12.5px] text-gray-700 font-medium mb-1">
                   {client.completed}/{client.total} activities completed this week
                 </p>
                 <p className="text-[12px] text-gray-400 font-medium">
                   Last active: {client.lastActive}
                 </p>
               </div>

               {/* Absolute Assign Button at bottom right */}
               <button 
                 onClick={(e) => { e.stopPropagation(); setAssignActivityToClient(client); }} 
                 className="absolute bottom-5 right-5 bg-purple-50 text-[color:var(--theme-dark)] px-4 py-1.5 rounded-[10px] text-[13px] font-semibold border-2 border-white shadow-[0_2px_8px_-2px_var(--theme-primary)] hover:bg-purple-100 transition-colors z-20"
               >
                 Assign
               </button>

             </div>
           ))}
        </div>

      </main>

      {/* Assign Activity Modal */}
      {assignActivityToClient && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#2B1B54]/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200" onClick={() => setAssignActivityToClient(null)}>
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 duration-300 overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10 shrink-0">
              <div>
                 <h2 className="text-[19px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">Assign Activity</h2>
                 <p className="text-[13px] text-gray-500 font-medium leading-none mt-1.5">Select a task for <b>{assignActivityToClient.name}</b></p>
              </div>
              <button onClick={() => setAssignActivityToClient(null)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-3 w-full flex-1">
               {mockActivities.map(activity => (
                 <div key={activity.id} className="flex items-center justify-between p-3.5 rounded-2xl border border-gray-100 hover:bg-gray-50 hover:border-purple-200 transition-all cursor-pointer group shadow-sm hover:shadow-md" onClick={() => { setAssignActivityToClient(null); }}>
                   <div className="flex items-center gap-3.5 flex-1 pr-3">
                     <div className={`w-[46px] h-[46px] rounded-full flex shrink-0 items-center justify-center font-bold text-2xl ${activity.bg} ${activity.text}`}>
                       {activity.icon}
                     </div>
                     <div className="min-w-0">
                       <h4 className="text-[15px] font-bold text-gray-900 leading-tight truncate">{activity.title}</h4>
                       <div className="flex items-center gap-2 mt-1 truncate">
                         <span className="text-[11.5px] font-bold text-gray-500 uppercase tracking-wide shrink-0">{activity.category}</span>
                         <span className="w-1 h-1 rounded-full bg-gray-300 shrink-0"></span>
                         <span className="text-[11.5px] font-medium text-gray-500 shrink-0">{activity.duration}</span>
                       </div>
                     </div>
                   </div>
                   <button className="bg-white border shrink-0 text-[13px] font-extrabold border-gray-200 text-gray-700 px-4 py-1.5 rounded-[12px] shadow-sm group-hover:bg-[color:var(--theme-primary)] group-hover:text-white group-hover:border-transparent transition-all pointer-events-none">
                     Assign
                   </button>
                 </div>
               ))}
               
               <button onClick={() => setAssignActivityToClient(null)} className="w-full mt-2 bg-gray-50 text-gray-500 border-2 border-dashed border-gray-200 font-bold text-[14px] py-4 rounded-[16px] hover:bg-gray-100 hover:text-gray-700 transition-all flex items-center justify-center gap-2">
                 + Create New Activity
               </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#2B1B54]/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col h-[75vh] sm:h-auto sm:max-h-[85vh] animate-in slide-in-from-bottom-8 duration-300">
            <div className="px-6 pt-7 pb-4">
              <div className="flex justify-between items-center mb-5">
                 <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight">Add New Client</h2>
                 <button onClick={() => { setShowAddClientModal(false); setAddClientSearch(''); }} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 </button>
              </div>

              {/* Search Bar */}
              <div className="relative flex items-center mb-4">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-gray-400" />
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Search by name or email..." 
                   value={addClientSearch}
                   onChange={(e) => setAddClientSearch(e.target.value)}
                   className="w-full pl-12 pr-4 py-4 rounded-[18px] bg-gray-50 border-2 border-gray-100 text-gray-800 placeholder:text-gray-400 font-medium focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-4 focus:ring-[color:var(--theme-primary)]/10 transition-all"
                 />
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 bg-gray-50/50 border-t border-gray-50 rounded-b-[32px] sm:rounded-b-3xl">
               <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-4 px-1">
                 {addClientSearch.length > 0 ? 'Search Results' : 'Suggested Patients on Waitlist'}
               </h3>
               
               <div className="flex flex-col gap-3">
                 {[
                   { id: 'new1', name: 'Michael C.', email: 'michael.c@example.com', tag: 'New Referral' },
                   { id: 'new2', name: 'Olivia R.', email: 'olivia.r@example.com', tag: 'Waitlist' },
                   { id: 'new3', name: 'David W.', email: 'david.w@example.com', tag: 'Returning' }
                 ].filter(mockC => mockC.name.toLowerCase().includes(addClientSearch.toLowerCase()) || mockC.email.toLowerCase().includes(addClientSearch.toLowerCase())).map(mockC => (
                   <div key={mockC.id} className="bg-white border border-gray-100 rounded-2xl p-3.5 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex items-center gap-3.5">
                       <div className="w-[42px] h-[42px] rounded-full bg-purple-100 text-[color:var(--theme-dark)] font-extrabold text-[16px] flex items-center justify-center">
                         {mockC.name.charAt(0)}
                       </div>
                       <div>
                         <h4 className="text-[15px] font-bold text-gray-900 leading-tight mb-0.5">{mockC.name}</h4>
                         <p className="text-[12px] text-gray-500 font-medium">{mockC.email}</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => {
                         const newClientObj = {
                           id: Date.now().toString(),
                           name: mockC.name,
                           plan: 'Initial Assessment Phase',
                           avatar: femaleIcon2,
                           bg: 'bg-purple-50',
                           completed: 0,
                           total: 0,
                           lastActive: 'Just joined',
                           status: 'track' as const
                         };
                         setClients([newClientObj, ...clients]);
                         setShowAddClientModal(false);
                         setAddClientSearch('');
                       }}
                       className="bg-white text-[color:var(--theme-dark)] border-2 border-[color:var(--theme-primary)]/20 hover:bg-[color:var(--theme-primary)] hover:border-transparent hover:text-white px-4 py-1.5 rounded-xl text-[13px] font-extrabold transition-all"
                     >
                       Add
                     </button>
                   </div>
                 ))}
                 
                 {addClientSearch && [
                   { id: 'new1', name: 'Michael C.' },
                   { id: 'new2', name: 'Olivia R.' },
                   { id: 'new3', name: 'David W.' }
                 ].filter(mockC => mockC.name.toLowerCase().includes(addClientSearch.toLowerCase())).length === 0 && (
                   <div className="text-center py-8 text-gray-400 font-medium tracking-tight">
                     No patients found matching "{addClientSearch}"
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Progress Modal */}
      {selectedClient && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#2B1B54]/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-8 duration-300 overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-gray-50 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3.5">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden ${selectedClient.bg}`}>
                  <img src={selectedClient.avatar} alt={selectedClient.name} className="w-[110%] h-[110%] object-contain scale-[1.1]" />
                </div>
                <div>
                  <h2 className="text-[19px] font-extrabold text-gray-900 tracking-tight leading-none mb-1">{selectedClient.name}</h2>
                  <p className="text-[13px] text-gray-500 font-medium leading-none">{selectedClient.plan}</p>
                </div>
              </div>
              <button onClick={() => setSelectedClient(null)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto w-full flex-1">
               <h3 className="text-[13px] font-extrabold text-gray-400 uppercase tracking-wider mb-4 px-1">Weekly Activity Log</h3>
               
               <div className="flex flex-col gap-3.5">
                 {/* Completed Item */}
                 <div className="bg-green-50/50 border border-green-100/60 rounded-[18px] p-4 flex items-center justify-between hover:bg-green-50 transition-colors">
                   <div className="flex items-center gap-3.5">
                     <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                       <CheckSquare className="w-5 h-5 text-green-600" />
                     </div>
                     <div>
                       <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">Morning Check-in</h4>
                       <p className="text-[12.5px] text-gray-500 font-medium">Today • 8:30 AM</p>
                     </div>
                   </div>
                   <div className="bg-green-100/80 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                     Completed
                   </div>
                 </div>

                 {/* Pending Item */}
                 <div className="bg-yellow-50/50 border border-yellow-100/60 rounded-[18px] p-4 flex items-center justify-between hover:bg-yellow-50 transition-colors">
                   <div className="flex items-center gap-3.5">
                     <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                       <Clock className="w-5 h-5 text-yellow-600" />
                     </div>
                     <div>
                       <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">Breathing Exercise</h4>
                       <p className="text-[12.5px] text-gray-500 font-medium">Today • Anytime</p>
                     </div>
                   </div>
                   <div className="bg-yellow-100 text-yellow-700 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                     Pending
                   </div>
                 </div>

                 {/* Missed Item */}
                 <div className="bg-red-50/50 border border-red-100/60 rounded-[18px] p-4 flex items-center justify-between opacity-90 hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-3.5">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                       <div className="w-5 h-5 text-red-600 font-extrabold text-lg flex items-center justify-center leading-none select-none -translate-y-[1px]">!</div>
                     </div>
                     <div>
                       <h4 className="text-[15px] font-bold text-gray-900 mb-0.5">Evening Reflection</h4>
                       <p className="text-[12.5px] text-gray-500 font-medium">Yesterday • 8:00 PM</p>
                     </div>
                   </div>
                   <div className="bg-red-100/80 text-red-700 text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                     Missed
                   </div>
                 </div>
               </div>
               
               <div className="mt-8 mb-4">
                 <button className="w-full relative bg-purple-50 text-[color:var(--theme-dark)] border-2 border-[color:var(--theme-dark)]/10 text-[15px] py-3.5 rounded-[16px] hover:bg-purple-100 transition-all flex items-center justify-center gap-2 shadow-sm font-extrabold pb-4" style={{ lineHeight: '1.2' }}>
                   Message {selectedClient.name.split(' ')[0]}
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Doctor Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center max-w-md mx-auto relative px-2">
          
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <Home className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Home</span>
          </button>
          
          <button className="flex flex-col items-center gap-1.5 text-[color:var(--theme-primary)] w-16">
            <Users className="w-[22px] h-[22px]" fill="currentColor" />
            <span className="text-[11px] font-bold">Clients</span>
          </button>
          
          <button onClick={onNavigateToActivities} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <ListChecks className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Activities</span>
          </button>

          <button onClick={onNavigateToFeedback} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <CheckSquare className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Feedback</span>
          </button>

          <button onClick={onNavigateToCalendar} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <CalendarIcon className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Calendar</span>
          </button>

          <button onClick={onNavigateToData} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <BarChart3 className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Data</span>
          </button>
          
          <button onClick={onNavigateToSettings} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <Settings className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>

    </div>
  );
}
