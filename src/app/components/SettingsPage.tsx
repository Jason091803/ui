import { useState } from 'react';
import { ArrowLeft, Bell, Home, Users, ListChecks, Calendar, Settings as SettingsIcon, BarChart3, ChevronRight, User, Lock, Shield, MessageSquare, LogOut, X, CheckCircle, Send, Palette } from 'lucide-react';

interface SettingsPageProps {
  onNavigateToHome: () => void;
  onNavigateToConnections?: () => void;
  onNavigateToActivities?: () => void;
  onNavigateToCalendar?: () => void;
  onNavigateToData?: () => void;
  onNavigateToLogin?: () => void;
}

export default function SettingsPage({ 
  onNavigateToHome, 
  onNavigateToConnections, 
  onNavigateToActivities, 
  onNavigateToCalendar, 
  onNavigateToData,
  onNavigateToLogin
}: SettingsPageProps) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [userName, setUserName] = useState('Jason');
  const [activeModal, setActiveModal] = useState<'none' | 'name' | 'password' | 'terms' | 'feedback' | 'theme'>('none');
  
  // Theme Color State
  const [activeTheme, setActiveTheme] = useState('TherapySoft');

  // Feedback component state
  const [feedback, setFeedback] = useState('');
  const [showFeedbackSuccess, setShowFeedbackSuccess] = useState(false);
  
  // Form editing states
  const [tempName, setTempName] = useState(userName);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const openModal = (modalName: 'none' | 'name' | 'password' | 'terms' | 'feedback' | 'theme') => {
    setActiveModal(modalName);
    if (modalName === 'name') setTempName(userName);
  };

  const closeModal = () => {
    setActiveModal('none');
  };

  const handleSaveName = () => {
    if (tempName.trim()) setUserName(tempName);
    closeModal();
  };

  const handleSavePassword = () => {
    // Dummy act of saving a password
    setOldPassword('');
    setNewPassword('');
    closeModal();
  };

  const handleSubmitFeedback = () => {
    setShowFeedbackSuccess(true);
    setTimeout(() => {
      setShowFeedbackSuccess(false);
      closeModal();
      setFeedback('');
    }, 2000);
  };

  const themes = [
    { id: 'light', bg: 'bg-[#F2F0F4]', header: 'bg-[#E3DFE8]', dot: 'bg-[#F6DE54]', name: 'Light Mode', primary: '#9CA3AF', secondary: '#6B7280', dark: '#4B5563', ext: '#374151' },
    { id: 'purple', bg: 'bg-[#8B5CF6]', header: 'bg-[#7C3AED]', dot: 'bg-[#F59E0B]', name: 'TherapySoft', primary: '#6B46C1', secondary: '#5a3ba3', dark: '#4c2c8f', ext: '#4A148C' },
    { id: 'teal', bg: 'bg-[#14B8A6]', header: 'bg-[#0D9488]', dot: 'bg-[#F97316]', name: 'Ocean Teal', primary: '#0D9488', secondary: '#0F766E', dark: '#115E59', ext: '#134E4A' },
    { id: 'orange', bg: 'bg-[#F97316]', header: 'bg-[#EA580C]', dot: 'bg-[#FCD34D]', name: 'Sunset', primary: '#F97316', secondary: '#EA580C', dark: '#C2410C', ext: '#9A3412' },
    { id: 'blue', bg: 'bg-[#3B82F6]', header: 'bg-[#2563EB]', dot: 'bg-[#34D399]', name: 'Sky Blue', primary: '#3B82F6', secondary: '#2563EB', dark: '#1D4ED8', ext: '#1E3A8A' },
    { id: 'dark', bg: 'bg-[#1F2937]', header: 'bg-[#111827]', dot: 'bg-[#D1D5DB]', name: 'Dark Mode', primary: '#374151', secondary: '#1F2937', dark: '#111827', ext: '#030712' },
    { id: 'green', bg: 'bg-[#166534]', header: 'bg-[#14532D]', dot: 'bg-[#A7F3D0]', name: 'Forest', primary: '#15803D', secondary: '#166534', dark: '#14532D', ext: '#064E3B' },
    { id: 'magenta', bg: 'bg-[#D946EF]', header: 'bg-[#C026D3]', dot: 'bg-[#FDF4FF]', name: 'Magenta', primary: '#D946EF', secondary: '#C026D3', dark: '#A21CAF', ext: '#701A75' },
    { id: 'cyan', bg: 'bg-[#06B6D4]', header: 'bg-[#0891B2]', dot: 'bg-[#FEF08A]', name: 'Cyan', primary: '#06B6D4', secondary: '#0891B2', dark: '#0E7490', ext: '#164E63' },
  ];

  const handleApplyTheme = (t: any) => {
    setActiveTheme(t.name);
    if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--theme-primary', t.primary);
        document.documentElement.style.setProperty('--theme-secondary', t.secondary);
        document.documentElement.style.setProperty('--theme-dark', t.dark);
        document.documentElement.style.setProperty('--theme-extra-dark', t.ext);
    }
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto relative">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={onNavigateToHome} className="text-gray-700 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-lg font-medium text-gray-800">Settings</span>
        <button className="text-gray-700 hover:text-gray-900 transition-colors">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-24 max-w-md mx-auto w-full">
        
        {/* Profile Card */}
        <div 
            onClick={() => openModal('name')}
            className="bg-white rounded-3xl shadow-sm p-6 mb-8 flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[color:var(--theme-primary)] flex items-center justify-center text-white text-2xl font-bold shadow-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">{userName}</h2>
              <p className="text-gray-500 text-sm">Patient Account</p>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          
          {/* Account */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Account</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              <button 
                onClick={() => openModal('name')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                    <User className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">Personal Information</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => openModal('password')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">Password & Security</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </section>

          {/* Preferences */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Preferences</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              <button 
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors outline-none"
                onClick={() => setPushEnabled(!pushEnabled)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">Push Notifications</span>
                </div>
                <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${pushEnabled ? 'bg-[color:var(--theme-primary)]' : 'bg-gray-300'} flex items-center px-1`}>
                  <div className={`w-4 h-4 bg-white rounded-full absolute shadow-sm transition-all duration-300 ${pushEnabled ? 'right-1' : 'left-1'}`}></div>
                </div>
              </button>
              <button 
                onClick={() => openModal('theme')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--theme-dark)] flex items-center justify-center text-white">
                    <Palette className="w-4 h-4" />
                  </div>
                  <span className="text-[color:var(--theme-dark)] font-bold">Theme Colors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-sm"></span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </button>
            </div>
          </section>

          {/* Support & About */}
          <section>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">Support & About</h3>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden divide-y divide-gray-100">
              <button 
                 onClick={() => openModal('feedback')}
                 className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">Help Improve</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
              <button 
                onClick={() => openModal('terms')}
                className="w-full px-4 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                    <Shield className="w-4 h-4" />
                  </div>
                  <span className="text-gray-800 font-medium">Terms & Privacy</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </section>

          {/* Log Out */}
          <section className="pt-2">
            <button 
              onClick={onNavigateToLogin}
              className="w-full bg-white rounded-2xl shadow-sm px-4 py-4 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 transition-colors border border-red-100"
            >
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </section>

        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm">App Version 1.0.0</p>
        </div>
      </main>

      {/* --- MODAL RENDERING BLOCKS --- */}

      {/* Change Name Modal */}
      {activeModal === 'name' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[90%] sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-10 sm:pb-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Edit Name</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
            <input 
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all bg-[#F9F7F5]"
              placeholder="Enter your name"
            />
            <button 
              onClick={handleSaveName}
              className="w-full mt-6 bg-[color:var(--theme-primary)] text-white py-4 rounded-xl font-bold hover:bg-[color:var(--theme-secondary)] transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {activeModal === 'password' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-[90%] sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 pb-10 sm:pb-6 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">Change Password</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input 
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all bg-[#F9F7F5]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)] transition-all bg-[#F9F7F5]"
                  placeholder="Enter new password"
                />
              </div>
            </div>
            <button 
              onClick={handleSavePassword}
              disabled={!oldPassword || !newPassword}
              className="w-full mt-6 bg-[color:var(--theme-primary)] text-white py-4 rounded-xl font-bold hover:bg-[color:var(--theme-secondary)] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {/* Terms & Privacy Document Modal */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-[#FDFCF9] w-full sm:max-w-md h-[90vh] sm:h-[80vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-white shadow-sm z-10">
              <h3 className="text-xl font-bold text-gray-800">Terms & Privacy</h3>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-8">
              <div className="space-y-8 max-w-[280px] mx-auto text-left">
                {/* Rule 1 */}
                <section>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">1. Acceptance of Terms</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">By using our services, you agree to be bound by these terms.</p>
                </section>
                {/* Rule 2 */}
                <section>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">2. User Responsibilities</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">You are responsible for keeping your account secure and complying with all applicable laws.</p>
                </section>
                {/* Rule 3 */}
                <section>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">3. Service Changes</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">We may modify or terminate the service at any time without notice.</p>
                </section>
                {/* Rule 4 */}
                <section>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">4. Limitation of Liability</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">We are not liable for any damages resulting from the use of our service.</p>
                </section>
                {/* Rule 5 */}
                <section>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 tracking-tight">5. Contact Us</h4>
                  <p className="text-[15px] leading-relaxed text-gray-600 font-medium">For questions, contact: <br/><span className="text-gray-800">test@braverventures.com</span></p>
                </section>
              </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-100">
              <button 
                 onClick={closeModal}
                 className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-xl font-bold hover:bg-[color:var(--theme-secondary)] transition-colors shadow-sm"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Improve Feedback Modal */}
      {activeModal === 'feedback' && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in zoom-in-95 duration-200">
            {showFeedbackSuccess ? (
              <div className="py-8 flex flex-col items-center justify-center">
                <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">Thank you!</h3>
                <p className="text-gray-600 text-center">Your feedback has been submitted successfully.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Feedback</h2>
                  <button onClick={closeModal} className="text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
                </div>
                <p className="text-gray-600 mb-4 text-sm">We'd love to hear your thoughts! Share your feedback to help us improve.</p>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Share your feedback here..."
                  className="w-full h-32 p-4 rounded-xl bg-[#F9F7F5] border border-gray-200 text-gray-700 placeholder:text-gray-400 resize-none focus:outline-none focus:border-[color:var(--theme-primary)] focus:ring-1 focus:ring-[color:var(--theme-primary)]"
                />
                <button
                  onClick={handleSubmitFeedback}
                  disabled={!feedback.trim()}
                  className="w-full mt-4 bg-[color:var(--theme-primary)] text-white py-4 rounded-xl font-bold hover:bg-[color:var(--theme-secondary)] transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  Submit Feedback
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Theme Colors Full Modal */}
      {activeModal === 'theme' && (
        <div className="fixed inset-0 bg-[#FDFCF9] z-50 flex flex-col animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
          <div className="pt-12 pb-4 px-6 relative flex-shrink-0">
            <button 
              onClick={closeModal} 
              className="absolute left-4 top-10 text-gray-500 hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-extrabold text-center text-gray-900 tracking-tight">Settings</h1>
          </div>
          
          <div className="px-6 py-6 pb-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                 <div className="text-[color:var(--theme-dark)]">
                    <Palette className="w-6 h-6" />
                 </div>
                 <h2 className="text-2xl font-bold text-[color:var(--theme-dark)]">Theme Colors</h2>
              </div>
              <div className="text-xs font-semibold px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full">
                Current: {activeTheme}
              </div>
            </div>
            <p className="text-[15px] text-gray-600 leading-relaxed text-center mt-2 mb-8">
              Choose your preferred color scheme to personalize your experience.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-12">
            <div className="grid grid-cols-3 gap-4 max-w-[320px] mx-auto">
              {themes.map((t) => (
                <button 
                  key={t.id} 
                  onClick={() => handleApplyTheme(t)}
                  className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 ${activeTheme === t.name ? 'ring-4 ring-yellow-400 ring-offset-2 scale-[1.03] shadow-lg shadow-yellow-100' : 'hover:scale-105 shadow-sm'}`}
                >
                  <div className={`w-full h-full ${t.bg} relative`}>
                    {/* Fake Header element */}
                    <div className="absolute top-2 left-2 right-2 h-1.5 rounded-full overflow-hidden opacity-80 mix-blend-multiply">
                       <div className={`w-full h-full ${t.header}`}></div>
                    </div>
                    {/* Bottom Right Dot */}
                    <div className={`absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-white/90 shadow-sm ${t.dot}`}></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] text-gray-400">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={onNavigateToHome}
            className="flex flex-col items-center gap-1 transition-colors hover:text-gray-600"
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={onNavigateToConnections}
            className="flex flex-col items-center gap-1 transition-colors hover:text-gray-600"
          >
            <Users className="w-6 h-6" />
            <span className="text-xs">Connections</span>
          </button>
          <button
            onClick={onNavigateToActivities}
            className="flex flex-col items-center gap-1 transition-colors hover:text-gray-600"
          >
            <ListChecks className="w-6 h-6" />
            <span className="text-xs">Activities</span>
          </button>
          <button
            onClick={onNavigateToCalendar}
            className="flex flex-col items-center gap-1 transition-colors hover:text-gray-600"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-xs">Calendar</span>
          </button>
          <button
            onClick={onNavigateToData}
            className="flex flex-col items-center gap-1 transition-colors hover:text-gray-600"
          >
            <BarChart3 className="w-6 h-6" />
            <span className="text-xs">Data</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[color:var(--theme-primary)]">
            <SettingsIcon className="w-6 h-6" />
            <span className="text-xs border-b-2 border-[color:var(--theme-primary)] pb-0.5">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
