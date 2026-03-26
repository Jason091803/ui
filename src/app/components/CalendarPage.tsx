import { useState } from 'react';
import { ArrowLeft, Bell, Home, Users, ListChecks, Calendar as CalendarIcon, Settings, ChevronLeft, ChevronRight, X, BarChart3 } from 'lucide-react';

interface CalendarPageProps {
  onNavigateToHome: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToData?: () => void;
}

interface DayData {
  activities: Array<{
    name: string;
    icon: string;
    completedTime: string;
    duration: string;
  }>;
  medications?: Array<{
    name: string;
    instruction: string;
    taken: boolean;
  }>;
  health: {
    screenTime: string;
    mood: string;
    physicalState: string;
  };
}

export default function CalendarPage({ onNavigateToHome, onNavigateToConnections, onNavigateToActivities, onNavigateToData }: CalendarPageProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');
  const [currentMonth, setCurrentMonth] = useState(2); // March = 2 (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentWeek, setCurrentWeek] = useState(0); // Week offset from base week

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Month names
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  // Function to navigate weeks
  const navigateWeek = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentWeek(currentWeek - 1);
    } else {
      setCurrentWeek(currentWeek + 1);
    }
  };

  // Function to go to today
  const goToToday = () => {
    setCurrentMonth(2); // March
    setCurrentYear(2026);
    setCurrentWeek(0);
  };

  // Week view data (March 22-28, 2026) - base week
  const getWeekDays = () => {
    // Base date: March 22, 2026
    const baseDate = new Date(2026, 2, 22); // Month is 0-indexed, so 2 = March
    
    // Add weeks offset
    const weekOffset = currentWeek * 7;
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + weekOffset);
    
    const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    return Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      return {
        dayOfWeek: dayNames[i],
        date: currentDate.getDate(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
      };
    });
  };

  // Get week date range display
  const getWeekDateRange = () => {
    const baseDate = new Date(2026, 2, 22);
    const weekOffset = currentWeek * 7;
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + weekOffset);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const startMonth = monthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = monthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  const weekDays = getWeekDays();

  // Disable next week button if it would go past 31
  const canGoNextWeek = () => {
    const baseDate = 22;
    const nextWeekLastDay = baseDate + (currentWeek + 1) * 7 + 6;
    return nextWeekLastDay <= 31;
  };

  // Disable prev week button if it would go before day 1
  const canGoPrevWeek = () => {
    const baseDate = 22;
    const prevWeekFirstDay = baseDate + (currentWeek - 1) * 7;
    return prevWeekFirstDay >= 1;
  };

  // Sample data for different days
  const dayDataMap: Record<number, DayData> = {
    20: {
      activities: [],
      medications: [
        { name: 'Vitamin D3 - 1000 IU', instruction: 'Take 1 capsule', taken: true }
      ],
      health: {
        screenTime: '2 hours 45 minutes',
        mood: 'Calm',
        physicalState: 'Good - Feeling energized',
      },
    },
    22: {
      activities: [],
      health: {
        screenTime: '3 hours 15 minutes',
        mood: 'Positive',
        physicalState: 'Good - No issues reported',
      },
    },
    23: {
      activities: [
        { name: 'Cognitive Puzzle', icon: '🧩', completedTime: '2:00 PM', duration: '15 min' },
      ],
      medications: [
        { name: 'Aspirin - 81mg', instruction: 'Take 1 pill', taken: false }
      ],
      health: {
        screenTime: '4 hours 30 minutes',
        mood: 'Focused',
        physicalState: 'Good - Alert and active',
      },
    },
    24: {
      activities: [],
      health: {
        screenTime: '5 hours 48 minutes',
        mood: 'Stressed',
        physicalState: 'Poor - Fatigue reported',
      },
    },
    25: {
      activities: [
        { name: 'Deep Breathing', icon: '🫁', completedTime: '7:30 AM', duration: '10 min' },
      ],
      health: {
        screenTime: '4 hours 12 minutes',
        mood: 'Neutral',
        physicalState: 'Fair - Mild headache',
      },
    },
    26: {
      activities: [
        { name: 'Mindfulness Meditation', icon: '🧘', completedTime: '8:00 AM', duration: '10 min' },
        { name: 'Daily Mood Journal', icon: '📝', completedTime: '9:30 AM', duration: '5 min' },
      ],
      medications: [
        { name: 'Aspirin - 81mg', instruction: 'Take 1 pill after breakfast', taken: true },
        { name: 'Vitamin D3 - 1000 IU', instruction: 'Take 1 capsule at noon', taken: false }
      ],
      health: {
        screenTime: '3 hours 24 minutes',
        mood: 'Calm and Positive',
        physicalState: 'Good - No pain reported',
      },
    },
    27: {
      activities: [],
      health: {
        screenTime: '3 hours 50 minutes',
        mood: 'Relaxed',
        physicalState: 'Good - Well rested',
      },
    },
    28: {
      activities: [],
      health: {
        screenTime: '4 hours 5 minutes',
        mood: 'Content',
        physicalState: 'Good - No issues',
      },
    },
  };

  const handleDayClick = (day: number, currentMonth: boolean) => {
    if (!currentMonth) return;
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDay(null);
  };

  const selectedDayData = selectedDay ? dayDataMap[selectedDay] : null;

  // Day markers: available (doctor available), feedback (doctor gave feedback), completed (all activities done)
  const dayMarkers: Record<number, Array<'available' | 'feedback' | 'completed'>> = {
    20: ['available'],
    22: ['available'],
    23: ['available', 'feedback'],
    24: ['feedback'],
    25: ['completed', 'feedback'],
    26: ['completed', 'feedback'],
    27: ['available'],
  };

  // Dynamic calendar days generation
  const getCalendarDays = () => {
    const days = [];
    
    // Get the first day of the current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startingDayOfWeek = firstDay.getDay(); // 0 (Sun) to 6 (Sat)
    
    // Get the last day of the current month
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    // Get previous month's days for padding
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    
    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({ day: prevMonthLastDay - i, currentMonth: false, selected: false });
    }
    
    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      // Keep selected logic working smoothly
      const isSelected = selectedDay === i || (!selectedDay && currentYear === 2026 && currentMonth === 2 && i === 26);
      days.push({ 
         day: i, 
         currentMonth: true,
         selected: isSelected
      });
    }
    
    // Add next month's leading days to complete the calendar grid
    const totalDays = days.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - (totalDays % 7);
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ day: i, currentMonth: false, selected: false });
    }
    
    // Always return exactly 42 days (6 weeks) to maintain a consistent grid height across all months
    let nextDaySeq = (remainingDays === 0 ? 1 : remainingDays + 1);
    while (days.length < 42) {
      days.push({ day: nextDaySeq++, currentMonth: false, selected: false });
    }
    
    return days;
  };

  const calendarDays = getCalendarDays();

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[#F5F1E8] px-4 py-4 flex items-center justify-between">
        <button onClick={onNavigateToHome} className="text-gray-700 hover:text-gray-900">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button className="text-gray-700 hover:text-gray-900">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-2 pb-20 max-w-4xl mx-auto w-full">
        <h1 className="text-3xl text-center mb-6">My Calendar</h1>

        {/* Month/Week Navigation */}
        <div className="flex items-center justify-between mb-4 relative min-h-[40px]">
          <div className="flex items-center gap-3 relative z-10">
            <button 
              className="w-10 h-10 border-2 border-[#1E88E5] rounded-full flex items-center justify-center text-[#4A148C] hover:bg-blue-50 transition-colors"
              onClick={() => viewMode === 'month' ? navigateMonth('prev') : navigateWeek('prev')}
            >
              <ChevronLeft className="w-6 h-6 -ml-0.5" />
            </button>
            <button
              onClick={goToToday}
              className="bg-[#4A148C] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#380e6b] transition-colors shadow-sm"
            >
              Today
            </button>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 absolute left-1/2 -translate-x-1/2 w-full text-center z-0 pointer-events-none tracking-tight">
            {viewMode === 'month' ? `${monthNames[currentMonth]} ${currentYear}` : getWeekDateRange()}
          </h2>

          <button 
            className="w-10 h-10 text-[#4A148C] hover:bg-purple-50 rounded-full flex items-center justify-center transition-colors relative z-10"
            onClick={() => viewMode === 'month' ? navigateMonth('next') : navigateWeek('next')}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Month/Week Toggle */}
        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setViewMode('month')}
            className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-colors ${
              viewMode === 'month'
                ? 'bg-[#6B46C1] text-white hover:bg-[#5a3ba3]'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            Month
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`flex-1 py-3 rounded-full flex items-center justify-center gap-2 transition-colors ${
              viewMode === 'week'
                ? 'bg-[#6B46C1] text-white hover:bg-[#5a3ba3]'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <CalendarIcon className="w-5 h-5" />
            Week
          </button>
        </div>

        {/* Legend */}
        <div className="border-t border-b border-gray-300 py-3 mb-4">
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#6B46C1]"></div>
              <span className="text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-700">Feedback</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-gray-700">Completed</span>
            </div>
          </div>
        </div>

        {/* Sync Button */}
        <div className="flex justify-end mb-4">
          <button className="bg-[#6B46C1] text-white px-6 py-2 rounded-full text-sm hover:bg-[#5a3ba3] transition-colors">
            sync to external calendar
          </button>
        </div>

        {/* Month View */}
        {viewMode === 'month' && (
          <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayInfo, index) => {
              const markers = dayInfo.currentMonth ? dayMarkers[dayInfo.day] : undefined;
              return (
                <button
                  key={index}
                  onClick={() => handleDayClick(dayInfo.day, dayInfo.currentMonth)}
                  className={`
                    aspect-square flex flex-col items-center justify-center rounded-2xl text-lg transition-colors relative
                    ${!dayInfo.currentMonth ? 'text-gray-300 cursor-default' : 'text-gray-800 cursor-pointer'}
                    ${dayInfo.selected ? 'border-2 border-blue-500 bg-blue-50' : 'bg-gray-50 hover:bg-gray-100'}
                  `}
                >
                  <span className="mb-1">{dayInfo.day}</span>
                  {markers && markers.length > 0 && (
                    <div className="flex gap-1">
                      {markers.map((marker, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full ${
                            marker === 'available' ? 'bg-[#6B46C1]' :
                            marker === 'feedback' ? 'bg-blue-500' :
                            'bg-green-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        )}

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="space-y-3">
            {weekDays.map((day, index) => {
              const dayData = dayDataMap[day.date];
              const markers = dayMarkers[day.date];
              const isToday = day.date === 26;

              return (
                <button
                  key={`week-day-${index}-${day.date}`}
                  onClick={() => handleDayClick(day.date, true)}
                  className={`w-full rounded-2xl shadow-md p-4 flex items-center gap-4 transition-colors text-left ${
                    isToday ? 'bg-blue-100 border-2 border-blue-500' : 'bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-500 uppercase">{day.dayOfWeek}</span>
                    <span className={`text-2xl font-medium ${isToday ? 'text-blue-600' : 'text-gray-800'}`}>
                      {day.date}
                    </span>
                  </div>

                  <div className="flex-1">
                    {dayData && dayData.activities.length > 0 ? (
                      <div className="flex items-center gap-2 mb-1">
                        {dayData.activities.map((activity, idx) => (
                          <span key={idx} className="text-2xl">{activity.icon}</span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 font-medium text-sm mb-1">No activities</p>
                    )}
                    {dayData && dayData.medications && dayData.medications.length > 0 && (
                      <div className="flex items-center gap-1.5 mt-1 border-t border-gray-100 pt-1">
                        {dayData.medications.map((med, idx) => (
                          <span key={`med-${idx}`} className={`text-lg ${med.taken ? 'opacity-100' : 'opacity-40 grayscale'} transition-opacity`} title={med.name}>💊</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {markers && markers.length > 0 && (
                    <div className="flex gap-1.5">
                      {markers.map((marker, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            marker === 'available' ? 'bg-[#6B46C1]' :
                            marker === 'feedback' ? 'bg-blue-500' :
                            'bg-green-500'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Today Info Card - Only show in month view */}
        {viewMode === 'month' && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-xl mb-2">
              <span className="text-[#6B46C1] font-medium">Today</span>
              <span className="text-gray-600 ml-2">March 26, 2026</span>
            </h3>
            <p className="text-gray-500 text-center py-8">No Activity Due Today</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={onNavigateToHome}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={onNavigateToConnections}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Connections</span>
          </button>
          <button
            onClick={onNavigateToActivities}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <ListChecks className="w-6 h-6" />
            <span className="text-xs">Activities</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#6B46C1]">
            <CalendarIcon className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button
            onClick={onNavigateToData}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Data</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>

      {/* Day Details Modal */}
      {isModalOpen && selectedDay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#6B46C1] text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
              <h2 className="text-2xl font-medium">March {selectedDay}, 2026</h2>
              <button
                onClick={closeModal}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200 overflow-y-auto">
              {/* Left Side - Activities & Medications */}
              <div className="flex-1 p-6">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Completed Activities</h3>

                <div className="space-y-3 mb-8">
                  {selectedDayData && selectedDayData.activities.length > 0 ? (
                    selectedDayData.activities.map((activity, index) => (
                      <div key={index} className="bg-[#F5F1E8] rounded-2xl p-4 flex items-center gap-4">
                        <div className="text-4xl">{activity.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{activity.name}</h4>
                          <p className="text-sm text-gray-600">Completed at {activity.completedTime}</p>
                          <p className="text-sm text-gray-500">Duration: {activity.duration}</p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-lg">✓</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-2xl">No activities recorded</p>
                  )}
                </div>

                <h3 className="text-xl font-medium mb-4 text-gray-800">Medications</h3>
                <div className="space-y-3">
                  {selectedDayData && selectedDayData.medications && selectedDayData.medications.length > 0 ? (
                    selectedDayData.medications.map((med, index) => (
                      <div key={`med-${index}`} className="bg-[#F5F1E8] rounded-2xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${index % 2 === 0 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>💊</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-800">{med.name}</h4>
                            <p className="text-sm text-gray-600">{med.instruction}</p>
                          </div>
                        </div>
                        <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors shadow-sm ${med.taken ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'}`}>
                          {med.taken && <span className="text-white text-lg font-bold leading-none block pb-0.5">✓</span>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4 bg-gray-50 rounded-2xl">No medications mapped</p>
                  )}
                </div>
              </div>

              {/* Right Side - Health & Mood */}
              <div className="flex-1 p-6 bg-gray-50">
                <h3 className="text-xl font-medium mb-4 text-gray-800">Health & Mood</h3>

                {selectedDayData ? (
                  <div className="space-y-4">
                    <div className="bg-white rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📱</span>
                        <h4 className="font-medium text-gray-800">Screen Time</h4>
                      </div>
                      <p className="text-gray-700 ml-11">{selectedDayData.health.screenTime}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">😊</span>
                        <h4 className="font-medium text-gray-800">Mood</h4>
                      </div>
                      <p className="text-gray-700 ml-11">{selectedDayData.health.mood}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">💪</span>
                        <h4 className="font-medium text-gray-800">Physical State</h4>
                      </div>
                      <p className="text-gray-700 ml-11">{selectedDayData.health.physicalState}</p>
                    </div>

                    {/* Day Status */}
                    {selectedDay && dayMarkers[selectedDay] && (
                      <div className="bg-white rounded-2xl p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Day Status</h4>
                        <div className="space-y-2">
                          {dayMarkers[selectedDay].includes('available') && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-[#6B46C1]"></div>
                              <span className="text-gray-700">Doctor Available</span>
                            </div>
                          )}
                          {dayMarkers[selectedDay].includes('feedback') && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                              <span className="text-gray-700">Doctor Feedback Received</span>
                            </div>
                          )}
                          {dayMarkers[selectedDay].includes('completed') && (
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full bg-green-500"></div>
                              <span className="text-gray-700">All Activities Completed</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No data available for this day</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}