import { useMemo, useState } from 'react';
import { Bell, Home, Users, ListChecks, CheckSquare, Calendar as CalendarIcon, Settings, BarChart3, ChevronLeft, ChevronRight, Clock, MapPin, Video, UserRound, ArrowLeft } from 'lucide-react';

interface DoctorCalendarPageProps {
  onNavigateToHome: () => void;
  onNavigateToClients: () => void;
  onNavigateToActivities: () => void;
  onNavigateToFeedback: () => void;
  onNavigateToData: () => void;
  onNavigateToSettings: () => void;
}

type Appointment = {
  id: string;
  patient: string;
  time: string;
  format: 'In person' | 'Video';
  focus: string;
  note: string;
  status: 'confirmed' | 'follow-up' | 'intake';
};

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const appointmentMap: Record<string, Appointment[]> = {
  '2026-03-24': [
    {
      id: 'a1',
      patient: 'Emma L.',
      time: '9:00 AM',
      format: 'Video',
      focus: 'Weekly mood review',
      note: 'Check stress triggers from work and discuss coping plan.',
      status: 'confirmed',
    },
  ],
  '2026-03-25': [
    {
      id: 'a2',
      patient: 'James T.',
      time: '1:30 PM',
      format: 'In person',
      focus: 'Medication follow-up',
      note: 'Review adherence barriers and adjust reminder strategy.',
      status: 'follow-up',
    },
    {
      id: 'a3',
      patient: 'Sarah P.',
      time: '4:00 PM',
      format: 'Video',
      focus: 'Sleep and journaling check-in',
      note: 'Assess whether gratitude journaling is improving bedtime routine.',
      status: 'confirmed',
    },
  ],
  '2026-03-26': [
    {
      id: 'a4',
      patient: 'Emma L.',
      time: '10:00 AM',
      format: 'In person',
      focus: 'Boundary setting session',
      note: 'Role-play next workplace conversation and review homework.',
      status: 'confirmed',
    },
    {
      id: 'a5',
      patient: 'New Referral',
      time: '3:00 PM',
      format: 'Video',
      focus: 'Initial intake',
      note: 'Gather history, current symptoms, and treatment goals.',
      status: 'intake',
    },
  ],
  '2026-03-27': [
    {
      id: 'a6',
      patient: 'James T.',
      time: '11:00 AM',
      format: 'Video',
      focus: 'Behavior activation review',
      note: 'Evaluate activity completion trend and next-week assignments.',
      status: 'follow-up',
    },
  ],
  '2026-03-30': [
    {
      id: 'a7',
      patient: 'Sarah P.',
      time: '2:15 PM',
      format: 'In person',
      focus: 'Progress reflection',
      note: 'Review sleep changes and symptom severity after journaling routine.',
      status: 'confirmed',
    },
  ],
};

export default function DoctorCalendarPage({ onNavigateToHome, onNavigateToClients, onNavigateToActivities, onNavigateToFeedback, onNavigateToData, onNavigateToSettings }: DoctorCalendarPageProps) {
  const today = new Date();
  const todayKey = toDateKey(today);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(todayKey);

  const calendarDays = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const prefixDays = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const cells: Array<{ key: string; date: number | null; monthOffset: -1 | 0 | 1 }> = [];

    for (let i = 0; i < prefixDays; i++) {
      cells.push({ key: `prev-${i}`, date: null, monthOffset: -1 });
    }

    for (let date = 1; date <= totalDays; date++) {
      cells.push({ key: `curr-${date}`, date, monthOffset: 0 });
    }

    while (cells.length % 7 !== 0) {
      cells.push({ key: `next-${cells.length}`, date: null, monthOffset: 1 });
    }

    return cells;
  }, [currentMonth, currentYear]);

  const selectedAppointments = appointmentMap[selectedDate] ?? [];
  const totalThisMonth = Object.entries(appointmentMap)
    .filter(([date]) => {
      const d = new Date(`${date}T12:00:00`);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    })
    .reduce((sum, [, entries]) => sum + entries.length, 0);

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(y => y - 1);
      } else {
        setCurrentMonth(m => m - 1);
      }
      return;
    }

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const getDateKey = (date: number) => {
    const month = String(currentMonth + 1).padStart(2, '0');
    const day = String(date).padStart(2, '0');
    return `${currentYear}-${month}-${day}`;
  };

  const formatSelectedDate = (dateStr: string) =>
    new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(`${dateStr}T12:00:00`));

  const jumpToToday = () => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(todayKey);
  };

  const isViewingToday =
    selectedDate === todayKey &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  return (
    <div className="size-full flex flex-col bg-[#FDFBF7] overflow-auto font-sans text-gray-900 pb-20">
      <header className="px-5 py-5 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-40 shadow-sm border-b border-gray-100">
        <button onClick={onNavigateToHome} className="text-gray-700 hover:text-[color:var(--theme-primary)] transition-colors p-2 bg-gray-50 hover:bg-purple-50 rounded-full z-10">
          <ArrowLeft className="w-5 h-5" strokeWidth={2.5} />
        </button>
        <h1 className="text-[22px] font-bold text-center tracking-tight text-gray-900 absolute left-1/2 -translate-x-1/2">Clinical Calendar</h1>
        <button className="text-gray-700 hover:text-[color:var(--theme-primary)] transition-colors p-1 bg-gray-50 hover:bg-purple-50 rounded-full relative">
          <Bell className="w-5 h-5" strokeWidth={2.5} />
          <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </header>

      <main className="flex-1 px-5 pt-5 max-w-md mx-auto w-full space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">This Month</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalThisMonth}</p>
            <p className="text-[13px] text-gray-500 font-medium mt-2">Booked sessions across all patients</p>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
            <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">Selected Day</p>
            <p className="text-3xl font-extrabold text-gray-900">{selectedAppointments.length}</p>
            <p className="text-[13px] text-gray-500 font-medium mt-2">Appointments and follow-ups scheduled</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5 gap-3">
            <button onClick={() => navigateMonth('prev')} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-purple-50 text-gray-500 hover:text-[color:var(--theme-dark)] flex items-center justify-center transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center flex-1">
              <h2 className="text-[20px] font-extrabold text-gray-900">{monthNames[currentMonth]} {currentYear}</h2>
              <p className="text-[13px] text-gray-500 font-medium mt-1">Tap a date to inspect clinical appointments</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={jumpToToday}
                disabled={isViewingToday}
                className="px-3.5 h-10 rounded-full bg-purple-50 text-[13px] font-extrabold text-[color:var(--theme-dark)] hover:bg-purple-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Today
              </button>
              <button onClick={() => navigateMonth('next')} className="w-10 h-10 rounded-full bg-gray-50 hover:bg-purple-50 text-gray-500 hover:text-[color:var(--theme-dark)] flex items-center justify-center transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center mb-3">
            {daysOfWeek.map(day => (
              <div key={day} className="text-[11px] font-extrabold uppercase tracking-wide text-gray-400 py-1">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map(cell => {
              const dateKey = cell.date ? getDateKey(cell.date) : null;
              const hasAppointments = dateKey ? Boolean(appointmentMap[dateKey]?.length) : false;
              const isSelected = dateKey === selectedDate;

              return (
                <button
                  key={cell.key}
                  disabled={!cell.date}
                  onClick={() => dateKey && setSelectedDate(dateKey)}
                  className={`aspect-square rounded-2xl border text-[13px] font-bold transition-all ${
                    !cell.date
                      ? 'border-transparent bg-transparent cursor-default'
                      : isSelected
                        ? 'bg-[color:var(--theme-dark)] text-white border-transparent shadow-md'
                        : hasAppointments
                          ? 'bg-purple-50 border-purple-100 text-[color:var(--theme-dark)] hover:bg-purple-100'
                          : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center gap-1">
                    <span>{cell.date ?? ''}</span>
                    {hasAppointments ? (
                      <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white' : 'bg-[color:var(--theme-primary)]'}`} />
                    ) : (
                      <span className="w-1.5 h-1.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">Day Overview</p>
              <h3 className="text-[18px] font-extrabold text-gray-900">{formatSelectedDate(selectedDate)}</h3>
            </div>
            <div className="bg-purple-50 text-[color:var(--theme-dark)] px-3 py-2 rounded-xl text-[12px] font-extrabold shadow-sm">
              {selectedAppointments.length} items
            </div>
          </div>

          <div className="space-y-3">
            {selectedAppointments.length > 0 ? (
              selectedAppointments.map(item => (
                <div key={item.id} className="rounded-2xl border border-gray-100 bg-[#FCFBFF] p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide ${
                          item.status === 'intake'
                            ? 'bg-blue-100 text-blue-700'
                            : item.status === 'follow-up'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {item.status}
                        </span>
                        <span className="text-[11px] font-bold text-gray-400">{item.time}</span>
                      </div>
                      <h4 className="text-[16px] font-extrabold text-gray-900">{item.patient}</h4>
                      <p className="text-[13px] font-semibold text-[color:var(--theme-dark)] mt-1">{item.focus}</p>
                    </div>
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center text-[color:var(--theme-dark)]">
                      <UserRound className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="rounded-xl bg-white border border-gray-100 px-3 py-2.5">
                      <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold uppercase tracking-wide mb-1">
                        <Clock className="w-3.5 h-3.5" />
                        Time
                      </div>
                      <p className="text-[13px] font-semibold text-gray-800">{item.time}</p>
                    </div>
                    <div className="rounded-xl bg-white border border-gray-100 px-3 py-2.5">
                      <div className="flex items-center gap-2 text-gray-500 text-[12px] font-bold uppercase tracking-wide mb-1">
                        {item.format === 'Video' ? <Video className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                        Format
                      </div>
                      <p className="text-[13px] font-semibold text-gray-800">{item.format}</p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white border border-gray-100 p-3.5">
                    <p className="text-[12px] font-extrabold uppercase tracking-wide text-gray-400 mb-2">Clinical Note</p>
                    <p className="text-[13.5px] text-gray-600 font-medium leading-[1.6]">{item.note}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                <CalendarIcon className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-[14px] font-bold text-gray-500">No appointments booked for this day.</p>
                <p className="text-[12.5px] text-gray-400 mt-2">Use this view to monitor follow-ups, intake calls, and session load.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-3 rounded-t-3xl shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.05)] z-50">
        <div className="flex justify-around items-center max-w-md mx-auto relative">
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><Home className="w-5 h-5" /><span className="text-[10px] font-semibold">Home</span></button>
          <button onClick={onNavigateToClients} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><Users className="w-5 h-5" /><span className="text-[10px] font-semibold">Clients</span></button>
          <button onClick={onNavigateToActivities} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><ListChecks className="w-5 h-5" /><span className="text-[10px] font-semibold">Assign</span></button>
          <button onClick={onNavigateToFeedback} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><CheckSquare className="w-5 h-5" /><span className="text-[10px] font-semibold">Feedback</span></button>
          <button className="flex flex-col items-center gap-1 text-[color:var(--theme-primary)] w-12"><CalendarIcon className="w-5 h-5" fill="currentColor" /><span className="text-[10px] font-bold">Calendar</span></button>
          <button onClick={onNavigateToData} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><BarChart3 className="w-5 h-5" /><span className="text-[10px] font-semibold">Data</span></button>
          <button onClick={onNavigateToSettings} className="flex flex-col items-center gap-1 text-gray-400 hover:text-[color:var(--theme-primary)] transition-colors w-12"><Settings className="w-5 h-5" /><span className="text-[10px] font-semibold">Settings</span></button>
        </div>
      </nav>
    </div>
  );
}
