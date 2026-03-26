import { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, Home, Users, ListChecks, Calendar, Settings, ChevronDown, ChevronUp, ChevronRight, BarChart3 } from 'lucide-react';

interface ConnectionsPageProps {
  onNavigateToHome: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
  onNavigateToSettings?: () => void;
}

export default function ConnectionsPage({ onNavigateToHome, onNavigateToActivities, onNavigateToCalendar, onNavigateToData , onNavigateToSettings }: ConnectionsPageProps) {
  const [isCareTeamExpanded, setIsCareTeamExpanded] = useState(true);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(true);

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[#F5F1E8] px-4 py-4">
        <button
          onClick={onNavigateToHome}
          className="text-gray-700 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl text-center mb-4">Connections</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-12 pr-24 py-3 rounded-full bg-white border border-gray-200 text-gray-700 placeholder:text-gray-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[color:var(--theme-primary)] text-white px-6 py-2 rounded-full text-sm hover:bg-[color:var(--theme-secondary)] transition-colors">
            Search
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-20 max-w-md mx-auto w-full">
        {/* My Care Team Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl">My Care Team</h2>
          <button
            onClick={() => setIsCareTeamExpanded(!isCareTeamExpanded)}
            className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isCareTeamExpanded ? "Collapse care team" : "Expand care team"}
          >
            {isCareTeamExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Care Team Members - Collapsible */}
        {isCareTeamExpanded && (
          <div className="space-y-4 mb-6">
            {/* Dr. Alistair Finch Card */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                    <svg className="w-full h-full text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg">Dr. Alistair Finch</h3>
                  <p className="text-sm text-gray-600">Clinical Psychologist</p>
                  <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    online
                  </p>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors">
                  Message
                </button>
                <button className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors">
                  View Profile
                </button>
              </div>
            </div>

            {/* Sarah Chen Card */}
            <div className="bg-white rounded-2xl shadow-md p-4">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                    <svg className="w-full h-full text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
                    </svg>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-lg">Sarah Chen</h3>
                  <p className="text-sm text-gray-600">Occupational Therapist</p>
                  <p className="text-sm text-gray-600 mt-1">Next Appt: Tomorrow 11am</p>
                </div>

                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-3 mt-4">
                <button className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors">
                  Message
                </button>
                <button className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Doctor's Feedback Section */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-xl text-gray-800">Doctor's Feedback</h2>
          <button
            onClick={() => setIsFeedbackExpanded(!isFeedbackExpanded)}
            className="text-gray-600 hover:text-gray-800 p-1 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label={isFeedbackExpanded ? "Collapse feedback" : "Expand feedback"}
          >
            {isFeedbackExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {isFeedbackExpanded && (
          <div className="space-y-4">
          {/* Feedback Card 1 */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-[color:var(--theme-primary)] relative">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#F5F1E8] flex items-center justify-center text-[color:var(--theme-primary)] font-bold text-sm">
                  AF
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">Dr. Alistair Finch</h3>
              </div>
              <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 shadow-sm">Mar 25, 2026</span>
            </div>
            <h4 className="font-medium text-gray-800 mb-2">Weekly Assessment Review</h4>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Your sleep patterns have shown great improvement this week. I recommend continuing the mindfulness meditation before bed. We can discuss your symptom tracking in our next session.
            </p>
            <div className="flex gap-2">
               <button className="bg-[#F5F1E8] text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-[#e2ddd3] transition-colors">
                 Acknowledge
               </button>
               <button className="text-[color:var(--theme-primary)] bg-[color:var(--theme-primary)]/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-[color:var(--theme-primary)]/20 transition-colors">
                 Reply
               </button>
            </div>
          </div>

          {/* Feedback Card 2 */}
          <div className="bg-white rounded-2xl shadow-sm p-5 border-l-4 border-gray-300 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm">
                  SC
                </div>
                <h3 className="font-semibold text-gray-600 text-sm">Sarah Chen</h3>
              </div>
              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100">Mar 20, 2026</span>
            </div>
            <h4 className="font-medium text-gray-700 mb-2">Physical Therapy Notes</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
              Please remember to keep your posture straight during the desk exercises we practiced. Don't push past the point of pain.
            </p>
          </div>
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
          <button className="flex flex-col items-center gap-1 text-[color:var(--theme-primary)]">
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
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button
            onClick={onNavigateToData}
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Data</span>
          </button>
          <button
            onClick={onNavigateToSettings}
            className="flex flex-col items-center gap-1 text-gray-400 transition-colors hover:text-gray-600"
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
