import { useEffect, useState } from 'react';
import { Search, ChevronRight, Home, Users, ListChecks, CheckSquare, Settings, Bell, Clock, Calendar as CalendarIcon, MoreHorizontal, Sparkles, BarChart3 } from 'lucide-react';

interface DoctorActivitiesPageProps {
  initialAction?: 'assign' | 'ai-create' | null;
  onNavigateToHome: () => void;
  onNavigateToClients?: () => void;
  onNavigateToFeedback?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
  onNavigateToSettings?: () => void;
}

export default function DoctorActivitiesPage({ initialAction, onNavigateToHome, onNavigateToClients, onNavigateToFeedback, onNavigateToCalendar, onNavigateToData, onNavigateToSettings }: DoctorActivitiesPageProps) {
  const [filter, setFilter] = useState<'total' | 'assigned' | 'templates'>('assigned');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newActivity, setNewActivity] = useState({ title: '', category: 'General', description: '', duration: '', frequency: '' });
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [assignModalActivity, setAssignModalActivity] = useState<any | null>(null);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [launchActionHandled, setLaunchActionHandled] = useState(false);

  const mockClients = [
    { id: 'c1', name: 'Emma L.', plan: 'Anxiety & Stress Management', bg: 'bg-orange-100', text: 'text-orange-700' },
    { id: 'c2', name: 'James T.', plan: 'Mood & Motivation', bg: 'bg-blue-100', text: 'text-blue-700' },
    { id: 'c3', name: 'Sarah P.', plan: 'Depression & Coping Skills', bg: 'bg-rose-100', text: 'text-rose-700' }
  ];

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(a => a.id !== id));
    setOpenMenuId(null);
  };

  const [activities, setActivities] = useState([
    {
      id: '1',
      title: 'Daily Mood Journal',
      category: 'Journaling',
      catBg: 'bg-purple-100/70 text-[color:var(--theme-primary)]',
      description: 'Record your mood, triggers, and reflections each day',
      duration: '10 min',
      frequency: 'Daily',
      clientsCount: 3,
      status: 'assigned',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3238/3238015.png', // Temporary placeholder matching visual weight
      iconBg: 'bg-[#F2EEFA]' 
    },
    {
      id: '2',
      title: '5-Minute Breathing Exercise',
      category: 'Mindfulness',
      catBg: 'bg-[#E0F2E9] text-[#2E7D32]',
      description: 'Follow a guided breathing exercise for relaxation',
      duration: '5 min',
      frequency: 'Anytime',
      clientsCount: 0,
      status: 'templates',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/3043/3043622.png',
      iconBg: 'bg-[#EBF4ED]'
    },
    {
      id: '3',
      title: 'Gratitude Reflection',
      category: 'Coping Skills',
      catBg: 'bg-[#FFF3E0] text-[#E65100]',
      description: 'Spend time reflecting on moments of gratitude each day',
      duration: '10 min',
      frequency: 'Daily',
      clientsCount: 0,
      status: 'templates',
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/2926/2926280.png',
      iconBg: 'bg-[#FFF8E7]'
    }
  ]);

  const totalCount = activities.length;
  const assignedCount = activities.filter(a => a.status === 'assigned').length;
  const templatesCount = activities.filter(a => a.status === 'templates').length;

  const filteredActivities = activities.filter(a => {
    if (filter === 'templates' && a.status !== 'templates') return false;
    if (filter === 'assigned' && a.status !== 'assigned') return false;
    if (searchQuery && !a.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  useEffect(() => {
    if (launchActionHandled || !initialAction) {
      return;
    }

    if (initialAction === 'ai-create') {
      setShowAiModal(true);
      setShowCreateModal(false);
      setAssignModalActivity(null);
      setLaunchActionHandled(true);
      return;
    }

    if (initialAction === 'assign' && activities.length > 0) {
      setAssignModalActivity(activities[0]);
      setShowAiModal(false);
      setShowCreateModal(false);
      setLaunchActionHandled(true);
    }
  }, [activities, initialAction, launchActionHandled]);

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900 pb-[90px] relative">
      {/* Header */}
      <header className="px-5 py-5 flex items-center justify-between pb-3">
        <div className="w-[84px]"></div> {/* spacer for center alignment targeting exact visually balance against left offset vs right button */}
        <h1 className="text-[22px] font-bold text-center tracking-tight text-gray-900 absolute left-1/2 -translate-x-1/2">My Activity Library</h1>
        <button onClick={() => setShowCreateModal(true)} className="bg-[color:var(--theme-dark)] text-white text-[14px] font-semibold py-2 px-3.5 rounded-xl shadow-sm hover:opacity-90 transition-colors z-10 flex items-center justify-center gap-1">
           <span className="text-lg leading-none">+</span> Create
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 px-5 max-w-md mx-auto w-full flex flex-col gap-4 relative">
        
        {/* Search */}
        <div className="relative flex items-center">
          <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[22px] h-[22px] text-gray-500" />
             <input 
               type="text" 
               placeholder="Search activities..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full pl-12 pr-[90px] py-4 rounded-[20px] bg-white shadow-sm text-gray-800 placeholder:text-gray-500 font-medium focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)]/20"
             />
             <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-purple-50 text-[color:var(--theme-dark)] px-4 py-2 rounded-xl text-[14px] font-semibold hover:bg-purple-100 transition-colors flex items-center gap-1.5 shadow-[0_2px_10px_-4px_var(--theme-primary)]">
               Filter <ChevronRight className="w-[14px] h-[14px]" />
             </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2.5 w-full mt-2 no-scrollbar py-1 shrink-0">
           <button 
             onClick={() => setFilter('total')}
             className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'total' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}
           >
              {totalCount} Total
           </button>
           <button 
             onClick={() => setFilter('assigned')}
             className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'assigned' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}
           >
              {assignedCount} Assigned
           </button>
           <button 
             onClick={() => setFilter('templates')}
             className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'templates' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}
           >
              {templatesCount} Templates
           </button>
        </div>

        {/* Activity Cards List */}
        <div className="flex flex-col gap-4 mt-2">
           {filteredActivities.map(activity => (
             <div key={activity.id} className="bg-white rounded-3xl shadow-[0_4px_25px_-5px_rgba(0,0,0,0.06)] p-5 relative cursor-pointer hover:shadow-[0_8px_30px_-5px_rgba(0,0,0,0.08)] transition-all">
               
               <div className="flex justify-between items-start mb-3 relative z-10" onClick={() => setAssignModalActivity(activity)}>
                 <div className="flex gap-4">
                    <div className={`w-[72px] h-[72px] rounded-2xl flex flex-shrink-0 items-center justify-center opacity-90 ${activity.iconBg}`}>
                      {/* Utilizing a generic icon mapping for placeholder perfection without missing file errors */}
                      {activity.id === '1' && <ListChecks className="w-10 h-10 text-[color:var(--theme-primary)] opacity-70" />}
                      {activity.id === '2' && <div className="text-teal-600 font-extrabold text-3xl opacity-60">🧘</div>}
                      {activity.id === '3' && <div className="text-orange-500 font-extrabold text-3xl opacity-60">🌻</div>}
                    </div>
                    <div className="pr-6">
                      <h2 className="text-[18px] font-semibold text-gray-900 leading-tight mb-1.5">{activity.title}</h2>
                      <span className={`inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase ${activity.catBg} mb-2`}>
                        {activity.category}
                      </span>
                      <p className="text-[14px] text-gray-600 font-medium leading-[1.35]">{activity.description}</p>
                    </div>
                 </div>
                 
                 {/* Elipsis Action Menu Placeholder */}
                 <div className="absolute right-4 top-4">
                   <button 
                     onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === activity.id ? null : activity.id); }}
                     className="text-gray-400 hover:text-gray-700 bg-gray-50/50 hover:bg-gray-100 rounded-full p-1.5 transition-colors relative z-20"
                   >
                      <MoreHorizontal className="w-[22px] h-[22px]" />
                   </button>
                   {openMenuId === activity.id && (
                     <>
                       {/* Transparent Backdrop to dismiss dropdown by clicking away */}
                       <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setOpenMenuId(null); }}></div>
                       
                       {/* Floating Dropdown Frame */}
                       <div className="absolute right-0 mt-2 w-32 bg-white rounded-[14px] shadow-[0_5px_15px_rgba(0,0,0,0.08)] py-1.5 z-40 border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
                         <button 
                           onClick={(e) => { e.stopPropagation(); handleDeleteActivity(activity.id); }}
                           className="w-full text-left px-4 py-2.5 text-[13.5px] text-red-600 hover:bg-red-50 hover:text-red-700 font-bold transition-colors"
                         >
                           Delete
                         </button>
                       </div>
                     </>
                   )}
                 </div>
               </div>

               {/* Meta Data Row bottom */}
               <div className="flex items-center gap-4 mt-4 ml-[88px] text-[13.5px] text-[#4A4A4A] font-semibold relative z-10" onClick={() => setAssignModalActivity(activity)}>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-[15px] h-[15px] text-gray-500 opacity-80" strokeWidth={2.5} />
                    {activity.duration}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-[15px] h-[15px] text-gray-500 opacity-80" strokeWidth={2.5} />
                    {activity.frequency}
                  </div>
                  <div className="flex items-center gap-1.5 ml-0.5">
                    <Users className="w-[15px] h-[15px] text-gray-500 opacity-80" strokeWidth={2.5} fill="currentColor" />
                    {activity.clientsCount} clients
                  </div>
               </div>

             </div>
           ))}
        </div>
      </main>

      {/* Create Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Create New Template</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-gray-400 hover:text-gray-600 focus:outline-none bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4">
               <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Activity Name</label>
                  <input type="text" value={newActivity.title} onChange={e => setNewActivity({...newActivity, title: e.target.value})} placeholder="e.g., Morning Meditation" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all font-semibold text-gray-900" />
               </div>
               
               <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Category</label>
                  <select value={newActivity.category} onChange={e => setNewActivity({...newActivity, category: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all font-semibold text-gray-900 appearance-none">
                     <option>Journaling</option>
                     <option>Mindfulness</option>
                     <option>Coping Skills</option>
                     <option>General</option>
                  </select>
               </div>
               
               <div>
                  <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Instructions</label>
                  <textarea rows={3} value={newActivity.description} onChange={e => setNewActivity({...newActivity, description: e.target.value})} placeholder="Briefly describe the tasks involved..." className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all font-semibold text-gray-900 resize-none"></textarea>
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Duration</label>
                    <input type="text" value={newActivity.duration} onChange={e => setNewActivity({...newActivity, duration: e.target.value})} placeholder="e.g., 10 min" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all font-semibold text-gray-900" />
                 </div>
                 <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-1.5 uppercase tracking-wide">Frequency</label>
                    <input type="text" value={newActivity.frequency} onChange={e => setNewActivity({...newActivity, frequency: e.target.value})} placeholder="e.g., Daily" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all font-semibold text-gray-900" />
                 </div>
               </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0 pb-8">
               <button 
                 onClick={() => {
                   if(newActivity.title.trim()) {
                     const created = {
                       id: Date.now().toString(),
                       title: newActivity.title,
                       category: newActivity.category,
                       catBg: 'bg-indigo-100/70 text-indigo-700',
                       description: newActivity.description || 'No description provided.',
                       duration: newActivity.duration || 'N/A',
                       frequency: newActivity.frequency || 'As needed',
                       clientsCount: 0,
                       status: 'templates' as const,
                       iconUrl: 'https://cdn-icons-png.flaticon.com/512/3238/3238015.png',
                       iconBg: 'bg-indigo-50'
                     };
                     setActivities([created, ...activities]);
                     setShowCreateModal(false);
                     setNewActivity({ title: '', category: 'General', description: '', duration: '', frequency: '' });
                     if (initialAction === 'ai-create') {
                       onNavigateToHome();
                     }
                   }
                 }}
                 className="w-full bg-[color:var(--theme-primary)] text-white font-bold text-[15px] py-3.5 rounded-xl shadow-md shadow-purple-900/10 hover:bg-[color:var(--theme-dark)] transition-colors"
               >
                 Save as Template
               </button>
            </div>
          </div>
        </div>
      )}
      {/* Assign Activity Modal */}
      {assignModalActivity && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-5 duration-300">
            <div className="flex justify-between items-center px-6 py-5 border-b border-gray-100 shrink-0">
              <div>
                 <h2 className="text-xl font-bold text-gray-900 leading-tight">Assign Activity</h2>
                 <p className="text-[13px] text-gray-500 font-medium truncate max-w-[280px] mt-0.5">{assignModalActivity.title}</p>
              </div>
              <button onClick={() => setAssignModalActivity(null)} className="text-gray-400 hover:text-gray-600 focus:outline-none bg-gray-50 hover:bg-gray-100 p-1.5 rounded-full transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto space-y-2">
               <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-3 px-2">Select a Client</h3>
               {mockClients.map(client => (
                 <div key={client.id} className="flex items-center justify-between p-3.5 rounded-3xl border border-gray-100 hover:bg-gray-50 hover:border-purple-200 transition-all cursor-pointer group shadow-sm hover:shadow-md" onClick={() => {
                   setAssignModalActivity(null);
                   if (initialAction === 'assign') {
                     onNavigateToHome();
                   }
                 }}>
                   <div className="flex items-center gap-3.5">
                     <div className={`w-[46px] h-[46px] rounded-full flex items-center justify-center font-bold text-lg ${client.bg} ${client.text}`}>
                       {client.name.charAt(0)}
                     </div>
                     <div>
                       <h4 className="text-[15px] font-bold text-gray-900">{client.name}</h4>
                       <p className="text-[12.5px] text-gray-500 font-medium">{client.plan}</p>
                     </div>
                   </div>
                   <button className="bg-white border border-gray-200 text-gray-700 px-4 py-1.5 rounded-[12px] text-[13px] font-bold shadow-sm group-hover:bg-[color:var(--theme-primary)] group-hover:text-white group-hover:border-transparent transition-all pointer-events-none">
                     Assign
                   </button>
                 </div>
               ))}
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 shrink-0 pb-8 text-center rounded-b-3xl">
              <p className="text-[12px] text-gray-400 font-semibold">Activity will be instantly pushed to the client's companion app.</p>
            </div>
          </div>
        </div>
      )}

      {/* AI Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-[#2B1B54]/40 backdrop-blur-sm sm:items-center p-0 transition-opacity animate-in fade-in duration-200">
          <div className="bg-white rounded-t-[32px] sm:rounded-3xl w-full max-w-md shadow-2xl relative flex flex-col animate-in slide-in-from-bottom-8 duration-300">
            <div className="px-6 pt-7 pb-4">
              <div className="flex justify-between items-center mb-4">
                 <div className="flex items-center gap-2.5">
                   <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                     <Sparkles className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                   </div>
                   <h2 className="text-[22px] font-extrabold text-gray-900 tracking-tight">AI Co-pilot</h2>
                 </div>
                 <button onClick={() => setShowAiModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                   <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                 </button>
              </div>

              <p className="text-[14px] text-gray-600 font-medium leading-relaxed mb-5">
                Generate a custom therapy activity. Click a patient to use their latest clinical context, or type a custom prompt.
              </p>

              {/* Patient Context Chips */}
              <div className="mb-5">
                <h3 className="text-[12px] font-extrabold text-gray-400 uppercase tracking-wider mb-2.5">Patient Contextual Prompts</h3>
                <div className="flex flex-wrap gap-2.5">
                   {mockClients.map(c => (
                     <button 
                       key={c.id}
                       onClick={() => setAiPrompt(`Design a specialized activity for ${c.name} focusing on ${c.plan}.`)}
                       className="bg-purple-50 text-[13px] font-bold text-[color:var(--theme-dark)] px-3.5 py-2 rounded-[12px] border border-purple-100 hover:bg-purple-100 hover:scale-[1.02] transition-all text-left leading-tight shadow-sm"
                     >
                       {c.name.split(' ')[0]}'s {c.plan.split(' ')[0]}
                     </button>
                   ))}
                </div>
              </div>

              {/* Prompt Input */}
              <div className="mb-4 relative">
                <textarea 
                  rows={3} 
                  value={aiPrompt}
                  onChange={e => setAiPrompt(e.target.value)}
                  placeholder="e.g., 'Create a 5-min progressive muscle relaxation script...'" 
                  className="w-full px-4 py-3.5 pl-4 pr-12 bg-white border-2 border-gray-100 rounded-[18px] focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-4 focus:ring-[color:var(--theme-primary)]/10 transition-all font-medium text-[14.5px] text-gray-900 resize-none shadow-sm"
                ></textarea>
                <div className="absolute right-3 top-3.5 p-1.5 bg-gray-50 rounded-xl">
                  <Sparkles className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-gray-50 bg-gray-50/50 pb-8 rounded-b-[32px] sm:rounded-b-3xl">
               <button 
                 disabled={!aiPrompt.trim() || isGenerating}
                 onClick={() => {
                   setIsGenerating(true);
                   setTimeout(() => {
                     setNewActivity({
                       title: 'AI Generated: Contextual Grounding',
                       category: 'Mindfulness',
                       description: `Tailored guided exercise based on your prompt:\n\n1. Find a quiet and safe space free from distractions.\n2. Breathe deeply for 4 slow counts.\n3. Identify 5 things you can see, 4 you can touch...\n\n(AI Context: Utilizing established grounding frameworks to lower acute anxiety spikes.)`,
                       duration: '7 min',
                       frequency: 'When triggered'
                     });
                     setIsGenerating(false);
                     setShowAiModal(false);
                     setShowCreateModal(true); // Open native editor for review
                   }, 1500);
                 }}
                 className="w-full relative bg-[color:var(--theme-dark)] text-white font-bold text-[15px] py-3.5 rounded-[16px] shadow-lg shadow-purple-900/20 hover:opacity-90 disabled:opacity-50 transition-all overflow-hidden flex items-center justify-center gap-2"
               >
                 {isGenerating ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Generating...
                   </>
                 ) : (
                   <>
                     Generate Magic Draft <Sparkles className="w-4 h-4 fill-white" />
                   </>
                 )}
                 {isGenerating && <div className="absolute inset-0 bg-white/20 animate-pulse"></div>}
               </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Create FAB Fixed outside content bounds to stay at corner overlaying all */}
      <button onClick={() => setShowAiModal(true)} className="fixed bottom-[84px] right-3 w-[72px] h-[72px] bg-[color:var(--theme-dark)] hover:scale-105 active:scale-95 transition-all rounded-full flex flex-col items-center justify-center shadow-[0_10px_25px_-5px_rgba(76,44,143,0.5)] z-40 border-4 border-[#FDFBF7]">
        <Sparkles className="w-[26px] h-[26px] text-[#FFD700] fill-[#FFD700]" />
        <span className="text-[10px] text-white font-extrabold tracking-tight mt-[1px]">AI Create</span>
      </button>

      {/* Bottom Doctor Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center max-w-md mx-auto relative px-2">
          
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <Home className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Home</span>
          </button>
          
          <button onClick={onNavigateToClients} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-16">
            <Users className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Clients</span>
          </button>
          
          <button className="flex flex-col items-center gap-1.5 text-[color:var(--theme-primary)] w-16">
            <ListChecks className="w-[22px] h-[22px]" fill="currentColor" />
            <span className="text-[11px] font-bold">Activities</span>
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
