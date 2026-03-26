import { useState } from 'react';
import { ArrowLeft, Bell, Home, Users, ListChecks, Calendar as CalendarIcon, Settings, ChevronLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, PieChart, Pie, Cell } from 'recharts';

interface DataPageProps {
  onNavigateToHome: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToCalendar?: () => void;
}

export default function DataPage({ onNavigateToHome, onNavigateToConnections, onNavigateToActivities, onNavigateToCalendar }: DataPageProps) {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(0);
  const [currentYear, setCurrentYear] = useState(0);
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('weekly');

  const getTimeText = (weekly: string, monthly: string, yearly: string) => {
    if (timeRange === 'weekly') return weekly;
    if (timeRange === 'monthly') return monthly;
    return yearly;
  };

  const getChartData = (weekly: any[], monthly: any[], yearly: any[]) => {
    if (timeRange === 'weekly') return weekly;
    if (timeRange === 'monthly') return monthly;
    return yearly;
  };

  // Calculate week dates based on currentWeek offset
  const getWeekDates = () => {
    // Base date: March 23, 2026
    const baseDate = new Date(2026, 2, 23); // Month is 0-indexed, so 2 = March
    
    // Add weeks offset
    const weekOffset = currentWeek * 7;
    const startDate = new Date(baseDate);
    startDate.setDate(baseDate.getDate() + weekOffset);
    
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    // Format dates
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    
    const startMonth = monthNames[startDate.getMonth()];
    const startDay = startDate.getDate();
    const endMonth = monthNames[endDate.getMonth()];
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();
    
    let display;
    if (startMonth === endMonth) {
      display = `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      display = `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
    
    return {
      start: startDay,
      end: endDay,
      display: display
    };
  };

  const weekDates = getWeekDates();

  // Weekly mood data
  const moodData = [
    { day: '23', mood: 5, anxiety: 3, energy: 4 },
    { day: '24', mood: 4, anxiety: 4, energy: 3 },
    { day: '25', mood: 6, anxiety: 2, energy: 5 },
    { day: '26', mood: 5, anxiety: 3, energy: 4 },
    { day: '27', mood: 7, anxiety: 2, energy: 6 },
    { day: '28', mood: 6, anxiety: 2, energy: 5 },
    { day: '29', mood: 7, anxiety: 1, energy: 6 },
  ];

  // Steps data
  const stepsData = [
    { day: 'Mon', steps: 8500 },
    { day: 'Tue', steps: 12000 },
    { day: 'Wed', steps: 15000 },
    { day: 'Thu', steps: 11000 },
    { day: 'Fri', steps: 13500 },
  ];

  // Sleep trend data
  const sleepData = [
    { day: '23', hours: 6.5 },
    { day: '24', hours: 7.0 },
    { day: '25', hours: 7.5 },
    { day: '26', hours: 6.8 },
    { day: '27', hours: 7.2 },
    { day: '28', hours: 7.5 },
    { day: '29', hours: 7.0 },
  ];

  // Screen usage data
  const screenData = [
    { day: 'Mon', social: 2.5, health: 1.0, productivity: 1.5 },
    { day: 'Tue', social: 3.0, health: 0.8, productivity: 1.2 },
    { day: 'Wed', social: 2.8, health: 1.2, productivity: 1.5 },
    { day: 'Thu', social: 3.2, health: 1.0, productivity: 1.3 },
    { day: 'Fri', social: 2.0, health: 1.5, productivity: 1.0 },
  ];

  // Heart rate data for donut chart
  const heartRateData = [
    { name: 'Heart Rate', value: 72, color: '#A5D6A7' },
    { name: 'Remaining', value: 28, color: '#E1BEE7' },
  ];

  // Calculate month dates based on currentMonth offset
  const getMonthDates = () => {
    const baseDate = new Date(2026, 2, 1);
    const targetDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + currentMonth, 1);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                        'July', 'August', 'September', 'October', 'November', 'December'];
    return { display: `${monthNames[targetDate.getMonth()]} ${targetDate.getFullYear()}` };
  };
  const monthDates = getMonthDates();

  // Monthly mock data
  const monthlyMoodData = [
    { day: 'W1', mood: 6, anxiety: 3, energy: 5 },
    { day: 'W2', mood: 5, anxiety: 4, energy: 4 },
    { day: 'W3', mood: 7, anxiety: 2, energy: 6 },
    { day: 'W4', mood: 6, anxiety: 2, energy: 5 },
  ];
  const monthlyStepsData = [
    { day: 'W1', steps: 11000 },
    { day: 'W2', steps: 10500 },
    { day: 'W3', steps: 13000 },
    { day: 'W4', steps: 12500 },
  ];
  const monthlySleepData = [
    { day: 'W1', hours: 7.0 },
    { day: 'W2', hours: 6.8 },
    { day: 'W3', hours: 7.3 },
    { day: 'W4', hours: 7.1 },
  ];
  const monthlyScreenData = [
    { day: 'W1', social: 2.8, health: 1.2, productivity: 1.5 },
    { day: 'W2', social: 3.0, health: 1.0, productivity: 1.3 },
    { day: 'W3', social: 2.5, health: 1.5, productivity: 1.6 },
    { day: 'W4', social: 2.7, health: 1.1, productivity: 1.4 },
  ];

  const getYearDates = () => {
    const baseDate = new Date(2026, 0, 1);
    const targetDate = new Date(baseDate.getFullYear() + currentYear, 0, 1);
    return { display: `${targetDate.getFullYear()}` };
  };
  const yearDates = getYearDates();

  const yearlyMoodData = [
    { day: 'Q1', mood: 5, anxiety: 4, energy: 4 },
    { day: 'Q2', mood: 6, anxiety: 3, energy: 5 },
    { day: 'Q3', mood: 7, anxiety: 2, energy: 6 },
    { day: 'Q4', mood: 6, anxiety: 2, energy: 5 },
  ];
  const yearlyStepsData = [
    { day: 'Q1', steps: 10000 },
    { day: 'Q2', steps: 11500 },
    { day: 'Q3', steps: 13500 },
    { day: 'Q4', steps: 12000 },
  ];
  const yearlySleepData = [
    { day: 'Q1', hours: 6.9 },
    { day: 'Q2', hours: 7.1 },
    { day: 'Q3', hours: 7.4 },
    { day: 'Q4', hours: 7.2 },
  ];
  const yearlyScreenData = [
    { day: 'Q1', social: 3.1, health: 1.1, productivity: 1.4 },
    { day: 'Q2', social: 2.9, health: 1.2, productivity: 1.5 },
    { day: 'Q3', social: 2.4, health: 1.5, productivity: 1.7 },
    { day: 'Q4', social: 2.6, health: 1.3, productivity: 1.6 },
  ];

  const navigateTime = (direction: 'prev' | 'next') => {
    if (timeRange === 'weekly') {
      setCurrentWeek(direction === 'prev' ? currentWeek - 1 : currentWeek + 1);
    } else if (timeRange === 'monthly') {
      setCurrentMonth(direction === 'prev' ? currentMonth - 1 : currentMonth + 1);
    } else {
      setCurrentYear(direction === 'prev' ? currentYear - 1 : currentYear + 1);
    }
  };

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
        <h1 className="text-3xl text-center mb-6">My Data Summary</h1>

        {/* Time Range Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1 flex shadow-sm border border-gray-100">
            <button 
              onClick={() => setTimeRange('weekly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${timeRange === 'weekly' ? 'bg-[#E1BEE7] text-[#6B46C1]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Weekly
            </button>
            <button 
              onClick={() => setTimeRange('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${timeRange === 'monthly' ? 'bg-[#E1BEE7] text-[#6B46C1]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setTimeRange('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${timeRange === 'yearly' ? 'bg-[#E1BEE7] text-[#6B46C1]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Trend Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => navigateTime('prev')}
              className="w-10 h-10 rounded-full bg-[#E1BEE7] flex items-center justify-center hover:bg-[#CE93D8] transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#6B46C1]" />
            </button>

            <div className="text-center">
              <h2 className="text-lg font-medium">{getTimeText('Weekly Trend', 'Monthly Trend', 'Yearly Trend')}</h2>
              <p className="text-base text-gray-700">{getTimeText(weekDates.display, monthDates.display, yearDates.display)}</p>
            </div>

            <button
              onClick={() => navigateTime('next')}
              className="w-10 h-10 rounded-full bg-[#E1BEE7] flex items-center justify-center hover:bg-[#CE93D8] transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#6B46C1]" />
            </button>
          </div>

          {/* AI Summary */}
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <p className="text-sm text-gray-800 text-center">
              {getTimeText(
                "Your data suggests a positive trend. Key changes: Calm week (6/10), More sleep (7.2h). Keep it up!",
                "Your monthly overview looks solid. Mood remains stable with a slight increase in activity. Great progress!",
                "Great year overall! Consistent activity levels and good sleep quality reported."
              )}
            </p>
          </div>
        </div>

        {/* Mind State Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-medium">{getTimeText('Weekly', 'Monthly', 'Yearly')} Mind State</h3>
              <p className="text-sm text-gray-600">My Mind State ({getTimeText('Mar 23-29', 'March', '2026')})</p>
            </div>
            <span className="text-xs text-gray-500">US2</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium mb-1">{getTimeText('Weekly', 'Monthly', 'Yearly')} mood</p>
              <p className="text-xs text-gray-500">0-10</p>
            </div>
            <div className="bg-[#E8F5E9] px-4 py-2 rounded-xl">
              <p className="text-xs text-gray-600">Mood:</p>
              <p className="text-sm font-medium">Calm (6/10)</p>
            </div>
          </div>

          <div className="mb-4">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={getChartData(moodData, monthlyMoodData, yearlyMoodData)}>
                <defs>
                  <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A5D6A7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#A5D6A7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 10]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="mood" stroke="#66BB6A" fillOpacity={1} fill="url(#colorMood)" strokeWidth={2} dot={{ fill: '#66BB6A', r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex gap-4 justify-end">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#A5D6A7]"></div>
              <span className="text-xs text-gray-600">Anxiety Level (Low)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#90CAF9]"></div>
              <span className="text-xs text-gray-600">Energy Level (Low)</span>
            </div>
          </div>
        </div>

        {/* Wearable Activity Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-medium">{getTimeText('Weekly', 'Monthly', 'Yearly')} Wearable Activity</h3>
              <p className="text-sm text-gray-600">My Wearable Data ({getTimeText('Mar 23-29', 'March', '2026')})</p>
            </div>
            <span className="text-xs text-gray-500">US6</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Steps */}
            <div>
              <p className="text-sm font-medium mb-2">Steps (Avg. Steps: 12.5k)</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={getChartData(stepsData, monthlyStepsData, yearlyStepsData)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="steps" radius={[8, 8, 0, 0]}>
                    {getChartData(stepsData, monthlyStepsData, yearlyStepsData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#E1BEE7', '#A5D6A7', '#CE93D8', '#66BB6A', '#BA68C8'][index % 5]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Sleep Trend & Heart Rate */}
            <div>
              <p className="text-sm font-medium mb-2">Sleep Trend</p>
              <ResponsiveContainer width="100%" height={80}>
                <LineChart data={getChartData(sleepData, monthlySleepData, yearlySleepData)}>
                  <Line type="monotone" dataKey="hours" stroke="#90CAF9" strokeWidth={2} dot={{ fill: '#90CAF9', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4 flex items-center justify-center">
                <div className="relative">
                  <ResponsiveContainer width={120} height={120}>
                    <PieChart>
                      <Pie
                        data={heartRateData}
                        cx="50%"
                        cy="50%"
                        innerRadius={35}
                        outerRadius={50}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                      >
                        {heartRateData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-xs text-gray-500">Avg.</p>
                    <p className="text-xs text-gray-500">Heart Rate:</p>
                    <p className="text-sm font-medium">72 bpm</p>
                  </div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Heart Rate</p>
                  <p className="text-xs text-gray-600">(avg: 72 bpm)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Screen Usage Card */}
        <div className="bg-white rounded-2xl p-5 shadow-md mb-4">
          <div className="mb-3">
            <h3 className="text-lg font-medium">{getTimeText('Weekly', 'Monthly', 'Yearly')} Screen Usage</h3>
            <p className="text-sm text-gray-600">My Screen Time ({getTimeText('Mar 23-29', 'March', '2026')})</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Screen Time Chart */}
            <div>
              <p className="text-sm font-medium mb-2">Total: Daily Use: 5.5h</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={getChartData(screenData, monthlyScreenData, yearlyScreenData)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="social" stackId="a" fill="#90CAF9" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="productivity" stackId="a" fill="#FFB74D" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="health" stackId="a" fill="#A5D6A7" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>

              <div className="flex gap-4 justify-center mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#90CAF9]"></div>
                  <span className="text-xs text-gray-600">Social</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#A5D6A7]"></div>
                  <span className="text-xs text-gray-600">Health</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm bg-[#FFB74D]"></div>
                  <span className="text-xs text-gray-600">Productivity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
          <button
            onClick={onNavigateToCalendar}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <CalendarIcon className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#6B46C1]">
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