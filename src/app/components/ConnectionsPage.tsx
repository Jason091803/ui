import { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, Home, Users, ListChecks, Calendar, Settings, ChevronDown, ChevronUp, Send, ChevronRight, CheckCircle, BarChart3 } from 'lucide-react';
import lightbulbIcon from '../../assets/f0473e7ef1f176f5b3ec43d0d8ac7fcbcc263b51.png';

interface ConnectionsPageProps {
  onNavigateToHome: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
}

export default function ConnectionsPage({ onNavigateToHome, onNavigateToActivities, onNavigateToCalendar, onNavigateToData }: ConnectionsPageProps) {
  const [isCareTeamExpanded, setIsCareTeamExpanded] = useState(true);
  const [isFeedbackExpanded, setIsFeedbackExpanded] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmitFeedback = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setIsFeedbackExpanded(false);
      setFeedback('');
    }, 2000);
  };

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
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#6B46C1] text-white px-6 py-2 rounded-full text-sm hover:bg-[#5a3ba3] transition-colors">
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

        {/* Feedback Section */}
        {!isFeedbackExpanded ? (
          <button
            onClick={() => setIsFeedbackExpanded(true)}
            className="w-full bg-gradient-to-br from-[#D8CEF0] to-[#C8BDE5] rounded-3xl shadow-lg p-5 flex items-center gap-4 hover:shadow-xl transition-all border border-[#B5A5D8]/30"
          >
            <div className="flex-shrink-0">
              <img src={lightbulbIcon} alt="Lightbulb" className="w-14 h-14" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-lg text-gray-800 mb-0.5">Help Improve the App?</h3>
              <p className="text-sm text-gray-600">Tap to share feedback</p>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-600 flex-shrink-0" />
          </button>
        ) : (
          <div className="bg-white rounded-2xl shadow-md p-4">
            {showSuccessMessage ? (
              <div className="py-8 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl text-gray-800 mb-2">Thank you!</h3>
                <p className="text-gray-600 text-center">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl">Feedback</h2>
                  <button
                    onClick={() => setIsFeedbackExpanded(false)}
                    className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600 mb-4">We'd love to hear your thoughts! Share your feedback to help us improve.</p>

                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback here..."
                  className="w-full h-32 p-4 rounded-xl bg-[#F5F1E8] border border-gray-200 text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#6B46C1]"
                />

                <button
                  onClick={handleSubmitFeedback}
                  className="w-full mt-4 bg-[#6B46C1] text-white py-3 rounded-full hover:bg-[#5a3ba3] transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </button>
              </>
            )}
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
          <button className="flex flex-col items-center gap-1 text-[#6B46C1]">
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
          <button className="flex flex-col items-center gap-1 text-gray-400">
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
