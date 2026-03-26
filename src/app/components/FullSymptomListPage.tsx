import { useState } from 'react';
import { X } from 'lucide-react';

interface FullSymptomListPageProps {
  onNavigateBack: () => void;
}

export default function FullSymptomListPage({ onNavigateBack }: FullSymptomListPageProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSymptom, setOtherSymptom] = useState('');

  const symptoms = [
    { id: 'healthy', name: 'Healthy / No Symptoms' },
    { id: 'headache', name: 'Headache' },
    { id: 'dizziness', name: 'Dizziness' },
    { id: 'fever', name: 'Fever / Low Fever' },
    { id: 'cough', name: 'Cough' },
    { id: 'sore-throat', name: 'Sore Throat' },
    { id: 'sneezing', name: 'Sneezing' },
    { id: 'loss-of-appetite', name: 'Loss of Appetite' },
    { id: 'fatigue', name: 'Fatigue / Lethargy' },
    { id: 'runny-nose', name: 'Runny Nose' },
    { id: 'nasal-congestion', name: 'Nasal Congestion' },
    { id: 'stomach-pain', name: 'Stomach Pain / Abdominal Pain' },
    { id: 'nausea', name: 'Nausea' },
    { id: 'vomiting', name: 'Vomiting' },
    { id: 'chills', name: 'Chills / Cold Feeling' },
    { id: 'sweating', name: 'Sweating' },
    { id: 'hoarseness', name: 'Hoarseness' },
    { id: 'diarrhea', name: 'Diarrhea' },
    { id: 'constipation', name: 'Constipation' },
    { id: 'muscle-soreness', name: 'Muscle Soreness' },
    { id: 'joint-pain', name: 'Joint Pain' },
    { id: 'back-pain', name: 'Back Pain' },
    { id: 'body-aches', name: 'Body Aches' },
    { id: 'insomnia', name: 'Insomnia' },
    { id: 'blurred-vision', name: 'Blurred Vision' },
    { id: 'numbness', name: 'Numbness in Hands and Feet' },
    { id: 'tinnitus', name: 'Tinnitus' },
    { id: 'concentration', name: 'Impaired Concentration' },
  ];

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const handleOtherClick = () => {
    setShowOtherInput(true);
  };

  const handleSubmit = () => {
    console.log('Selected symptoms:', selectedSymptoms);
    if (otherSymptom) {
      console.log('Other symptom:', otherSymptom);
    }
    onNavigateBack();
  };

  return (
    <div className="size-full flex flex-col bg-[#F5F1E8] overflow-auto">
      <header className="bg-[color:var(--theme-primary)] text-white py-4 px-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl flex-1 text-center">Full Symptom List</h1>
        <button onClick={onNavigateBack} className="text-white hover:bg-[color:var(--theme-secondary)] p-1 rounded">
          <X className="w-6 h-6" />
        </button>
      </header>

      <main className="flex-1 px-4 pt-6 pb-24 max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-lg mb-4">Select Your Symptoms</h2>
          <p className="text-sm text-gray-600 mb-6">You can select multiple symptoms</p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {symptoms.map((symptom) => (
              <button
                key={symptom.id}
                onClick={() => toggleSymptom(symptom.id)}
                className={`px-4 py-3 rounded-lg text-sm text-left transition-all ${
                  selectedSymptoms.includes(symptom.id)
                    ? 'bg-[color:var(--theme-primary)] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {symptom.name}
              </button>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4">
            {!showOtherInput ? (
              <button
                onClick={handleOtherClick}
                className="w-full px-4 py-3 rounded-lg text-sm bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Other (Specify)
              </button>
            ) : (
              <div className="space-y-2">
                <label className="text-sm text-gray-600">Please specify other symptoms:</label>
                <textarea
                  value={otherSymptom}
                  onChange={(e) => setOtherSymptom(e.target.value)}
                  placeholder="Enter your symptoms here..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[color:var(--theme-primary)] focus:ring-2 focus:ring-[color:var(--theme-primary)] focus:ring-opacity-20 outline-none resize-none"
                  rows={3}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      {showOtherInput && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleSubmit}
              className="w-full bg-[color:var(--theme-primary)] text-white py-4 rounded-lg hover:bg-[color:var(--theme-secondary)] transition-colors text-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
