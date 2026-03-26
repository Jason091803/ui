import { useState } from 'react';
import { ArrowLeft, Search, MoreVertical, Home, Users, ListChecks, Calendar, Settings, ChevronDown, ChevronUp, ChevronRight, BarChart3, Bell } from 'lucide-react';

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
  const [activeMessageMember, setActiveMessageMember] = useState<null | {
    name: string;
    role: string;
  }>(null);
  const [messageText, setMessageText] = useState('');
  const [activeProfileMember, setActiveProfileMember] = useState<null | {
    name: string;
    role: string;
    status: string;
    specialty: string;
    contact: string;
    nextStep: string;
  }>(null);
  const [feedbackItems, setFeedbackItems] = useState([
    {
      id: 'feedback-1',
      initials: 'AF',
      author: 'Dr. Alistair Finch',
      date: 'Mar 25, 2026',
      title: 'Weekly Assessment Review',
      body: 'Your sleep patterns have shown great improvement this week. I recommend continuing the mindfulness meditation before bed. We can discuss your symptom tracking in our next session.',
      acknowledged: false,
      replyRole: 'Clinical Psychologist',
      muted: false,
    },
    {
      id: 'feedback-2',
      initials: 'SC',
      author: 'Sarah Chen',
      date: 'Mar 20, 2026',
      title: 'Physical Therapy Notes',
      body: "Please remember to keep your posture straight during the desk exercises we practiced. Don't push past the point of pain.",
      acknowledged: false,
      replyRole: 'Occupational Therapist',
      muted: true,
    },
  ]);
  const [activeReplyFeedback, setActiveReplyFeedback] = useState<null | {
    id: string;
    author: string;
    role: string;
  }>(null);
  const [replyText, setReplyText] = useState('');

  const careTeamMembers = [
    {
      id: 'doctor-alistair',
      name: 'Dr. Alistair Finch',
      role: 'Clinical Psychologist',
      status: 'Online now',
      specialty: 'Anxiety, stress, and CBT-based care',
      contact: 'alistair.finch@careteam.health',
      nextStep: 'Weekly therapy review every Tuesday at 2:00 PM',
      indicator: 'online',
    },
    {
      id: 'sarah-chen',
      name: 'Sarah Chen',
      role: 'Occupational Therapist',
      status: 'Next Appt: Tomorrow 11am',
      specialty: 'Routine planning and functional recovery',
      contact: 'sarah.chen@careteam.health',
      nextStep: 'Follow-up on desk routine and posture goals tomorrow',
      indicator: 'scheduled',
    },
  ] as const;

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-[#F5F1E8] px-4 py-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onNavigateToHome}
            className="text-gray-700 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button className="text-gray-500 hover:text-[color:var(--theme-primary)] transition-colors relative">
            <Bell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F5F1E8]"></span>
          </button>
        </div>
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
            {careTeamMembers.map(member => (
              <div key={member.id} className="bg-white rounded-2xl shadow-md p-4">
                <div className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden">
                      <svg className="w-full h-full text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="8" r="4" />
                        <path d="M12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
                      </svg>
                    </div>
                    {member.indicator === 'online' ? (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    ) : null}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.role}</p>
                    <p className={`text-sm mt-1 ${member.indicator === 'online' ? 'text-green-600 flex items-center gap-1' : 'text-gray-600'}`}>
                      {member.indicator === 'online' ? <span className="w-2 h-2 bg-green-500 rounded-full"></span> : null}
                      {member.status}
                    </p>
                  </div>

                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => {
                      setActiveMessageMember({ name: member.name, role: member.role });
                      setMessageText('');
                    }}
                    className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors"
                  >
                    Message
                  </button>
                  <button
                    onClick={() => setActiveProfileMember({
                      name: member.name,
                      role: member.role,
                      status: member.status,
                      specialty: member.specialty,
                      contact: member.contact,
                      nextStep: member.nextStep,
                    })}
                    className="flex-1 bg-[#F5F1E8] text-gray-700 py-3 rounded-full hover:bg-[#ece8df] transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))}
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
            {feedbackItems.map(item => (
              <div
                key={item.id}
                className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 ${item.muted ? 'border-gray-300 opacity-80 hover:opacity-100 transition-opacity' : 'border-[color:var(--theme-primary)] relative'}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${item.muted ? 'bg-gray-100 text-gray-500' : 'bg-[#F5F1E8] text-[color:var(--theme-primary)]'}`}>
                      {item.initials}
                    </div>
                    <h3 className={`font-semibold text-sm ${item.muted ? 'text-gray-600' : 'text-gray-800'}`}>{item.author}</h3>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full border border-gray-100 ${item.muted ? 'text-gray-400 bg-gray-50' : 'text-gray-500 bg-gray-50 shadow-sm'}`}>{item.date}</span>
                </div>
                <h4 className={`font-medium mb-2 ${item.muted ? 'text-gray-700' : 'text-gray-800'}`}>{item.title}</h4>
                <p className={`text-sm leading-relaxed ${item.muted ? 'text-gray-500' : 'text-gray-600'} ${item.acknowledged ? 'mb-3' : 'mb-4'}`}>
                  {item.body}
                </p>
                {item.acknowledged ? (
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Acknowledged
                  </div>
                ) : null}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFeedbackItems((prev) => prev.map((feedback) => feedback.id === item.id ? { ...feedback, acknowledged: true } : feedback))}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${item.acknowledged ? 'bg-emerald-100 text-emerald-700' : 'bg-[#F5F1E8] text-gray-700 hover:bg-[#e2ddd3]'}`}
                  >
                    {item.acknowledged ? 'Acknowledged' : 'Acknowledge'}
                  </button>
                  <button
                    onClick={() => {
                      setActiveReplyFeedback({ id: item.id, author: item.author, role: item.replyRole });
                      setReplyText('');
                    }}
                    className="text-[color:var(--theme-primary)] bg-[color:var(--theme-primary)]/10 px-4 py-2 rounded-full text-sm font-medium hover:bg-[color:var(--theme-primary)]/20 transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {activeMessageMember && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 sm:items-center" onClick={() => setActiveMessageMember(null)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Message {activeMessageMember.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{activeMessageMember.role}</p>
              </div>
              <button onClick={() => setActiveMessageMember(null)} className="rounded-full bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <ChevronRight className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              className="mt-5 h-32 w-full rounded-2xl border border-gray-200 bg-[#F9F7F4] p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)]/20"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setActiveMessageMember(null)}
                className="flex-1 rounded-full border border-gray-200 bg-white py-3 font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (messageText.trim()) {
                    setMessageText('');
                    setActiveMessageMember(null);
                  }
                }}
                disabled={!messageText.trim()}
                className="flex-1 rounded-full bg-[color:var(--theme-primary)] py-3 font-medium text-white hover:bg-[color:var(--theme-secondary)] disabled:opacity-50"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {activeProfileMember && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 sm:items-center" onClick={() => setActiveProfileMember(null)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{activeProfileMember.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{activeProfileMember.role}</p>
              </div>
              <button onClick={() => setActiveProfileMember(null)} className="rounded-full bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <ChevronRight className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-2xl bg-[#F9F7F4] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Status</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{activeProfileMember.status}</p>
              </div>
              <div className="rounded-2xl bg-[#F9F7F4] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Specialty</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{activeProfileMember.specialty}</p>
              </div>
              <div className="rounded-2xl bg-[#F9F7F4] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{activeProfileMember.contact}</p>
              </div>
              <div className="rounded-2xl bg-[#F9F7F4] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Next Step</p>
                <p className="mt-1 text-sm font-medium text-gray-700">{activeProfileMember.nextStep}</p>
              </div>
            </div>

            <button
              onClick={() => setActiveProfileMember(null)}
              className="mt-5 w-full rounded-full bg-[color:var(--theme-primary)] py-3 font-medium text-white hover:bg-[color:var(--theme-secondary)]"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}

      {activeReplyFeedback && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm p-0 sm:items-center" onClick={() => setActiveReplyFeedback(null)}>
          <div className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Reply to {activeReplyFeedback.author}</h3>
                <p className="mt-1 text-sm text-gray-500">{activeReplyFeedback.role}</p>
              </div>
              <button onClick={() => setActiveReplyFeedback(null)} className="rounded-full bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <ChevronRight className="w-5 h-5 rotate-45" />
              </button>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Write your reply here..."
              className="mt-5 h-32 w-full rounded-2xl border border-gray-200 bg-[#F9F7F4] p-4 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[color:var(--theme-primary)]/20"
            />

            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setActiveReplyFeedback(null)}
                className="flex-1 rounded-full border border-gray-200 bg-white py-3 font-medium text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (replyText.trim()) {
                    setReplyText('');
                    setActiveReplyFeedback(null);
                  }
                }}
                disabled={!replyText.trim()}
                className="flex-1 rounded-full bg-[color:var(--theme-primary)] py-3 font-medium text-white hover:bg-[color:var(--theme-secondary)] disabled:opacity-50"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}

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
