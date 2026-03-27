import { useState } from 'react';
import { ArrowLeft, Bell, Home, Users, ListChecks, Calendar as CalendarIcon, Settings, BarChart3, Activity, Clock, BookOpen, Pill, Smartphone, CheckCircle2, ChevronDown, CheckSquare, ChevronLeft, ChevronRight, Sparkles, AlertTriangle, HeartPulse } from 'lucide-react';

interface DoctorDataPageProps {
  onNavigateToHome: () => void;
  onNavigateToClients: () => void;
  onNavigateToActivities: () => void;
  onNavigateToFeedback: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToSettings: () => void;
}

export default function DoctorDataPage({ onNavigateToHome, onNavigateToClients, onNavigateToActivities, onNavigateToFeedback, onNavigateToCalendar, onNavigateToSettings }: DoctorDataPageProps) {
  const [selectedClient, setSelectedClient] = useState('Emma L.');
  const [showClientDropdown, setShowClientDropdown] = useState(false);
  const todayTimelineDate = '2026-03-26';
  const [selectedTimelineDate, setSelectedTimelineDate] = useState(todayTimelineDate);

  const aiSessionSummaryMap = {
    'Emma L.': {
      headline: 'Anxiety is trending down overall, but work-related stress spikes are still appearing before late-afternoon sessions.',
      trend: 'Mood recovered after two lower-scoring days, sleep remained stable, and medication adherence stayed consistent.',
      pattern: 'Journal entries and symptom check-ins both point to workplace conversations as the main trigger. Breathing exercises were completed on the same days distress scores improved.',
      risk: 'Moderate short-term relapse risk if workload increases again. Watch for reduced evening decompression and delayed journaling.',
      sources: ['Journal', 'Wearable', 'Symptoms', 'Medication'],
      consultNote: 'Recommended pre-session focus: review boundary setting plan and reinforce coping routine before next high-stress workday.',
    },
    'James T.': {
      headline: 'Medication adherence is the main concern, with recent missed doses aligning with dizziness reports and lower motivation.',
      trend: 'Sleep and wearable recovery stayed mostly flat, but symptom notes show frustration increasing on days medication was skipped.',
      pattern: 'When reminders are missed in the morning, task completion drops later in the day. Activity engagement improves after structured prompts.',
      risk: 'Elevated risk for non-adherence over the next week unless reminder friction is reduced.',
      sources: ['Medication', 'Symptoms', 'Wearable', 'Calendar'],
      consultNote: 'Recommended pre-session focus: simplify reminder system and confirm whether side effects are causing intentional avoidance.',
    },
    'Sarah M.': {
      headline: 'Recent logs show improving sleep consistency and better emotional regulation following gratitude journaling.',
      trend: 'Evening rumination decreased, symptom check-ins were milder, and daily routines appeared more stable this week.',
      pattern: 'Positive sleep nights cluster with completed journaling and reduced screen time before bed.',
      risk: 'Low immediate risk, but momentum may weaken if bedtime routine becomes inconsistent.',
      sources: ['Journal', 'Screen Time', 'Symptoms', 'Wearable'],
      consultNote: 'Recommended pre-session focus: reinforce the journaling habit and identify which parts of the evening routine are most protective.',
    },
  } as const;

  const timelineLogTemplates = [
    {
      events: [
        {
          id: 't1',
          time: '08:00 AM',
          type: 'medication',
          title: 'Medication Compliance',
          desc: 'Logged: Sertraline 50mg - Taken successfully.',
          icon: <Pill className="w-[18px] h-[18px] text-emerald-600" strokeWidth={2.5} />,
          bg: 'bg-emerald-100',
          line: 'bg-emerald-300'
        },
        {
          id: 't2',
          time: '08:30 AM',
          type: 'wearable',
          title: 'Wearable Data Synced',
          desc: 'Apple Watch: 7h 15m total sleep. Avg Heart Rate: 72 bpm. Recovery score at 85%.',
          icon: <Activity className="w-[18px] h-[18px] text-blue-600" strokeWidth={2.5} />,
          bg: 'bg-blue-100',
          line: 'bg-blue-300'
        },
        {
          id: 't3',
          time: '12:00 PM',
          type: 'symptom',
          title: 'Symptom Tracking',
          desc: 'Afternoon Check-in: Anxiety Level 3/10. Feeling relatively calm and focused.',
          icon: <CheckCircle2 className="w-[18px] h-[18px] text-orange-600" strokeWidth={2.5} />,
          bg: 'bg-orange-100',
          line: 'bg-orange-300'
        },
        {
          id: 't4',
          time: '02:00 PM',
          type: 'calendar',
          title: 'Calendar Information',
          desc: 'Therapy Session with Dr. Mitchell completed. Focus: Workplace boundaries.',
          icon: <CalendarIcon className="w-[18px] h-[18px] text-purple-600" strokeWidth={2.5} />,
          bg: 'bg-purple-100',
          line: 'bg-purple-300'
        },
        {
          id: 't5',
          time: '05:45 PM',
          type: 'journal',
          title: 'Journal Entry',
          desc: '"Work was incredibly stressful today, but I managed to use my box breathing techniques..."',
          icon: <BookOpen className="w-[18px] h-[18px] text-indigo-600" strokeWidth={2.5} />,
          bg: 'bg-indigo-100',
          line: 'bg-indigo-300'
        },
        {
          id: 't6',
          time: '09:00 PM',
          type: 'screentime',
          title: 'Screen Time Log',
          desc: 'Total Phone Usage: 3h 45m. Social Media limit maintained under 2 hours.',
          icon: <Smartphone className="w-[18px] h-[18px] text-slate-600" strokeWidth={2.5} />,
          bg: 'bg-slate-100',
          line: 'bg-slate-300'
        }
      ]
    },
    {
      events: [
        {
          id: 'y1',
          time: '07:40 AM',
          type: 'medication',
          title: 'Medication Compliance',
          desc: 'Logged: Sertraline 50mg - Taken on schedule.',
          icon: <Pill className="w-[18px] h-[18px] text-emerald-600" strokeWidth={2.5} />,
          bg: 'bg-emerald-100',
          line: 'bg-emerald-300'
        },
        {
          id: 'y2',
          time: '11:10 AM',
          type: 'wearable',
          title: 'Wearable Data Synced',
          desc: 'Apple Watch: 6h 52m sleep. Resting HR stable at 74 bpm.',
          icon: <Activity className="w-[18px] h-[18px] text-blue-600" strokeWidth={2.5} />,
          bg: 'bg-blue-100',
          line: 'bg-blue-300'
        },
        {
          id: 'y3',
          time: '08:20 PM',
          type: 'journal',
          title: 'Journal Entry',
          desc: '"Felt more settled today after going for a walk and limiting late-night scrolling."',
          icon: <BookOpen className="w-[18px] h-[18px] text-indigo-600" strokeWidth={2.5} />,
          bg: 'bg-indigo-100',
          line: 'bg-indigo-300'
        }
      ]
    },
    {
      events: [
        {
          id: 'p1',
          time: '09:15 AM',
          type: 'calendar',
          title: 'Calendar Information',
          desc: 'Psychology follow-up appointment confirmed for next week.',
          icon: <CalendarIcon className="w-[18px] h-[18px] text-purple-600" strokeWidth={2.5} />,
          bg: 'bg-purple-100',
          line: 'bg-purple-300'
        },
        {
          id: 'p2',
          time: '01:00 PM',
          type: 'symptom',
          title: 'Symptom Tracking',
          desc: 'Midday check-in logged increased stress at 5/10 after work meeting.',
          icon: <CheckCircle2 className="w-[18px] h-[18px] text-orange-600" strokeWidth={2.5} />,
          bg: 'bg-orange-100',
          line: 'bg-orange-300'
        },
        {
          id: 'p3',
          time: '09:30 PM',
          type: 'screentime',
          title: 'Screen Time Log',
          desc: 'Total Phone Usage: 4h 10m. Social media slightly above the usual daily target.',
          icon: <Smartphone className="w-[18px] h-[18px] text-slate-600" strokeWidth={2.5} />,
          bg: 'bg-slate-100',
          line: 'bg-slate-300'
        }
      ]
    }
  ];

  const formatTimelineLabel = (dateStr: string) => {
    const date = new Date(`${dateStr}T12:00:00`);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const shiftTimelineDate = (dateStr: string, days: number) => {
    const date = new Date(`${dateStr}T12:00:00`);
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
  };

  const getTimelineEventsForDate = (dateStr: string) => {
    const diffDays = Math.max(
      0,
      Math.round(
        (new Date(`${todayTimelineDate}T12:00:00`).getTime() - new Date(`${dateStr}T12:00:00`).getTime()) / 86400000
      )
    );
    const template = timelineLogTemplates[diffDays % timelineLogTemplates.length];
    return template.events.map((event, index) => ({
      ...event,
      id: `${dateStr}-${event.id}-${index}`,
    }));
  };

  const activeTimelineDay = {
    id: selectedTimelineDate,
    label: formatTimelineLabel(selectedTimelineDate),
    events: getTimelineEventsForDate(selectedTimelineDate),
  };
  const aiSummary = aiSessionSummaryMap[selectedClient as keyof typeof aiSessionSummaryMap] ?? aiSessionSummaryMap['Emma L.'];
  const timelineEvents = activeTimelineDay.events;
  const isViewingToday = selectedTimelineDate === todayTimelineDate;

  const goToOlderTimeline = () => {
    setSelectedTimelineDate(shiftTimelineDate(selectedTimelineDate, -1));
  };

  const goToNewerTimeline = () => {
    if (!isViewingToday) {
      setSelectedTimelineDate(shiftTimelineDate(selectedTimelineDate, 1));
    }
  };

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900 pb-20 relative">
      <header className="px-5 py-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100">
        <button onClick={onNavigateToHome} className="text-gray-700 hover:text-[color:var(--theme-primary)] transition-colors p-1 bg-gray-50 hover:bg-purple-50 rounded-full">
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-extrabold text-center tracking-tight text-gray-900 absolute left-1/2 -translate-x-1/2">Data Diagnostics</h1>
        <button className="text-gray-700 hover:text-[color:var(--theme-primary)] transition-colors p-1 bg-gray-50 hover:bg-purple-50 rounded-full relative">
          <Bell className="w-5 h-5" strokeWidth={2.5} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-4 max-w-md mx-auto w-full flex flex-col gap-4">
         <div className="relative z-40">
           <p className="text-[12px] font-extrabold text-gray-400 uppercase tracking-widest pl-1 mb-2">Viewing Patient</p>
           <button 
             onClick={() => setShowClientDropdown(!showClientDropdown)}
             className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-4 flex items-center justify-between hover:border-purple-200 transition-colors"
           >
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-extrabold text-[15px] text-orange-700">
                 {selectedClient.charAt(0)}
               </div>
               <div className="text-left">
                  <h3 className="text-[16px] font-extrabold text-gray-900 leading-tight">{selectedClient}</h3>
                  <p className="text-[12px] text-gray-500 font-semibold">Anxiety & Stress Management</p>
               </div>
             </div>
             <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showClientDropdown ? 'rotate-180' : ''}`} />
           </button>

           {showClientDropdown && (
             <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 p-2 z-50">
                {['Emma L.', 'James T.', 'Sarah M.'].map(name => (
                  <button 
                    key={name}
                    onClick={() => { setSelectedClient(name); setShowClientDropdown(false); }}
                    className="w-full text-left px-4 py-3 rounded-xl text-[14px] font-bold text-gray-800 hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    {name}
                    {selectedClient === name && <CheckSquare className="w-4 h-4 text-purple-600" />}
                  </button>
                ))}
             </div>
           )}
         </div>

         <section className="rounded-[28px] border border-purple-100 bg-[linear-gradient(180deg,#FCFAFF_0%,#F7F2FF_100%)] p-5 shadow-[0_12px_35px_-18px_rgba(76,44,143,0.35)]">
           <div className="flex items-start justify-between gap-4 mb-4">
             <div>
               <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-[color:var(--theme-dark)] shadow-sm">
                 <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                 AI Session Summary
               </div>
               <h2 className="mt-3 text-[20px] font-extrabold tracking-tight text-gray-900">Consultation Snapshot</h2>
               <p className="mt-2 text-[13.5px] font-medium leading-[1.6] text-gray-600">{aiSummary.headline}</p>
             </div>
             <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-sm border border-purple-100">
               <p className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">Review Timing</p>
               <p className="mt-1 text-[12px] font-bold text-[color:var(--theme-dark)]">Before / During Session</p>
             </div>
           </div>

           <div className="flex flex-wrap gap-2 mb-4">
             {aiSummary.sources.map(source => (
               <span key={source} className="rounded-full bg-white px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wide text-gray-500 border border-gray-100 shadow-sm">
                 {source}
               </span>
             ))}
           </div>

           <div className="space-y-3">
             <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                 <HeartPulse className="w-4 h-4 text-emerald-600" />
                 <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400">Relevant Changes</h3>
               </div>
               <p className="text-[13px] font-medium leading-[1.6] text-gray-700">{aiSummary.trend}</p>
             </div>

             <div className="rounded-2xl bg-white p-4 border border-gray-100 shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                 <Activity className="w-4 h-4 text-blue-600" />
                 <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-gray-400">Patterns</h3>
               </div>
               <p className="text-[13px] font-medium leading-[1.6] text-gray-700">{aiSummary.pattern}</p>
             </div>

             <div className="rounded-2xl bg-[#FFF7ED] p-4 border border-orange-100 shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                 <AlertTriangle className="w-4 h-4 text-orange-600" />
                 <h3 className="text-[12px] font-extrabold uppercase tracking-widest text-orange-500">Potential Risk</h3>
               </div>
               <p className="text-[13px] font-medium leading-[1.6] text-gray-700">{aiSummary.risk}</p>
             </div>

             <div className="rounded-2xl bg-[color:var(--theme-dark)] px-4 py-3.5 text-white shadow-lg shadow-purple-900/15">
               <p className="text-[11px] font-extrabold uppercase tracking-widest text-white/60">Session Prep</p>
               <p className="mt-1 text-[13px] font-medium leading-[1.6]">{aiSummary.consultNote}</p>
             </div>
           </div>
         </section>

         <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 mt-2">
             <div className="flex justify-between items-end mb-5 px-1 mt-3">
               <div>
                  <h2 className="text-[24px] font-extrabold tracking-tight">Timeline Log</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <button
                      onClick={goToOlderTimeline}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-purple-200 hover:text-[color:var(--theme-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                      aria-label="View older timeline log"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <p className="text-[14px] text-gray-500 font-semibold">{activeTimelineDay.label}</p>
                    <button
                      onClick={goToNewerTimeline}
                      disabled={isViewingToday}
                      className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-purple-200 hover:text-[color:var(--theme-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-sm"
                      aria-label="View newer timeline log"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedTimelineDate(todayTimelineDate)}
                      disabled={isViewingToday}
                      className="px-3 h-7 rounded-full bg-purple-50 text-[11px] font-extrabold text-[color:var(--theme-dark)] hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      Today
                    </button>
                  </div>
                </div>
               <div className="bg-purple-50 text-[color:var(--theme-dark)] px-3 py-1.5 rounded-lg text-[12px] font-extrabold flex items-center shadow-sm">
                 <Clock className="w-3.5 h-3.5 mr-1.5" /> {timelineEvents.length} Records
               </div>
             </div>

             <div className="relative pl-6 pb-6 mt-2">
                <div className="absolute top-[28px] bottom-4 left-[34px] w-[3px] bg-gray-100 rounded-full z-0"></div>

                <div className="flex flex-col gap-6 relative z-10 w-full">
                  {timelineEvents.map((ev, index) => (
                    <div key={ev.id} className="flex gap-4 relative group cursor-default">
                       <div className="flex flex-col items-center mt-0.5">
                         <div className={`w-[22px] h-[22px] rounded-full border-4 border-white ${ev.line} flex items-center justify-center shadow-sm z-10 scale-[1.3] transition-transform group-hover:scale-[1.4]`}></div>
                       </div>
                       
                       <div className="flex-1 bg-white border border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)] rounded-[20px] p-4 group-hover:shadow-[0_8px_25px_-5px_rgba(0,0,0,0.08)] transition-all relative overflow-hidden">
                          <div className={`absolute top-0 left-0 w-1.5 h-full ${ev.line}`}></div>
                          <div className="flex items-center justify-between mb-2.5">
                             <div className="flex items-center gap-2.5">
                               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${ev.bg}`}>
                                 {ev.icon}
                               </div>
                               <h3 className="text-[15px] font-extrabold text-gray-900 leading-tight">{ev.title}</h3>
                             </div>
                             <span className="text-[11px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">{ev.time}</span>
                          </div>
                          
                          <p className="text-[13px] text-gray-600 font-medium leading-[1.5] indent-0.5 mt-1 border-t border-gray-50 pt-3">
                            {ev.desc}
                          </p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
             
             <div className="text-center mt-2 mb-8">
               <span className="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">
                 {isViewingToday ? 'End of logs for today' : 'End of selected timeline log'}
               </span>
             </div>
          </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-3 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center max-w-md mx-auto relative px-2">
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <Home className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Home</span>
          </button>
          <button onClick={onNavigateToClients} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <Users className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Clients</span>
          </button>
          <button onClick={onNavigateToActivities} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <ListChecks className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Activities</span>
          </button>
          <button onClick={onNavigateToFeedback} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <CheckSquare className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Feedback</span>
          </button>
          <button onClick={onNavigateToCalendar} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <CalendarIcon className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Calendar</span>
          </button>
          <button className="flex flex-col items-center gap-1.5 text-[color:var(--theme-primary)] w-14 group">
            <div className="relative">
               <BarChart3 className="w-[22px] h-[22px]" fill="currentColor" />
             </div>
            <span className="text-[11px] font-bold">Data</span>
          </button>
          <button onClick={onNavigateToSettings} className="flex flex-col items-center gap-1.5 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-14">
            <Settings className="w-[22px] h-[22px]" />
            <span className="text-[11px] font-semibold">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
