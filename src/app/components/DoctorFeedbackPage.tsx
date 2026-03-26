import { useState } from 'react';
import { Bell, Home, Users, ListChecks, CheckSquare, Settings, BarChart3, ChevronDown, MessageSquareQuote, Clock, CheckCircle2 } from 'lucide-react';

interface DoctorFeedbackPageProps {
  onNavigateToHome: () => void;
  onNavigateToClients: () => void;
  onNavigateToActivities: () => void;
  onNavigateToData: () => void;
  onNavigateToSettings: () => void;
}

export default function DoctorFeedbackPage({ onNavigateToHome, onNavigateToClients, onNavigateToActivities, onNavigateToData, onNavigateToSettings }: DoctorFeedbackPageProps) {
  const [filter, setFilter] = useState<'pending' | 'reviewed' | 'all'>('pending');

  const feedbackItems = [
    {
      id: 'f1',
      patient: 'Emma L.',
      title: 'Weekly Assessment Review',
      summary: 'Mood dropped after two high-stress workdays. Requested guidance for evening decompression.',
      submittedAt: 'Today, 8:15 AM',
      status: 'pending' as const,
      accent: 'bg-amber-100 text-amber-700',
    },
    {
      id: 'f2',
      patient: 'James T.',
      title: 'Medication Follow-up',
      summary: 'Reported dizziness after missing two doses. Wants a simpler reminder structure.',
      submittedAt: 'Yesterday, 6:40 PM',
      status: 'pending' as const,
      accent: 'bg-blue-100 text-blue-700',
    },
    {
      id: 'f3',
      patient: 'Sarah P.',
      title: 'Progress Reflection',
      summary: 'Shared that gratitude journaling has improved sleep consistency and reduced bedtime rumination.',
      submittedAt: 'Mar 24, 4:10 PM',
      status: 'reviewed' as const,
      accent: 'bg-emerald-100 text-emerald-700',
    },
  ];

  const filteredItems = feedbackItems.filter(item => filter === 'all' || item.status === filter);

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900 pb-20">
      <header className="px-5 py-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <div className="w-8" />
        <h1 className="text-[22px] font-bold text-center tracking-tight text-gray-900 absolute left-1/2 -translate-x-1/2">Feedback Review</h1>
        <button className="text-gray-700 hover:text-[color:var(--theme-primary)] transition-colors p-1 bg-gray-50 hover:bg-purple-50 rounded-full relative">
          <Bell className="w-5 h-5" strokeWidth={2.5} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-5 max-w-md mx-auto w-full">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[color:var(--theme-dark)]">
              <MessageSquareQuote className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-[18px] font-extrabold text-gray-900">Patient Feedback Inbox</h2>
              <p className="text-[13px] text-gray-500 font-medium">Review submitted reflections, concerns, and check-ins.</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2.5 w-full mb-5">
          <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'pending' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}>Pending</button>
          <button onClick={() => setFilter('reviewed')} className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'reviewed' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}>Reviewed</button>
          <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded-[14px] text-[13.5px] font-semibold transition-all border ${filter === 'all' ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md' : 'bg-[#EFE8F9]/80 border-transparent text-[#614A89] hover:bg-[#E2D4F5] shadow-sm'}`}>All</button>
        </div>

        <div className="space-y-4 pb-8">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] p-5">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${item.accent}`}>{item.patient}</span>
                    {item.status === 'reviewed' ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Reviewed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5" />
                        Pending
                      </span>
                    )}
                  </div>
                  <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">{item.title}</h3>
                </div>
                <button className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full p-2 transition-colors">
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[13.5px] text-gray-600 font-medium leading-[1.6] border-t border-gray-50 pt-3">{item.summary}</p>

              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <span className="text-[12px] text-gray-400 font-semibold">{item.submittedAt}</span>
                <button className="bg-purple-50 text-[color:var(--theme-dark)] px-4 py-2 rounded-xl text-[13px] font-bold hover:bg-purple-100 transition-colors shadow-sm">
                  {item.status === 'reviewed' ? 'View Response' : 'Write Response'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center max-w-md mx-auto relative px-2">
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14"><Home className="w-[22px] h-[22px]" /><span className="text-[11px] font-semibold">Home</span></button>
          <button onClick={onNavigateToClients} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14"><Users className="w-[22px] h-[22px]" /><span className="text-[11px] font-semibold">Clients</span></button>
          <button onClick={onNavigateToActivities} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14"><ListChecks className="w-[22px] h-[22px]" /><span className="text-[11px] font-semibold">Assign</span></button>
          <button className="flex flex-col items-center gap-1.5 text-[color:var(--theme-primary)] w-14"><CheckSquare className="w-[22px] h-[22px]" fill="currentColor" /><span className="text-[11px] font-bold">Feedback</span></button>
          <button onClick={onNavigateToData} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14"><BarChart3 className="w-[22px] h-[22px]" /><span className="text-[11px] font-semibold">Data</span></button>
          <button onClick={onNavigateToSettings} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14"><Settings className="w-[22px] h-[22px]" /><span className="text-[11px] font-semibold">Settings</span></button>
        </div>
      </nav>
    </div>
  );
}
