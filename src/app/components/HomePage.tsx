import { useState } from 'react';
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
  userName: string;
  onNavigateToLogin: () => void;
  onNavigateToSymptomList: () => void;
  onNavigateToConnections: () => void;
  onNavigateToActivities: () => void;
  onNavigateToCalendar: () => void;
  onNavigateToData: () => void;
  onNavigateToSettings?: () => void;
}

 export default function HomePage({ userName, onNavigateToLogin, onNavigateToSymptomList, onNavigateToConnections, onNavigateToActivities, onNavigateToCalendar, onNavigateToData , onNavigateToSettings }: HomePageProps) {
  const [medications, setMedications] = useState([
    { id: 1, name: 'Aspirin - 81mg', instruction: 'Take 1 pill after breakfast', taken: true },
    { id: 2, name: 'Vitamin D3 - 1000 IU', instruction: 'Take 1 capsule at noon', taken: false },
  ]);
  const [sleepScore, setSleepScore] = useState(4);
  const symptomOptions = [
    { id: 'healthy', label: 'Healthy', icon: healthyIcon },
    { id: 'headache', label: 'Headache', icon: headacheIcon },
    { id: 'dizziness', label: 'Dizziness', icon: dizzinessIcon },
    { id: 'fever', label: 'Fever', icon: feverIcon },
    { id: 'cough', label: 'Cough', icon: coughIcon },
    { id: 'sore-throat', label: 'Sore Throat', icon: soreThroatIcon },
    { id: 'sneezing', label: 'Sneezing', icon: sneezingIcon },
    { id: 'loss-of-appetite', label: 'Loss of Appetite', icon: lossOfAppetiteIcon },
  ] as const;
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({});

  const toggleMedication = (id: number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const toggleSymptom = (symptomId: string) => {
    if (symptomId === 'healthy') {
      setSelectedSymptoms({});
      return;
    }

    setSelectedSymptoms((prev) => {
      if (prev[symptomId]) {
        const next = { ...prev };
        delete next[symptomId];
        return next;
      }
      return { ...prev, [symptomId]: 5 };
    });
  };

  const updateSymptomSeverity = (symptomId: string, severity: number) => {
    setSelectedSymptoms((prev) => ({ ...prev, [symptomId]: severity }));
  };

  const activeSymptoms = symptomOptions.filter(
    (symptom) => symptom.id !== 'healthy' && selectedSymptoms[symptom.id]
  );
  const sleepDescriptions: Record<number, string> = {
    1: 'Very poor. Hardly slept and woke up exhausted.',
    2: 'Poor. Sleep was broken and not very restful.',
    3: 'Okay. Some rest, but still felt tired after waking up.',
    4: 'Good. Slept fairly well and woke up mostly refreshed.',
    5: 'Excellent. Slept deeply and woke up feeling fully rested.',
  };
  const sleepSummary =
    sleepScore >= 4
      ? 'Great sleep quality'
      : sleepScore >= 3
        ? 'Moderate sleep quality'
        : 'Poor sleep quality';

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
        <h1 className="text-2xl text-center mb-6">Good Day, {userName}!</h1>

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

        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg">Sleep</h2>
              <p className="text-sm text-gray-600">Rate how well you slept last night</p>
            </div>
            <div className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
              {sleepScore}/5
            </div>
          </div>

          <input
            type="range"
            min="1"
            max="5"
            value={sleepScore}
            onChange={(e) => setSleepScore(Number(e.target.value))}
            className="w-full accent-[color:var(--theme-primary)]"
          />

          <div className="mt-5 flex justify-between gap-3">
            {Array.from({ length: 5 }, (_, index) => index + 1).map((level) => (
              <button
                key={level}
                onClick={() => setSleepScore(level)}
                className={`h-9 w-9 shrink-0 rounded-full text-xs font-semibold transition-colors ${sleepScore === level ? 'bg-[color:var(--theme-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl bg-[#F9F6EF] px-4 py-3 text-sm text-gray-700">
            <span className="font-semibold text-gray-900">{sleepSummary}</span>
            <p className="mt-1 text-gray-600">{sleepDescriptions[sleepScore]}</p>
          </div>
        </div>

        {/* My Symptoms Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <h2 className="text-lg mb-1">My Symptoms</h2>
          <p className="text-sm text-gray-600 mb-4">Today's Symptoms</p>

          <div className="grid grid-cols-4 gap-3 mb-4">
            {symptomOptions.map((symptom) => {
              const isHealthy = symptom.id === 'healthy';
              const isSelected = isHealthy ? activeSymptoms.length === 0 : Boolean(selectedSymptoms[symptom.id]);

              return (
                <button
                  key={symptom.id}
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`rounded-2xl border p-2 transition-colors ${isSelected ? 'border-[color:var(--theme-primary)] bg-purple-50 shadow-sm' : 'border-transparent hover:bg-gray-50'}`}
                >
                  <img src={symptom.icon} alt={symptom.label} className="w-full h-full object-contain" />
                </button>
              );
            })}
          </div>

          {activeSymptoms.length > 0 ? (
            <div className="mb-4 space-y-3 rounded-2xl bg-[#F9F6EF] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Symptom Intensity</h3>
                  <p className="text-xs text-gray-500">Choose how uncomfortable each symptom feels today.</p>
                </div>
                <button
                  onClick={() => setSelectedSymptoms({})}
                  className="text-xs font-medium text-[color:var(--theme-primary)] hover:text-[color:var(--theme-secondary)]"
                >
                  Clear all
                </button>
              </div>

              {activeSymptoms.map((symptom) => (
                <div key={symptom.id} className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-50 p-1.5">
                        <img src={symptom.icon} alt={symptom.label} className="h-full w-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{symptom.label}</h4>
                        <p className="text-xs text-gray-500">Current intensity</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-[color:var(--theme-primary)]">
                      {selectedSymptoms[symptom.id]}/10
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={selectedSymptoms[symptom.id]}
                    onChange={(e) => updateSymptomSeverity(symptom.id, Number(e.target.value))}
                    className="w-full accent-[color:var(--theme-primary)]"
                  />

                  <div className="mt-3 flex flex-wrap gap-2">
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((level) => (
                      <button
                        key={level}
                        onClick={() => updateSymptomSeverity(symptom.id, level)}
                        className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors ${selectedSymptoms[symptom.id] === level ? 'bg-[color:var(--theme-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mb-4 rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-700">
              Healthy is selected. Choose any symptom above if you want to record how uncomfortable it feels today.
            </div>
          )}

          <button
            onClick={onNavigateToSymptomList}
            className="text-[color:var(--theme-primary)] text-sm mt-2 underline hover:text-[color:var(--theme-secondary)]"
          >
            View Full Symptom List
          </button>
        </div>

        {/* Medication Tracking Card */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
          <div className="flex items-center mb-4">
            <h2 className="text-lg">Daily Medication</h2>
          </div>
          <div className="space-y-3">
             {medications.map(med => (
               <div key={med.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <div className="flex items-center gap-3">
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-sm ${med.id === 1 ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'}`}>💊</div>
                   <div>
                     <h3 className="text-sm font-medium text-gray-800">{med.name}</h3>
                     <p className="text-xs text-gray-500">{med.instruction}</p>
                   </div>
                 </div>
                 <button 
                   onClick={() => toggleMedication(med.id)}
                   className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors shadow-sm ${med.taken ? 'border-green-500 bg-green-500 text-white' : 'border-gray-300 bg-white hover:bg-gray-100'}`}
                 >
                   {med.taken && <span className="text-xs font-bold leading-none block pb-0.5">✓</span>}
                 </button>
               </div>
             ))}
          </div>
        </div>

        {/* Upcoming Activities Card */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg">Upcoming Activities</h2>
            <button className="text-[color:var(--theme-primary)] text-sm hover:text-[color:var(--theme-secondary)]">See All</button>
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
          <button className="flex flex-col items-center gap-1 text-[color:var(--theme-primary)]">
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
