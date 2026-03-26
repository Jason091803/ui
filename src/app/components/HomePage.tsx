import { Bell, Home, Users, ListChecks, Calendar, Settings, BarChart3 } from 'lucide-react';
import healthyIcon from '../../assets/d2b0f8035a26d66fec4fcf46ab741ed497858fb8.png';
import headacheIcon from '../../assets/b2c1ba502535293778a6e73cdc21c311f5e2c010.png';
import dizzinessIcon from '../../assets/1ca1a275d1387cf43259141d0d4b1d4a7df687ea.png';
import feverIcon from '../../assets/b937f40205c46e43daf41030b2deaa844a1f7c81.png';
import coughIcon from '../../assets/5bff0feb4470c57adb5c5b527493a9f313a06bf4.png';
import soreThroatIcon from '../../assets/a855ed7687982ab204c3687c1e843787dc44e634.png';
import sneezingIcon from '../../assets/0c700ec4392dac2b2ddc54ed232da9574c13cfe5.png';
import lossOfAppetiteIcon from '../../assets/39ecfbd7c4d3584ef9b3d9d86b67480429e1362b.png';

interface HomePageProps {
  onNavigateToLogin: () => void;
  onNavigateToSymptomList: () => void;
  onNavigateToConnections: () => void;
  onNavigateToActivities: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToData: () => void;
}

export default function HomePage({ onNavigateToLogin, onNavigateToSymptomList, onNavigateToConnections, onNavigateToActivities, onNavigateToCalendar, onNavigateToData }: HomePageProps) {
  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between shadow-sm">
        <button
          onClick={onNavigateToLogin}
          className="text-sm text-gray-600"
        >
          Log out
        </button>
        <button className="text-gray-700">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-6 pb-20 max-w-md mx-auto w-full">
        {/* Greeting */}
        <h1 className="text-2xl text-center mb-6">Good Day, Jason!</h1>

        {/* Daily Journal Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h2 className="text-lg text-center mb-2">Daily Journal</h2>
          <p className="text-sm text-gray-600 text-center mb-4">How are you feeling today?</p>
          <div className="flex justify-center gap-4">
            <button className="text-4xl hover:scale-110 transition-transform">😊</button>
            <button className="text-4xl hover:scale-110 transition-transform">🙂</button>
            <button className="text-4xl hover:scale-110 transition-transform">😐</button>
            <button className="text-4xl hover:scale-110 transition-transform">😟</button>
            <button className="text-4xl hover:scale-110 transition-transform">😰</button>
          </div>
        </div>

        {/* My Symptoms Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-1">My Symptoms</h2>
          <p className="text-sm text-gray-600 mb-4">Today's Symptoms</p>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {/* Healthy/No Symptoms - First */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={healthyIcon} alt="Healthy" className="w-full h-full object-contain" />
            </button>

            {/* Headache */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={headacheIcon} alt="Headache" className="w-full h-full object-contain" />
            </button>

            {/* Dizziness */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={dizzinessIcon} alt="Dizziness" className="w-full h-full object-contain" />
            </button>

            {/* Fever / Low Fever */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={feverIcon} alt="Fever" className="w-full h-full object-contain" />
            </button>

            {/* Cough */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={coughIcon} alt="Cough" className="w-full h-full object-contain" />
            </button>

            {/* Sore Throat */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={soreThroatIcon} alt="Sore Throat" className="w-full h-full object-contain" />
            </button>

            {/* Sneezing */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={sneezingIcon} alt="Sneezing" className="w-full h-full object-contain" />
            </button>

            {/* Loss of Appetite */}
            <button className="flex items-center justify-center p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <img src={lossOfAppetiteIcon} alt="Loss of Appetite" className="w-full h-full object-contain" />
            </button>
          </div>

          <button
            onClick={onNavigateToSymptomList}
            className="text-[#6B46C1] text-sm mt-2 underline hover:text-[#5a3ba3]"
          >
            View Full Symptom List
          </button>
        </div>

        {/* Medication Tracking Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Daily Medication</h2>
            <button className="text-[#6B46C1] text-sm hover:text-[#5a3ba3]">Add/Edit</button>
          </div>
          <div className="space-y-3">
             {/* Medication Item 1 */}
             <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg shadow-sm">💊</div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-800">Aspirin - 81mg</h3>
                   <p className="text-xs text-gray-500">Take 1 pill after breakfast</p>
                 </div>
               </div>
               <button className="w-6 h-6 rounded-full border-2 border-green-500 bg-green-500 flex items-center justify-center text-white">
                 <span className="text-xs">✓</span>
               </button>
             </div>

             {/* Medication Item 2 */}
             <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-lg shadow-sm">💊</div>
                 <div>
                   <h3 className="text-sm font-medium text-gray-800">Vitamin D3 - 1000 IU</h3>
                   <p className="text-xs text-gray-500">Take 1 capsule at noon</p>
                 </div>
               </div>
               <button className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition-colors">
               </button>
             </div>
          </div>
        </div>

        {/* Upcoming Activities Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Upcoming Activities</h2>
            <button className="text-[#6B46C1] text-sm hover:text-[#5a3ba3]">See All</button>
          </div>
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <Calendar className="w-16 h-16 mb-2 opacity-30" />
            <p className="text-sm">No upcoming activities.</p>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-[#6B46C1]">
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
