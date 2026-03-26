import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Bell, Home, Users, ListChecks, Calendar, Settings, Play, ChevronDown, ChevronUp, BarChart3 } from 'lucide-react';

interface ActivitiesPageProps {
  onNavigateToHome: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
}

interface Activity {
  id: string;
  name: string;
  time: string;
  duration: number;
  icon: string;
  status: 'active' | 'completed' | 'all';
  completedDate?: string;
  isRunning?: boolean;
  remainingTime?: number;
}

export default function ActivitiesPage({ onNavigateToHome, onNavigateToConnections, onNavigateToCalendar, onNavigateToData }: ActivitiesPageProps) {
  const [isToDoExpanded, setIsToDoExpanded] = useState(true);
  const [isCompletedExpanded, setIsCompletedExpanded] = useState(true);
  const [isAllExpanded, setIsAllExpanded] = useState(true);

  const [activities, setActivities] = useState<Activity[]>([
    {
      id: '1',
      name: 'Mindfulness Meditation',
      time: 'Before Bed',
      duration: 10,
      icon: '🧘',
      status: 'active',
    },
    {
      id: '2',
      name: 'Deep Breathing',
      time: 'Anytime',
      duration: 10,
      icon: '🫁',
      status: 'active',
    },
    {
      id: '3',
      name: 'Daily Mood Journal',
      time: 'Morning',
      duration: 5,
      icon: '📝',
      status: 'completed',
      completedDate: 'Morning',
    },
    {
      id: '4',
      name: 'Cognitive Puzzle',
      time: 'Yesterday',
      duration: 15,
      icon: '🧩',
      status: 'completed',
      completedDate: 'Yesterday',
    },
  ]);

  const hasRunningActivity = useMemo(
    () => activities.some(a => a.isRunning),
    [activities]
  );

  useEffect(() => {
    if (!hasRunningActivity) return;

    const interval = setInterval(() => {
      setActivities(prev => {
        const updated = prev.map(activity => {
          if (activity.isRunning && activity.remainingTime !== undefined) {
            const newRemaining = activity.remainingTime - 1;
            if (newRemaining <= 0) {
              return {
                ...activity,
                isRunning: false,
                remainingTime: undefined,
                status: 'completed' as const,
                completedDate: 'Just now',
              };
            }
            return {
              ...activity,
              remainingTime: newRemaining,
            };
          }
          return activity;
        });
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [hasRunningActivity]);

  const handleStart = (id: string) => {
    setActivities(prev =>
      prev.map(activity =>
        activity.id === id
          ? { ...activity, isRunning: true, remainingTime: activity.duration }
          : activity
      )
    );
  };

  const activeActivities = useMemo(
    () => activities.filter(a => a.status === 'active' && !a.isRunning),
    [activities]
  );
  const runningActivities = useMemo(
    () => activities.filter(a => a.isRunning),
    [activities]
  );
  const completedActivities = useMemo(
    () => activities.filter(a => a.status === 'completed'),
    [activities]
  );

  const completionPercentage = useMemo(() => {
    const totalActivities = activities.length;
    const completedCount = completedActivities.length;
    return Math.round((completedCount / totalActivities) * 100);
  }, [activities.length, completedActivities.length]);

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      <header className="bg-[#F5F1E8] px-4 py-4 flex items-center justify-between">
        <button onClick={onNavigateToHome} className="text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl absolute left-1/2 -translate-x-1/2">My Activities</h1>
        <button className="text-gray-700 hover:text-gray-900">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 px-4 pt-6 pb-20 max-w-md mx-auto w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-[200px] h-[200px]">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="#E0E0E0" strokeWidth="20" />
              <circle cx="100" cy="100" r="80" fill="none" stroke="#7DD3C0" strokeWidth="20" strokeDasharray={`${completionPercentage * 5.03} ${(100 - completionPercentage) * 5.03}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold">{completionPercentage}%</div>
              <div className="text-sm text-gray-600 text-center">of your activities<br />done</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">To-Do (Active Tasks)</h2>
          <button onClick={() => setIsToDoExpanded(!isToDoExpanded)} className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {isToDoExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
        {isToDoExpanded && (
          <div className="space-y-3 mb-6">
            {[...runningActivities, ...activeActivities].map(activity => (
              <div key={activity.id} className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">{activity.name}</h3>
                  <p className="text-sm text-gray-600">{activity.isRunning && activity.remainingTime !== undefined ? `Time remaining: ${activity.remainingTime}s` : `Time: ${activity.time}`}</p>
                  <p className="text-sm text-gray-600">Duration: {activity.duration} sec.</p>
                </div>
                <button onClick={() => handleStart(activity.id)} disabled={activity.isRunning} className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${activity.isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#6B46C1] text-white hover:bg-[#5a3ba3]'}`}>
                  {activity.isRunning ? <span className="text-sm">Running...</span> : <><span className="text-sm">Start</span><Play className="w-4 h-4 fill-current" /></>}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">Completed (Last 7 Days)</h2>
          <button onClick={() => setIsCompletedExpanded(!isCompletedExpanded)} className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {isCompletedExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
        {isCompletedExpanded && (
          <div className="space-y-3 mb-6">
            {completedActivities.map(activity => (
              <div key={activity.id} className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">{activity.name}</h3>
                  <p className="text-sm text-gray-600">{activity.completedDate?.includes('Yesterday') || activity.completedDate?.includes('Just') ? `Date: ${activity.completedDate}` : `Time: ${activity.completedDate}`}</p>
                  <p className="text-sm text-gray-600">Duration: {activity.duration} {activity.duration === 5 ? 'min' : 'sec'}.</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#7DD3C0] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl">✓</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">All (All Activities Feed)</h2>
          <button onClick={() => setIsAllExpanded(!isAllExpanded)} className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors">
            {isAllExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
          </button>
        </div>
        {isAllExpanded && (
          <div className="space-y-3 mb-6">
            {activities.map(activity => (
              <div key={`all-${activity.id}`} className="bg-white rounded-2xl shadow-md p-4 flex items-center gap-4">
                <div className="text-4xl flex-shrink-0">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg mb-1">{activity.name}</h3>
                  <p className="text-sm text-gray-600">{activity.status === 'completed' ? (activity.completedDate?.includes('Yesterday') || activity.completedDate?.includes('Just') ? `Date: ${activity.completedDate}` : `Time: ${activity.completedDate}`) : `Time: ${activity.time}`}</p>
                  <p className="text-sm text-gray-600">Duration: {activity.duration} {activity.status === 'completed' && activity.duration === 5 ? 'min' : 'sec'}.</p>
                </div>
                {activity.status === 'completed' ? (
                  <div className="w-10 h-10 rounded-full bg-[#7DD3C0] flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xl">✓</span>
                  </div>
                ) : (
                  <button onClick={() => handleStart(activity.id)} disabled={activity.isRunning} className={`px-6 py-2 rounded-full flex items-center gap-2 transition-colors ${activity.isRunning ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#6B46C1] text-white hover:bg-[#5a3ba3]'}`}>
                    {activity.isRunning ? <span className="text-sm">Running...</span> : <><span className="text-sm">Start</span><Play className="w-4 h-4 fill-current" /></>}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button onClick={onNavigateToHome} className="flex flex-col items-center gap-1 text-gray-400">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button onClick={onNavigateToConnections} className="flex flex-col items-center gap-1 text-gray-400">
            <Users className="w-6 h-6" />
            <span className="text-xs">Connections</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#6B46C1]">
            <ListChecks className="w-6 h-6" />
            <span className="text-xs">Activities</span>
          </button>
          <button onClick={onNavigateToCalendar} className="flex flex-col items-center gap-1 text-gray-400">
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button onClick={onNavigateToData} className="flex flex-col items-center gap-1 text-gray-400">
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Data</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
