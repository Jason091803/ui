import { useState } from 'react';
import { X } from 'lucide-react';

interface FullSymptomListPageProps {
  onNavigateBack: () => void;
}

export default function FullSymptomListPage({ onNavigateBack }: FullSymptomListPageProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Record<string, number>>({});
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [otherSymptom, setOtherSymptom] = useState('');
  const [otherSeverity, setOtherSeverity] = useState(5);

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

  const handleOtherClick = () => {
    setShowOtherInput(true);
  };

  const handleSubmit = () => {
    console.log('Selected symptoms:', selectedSymptoms);
    if (otherSymptom) {
      console.log('Other symptom:', otherSymptom);
      console.log('Other symptom severity:', otherSeverity);
    }
    onNavigateBack();
  };

  const activeSymptoms = symptoms.filter(
    (symptom) => symptom.id !== 'healthy' && selectedSymptoms[symptom.id]
  );

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
              <div key={symptom.id} className="space-y-2">
                <button
                  onClick={() => toggleSymptom(symptom.id)}
                  className={`w-full px-4 py-3 rounded-lg text-sm text-left transition-all ${
                    symptom.id === 'healthy'
                      ? activeSymptoms.length === 0
                        ? 'bg-[color:var(--theme-primary)] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      : selectedSymptoms[symptom.id]
                        ? 'bg-[color:var(--theme-primary)] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {symptom.name}
                </button>

                {symptom.id !== 'healthy' && selectedSymptoms[symptom.id] ? (
                  <div className="rounded-2xl bg-[#F9F6EF] p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs font-semibold text-gray-700">Intensity</p>
                      <div className="rounded-full bg-purple-50 px-2.5 py-1 text-xs font-semibold text-[color:var(--theme-primary)]">
                        {selectedSymptoms[symptom.id]}/10
                      </div>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={selectedSymptoms[symptom.id]}
                      onChange={(e) => updateSymptomSeverity(symptom.id, Number(e.target.value))}
                      className="mt-3 w-full accent-[color:var(--theme-primary)]"
                    />

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((level) => (
                        <button
                          key={level}
                          onClick={() => updateSymptomSeverity(symptom.id, level)}
                          className={`h-7 w-7 rounded-full text-[11px] font-semibold transition-colors ${selectedSymptoms[symptom.id] === level ? 'bg-[color:var(--theme-primary)] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {activeSymptoms.length > 0 ? (
            <div className="mb-6 rounded-2xl bg-[#F9F6EF] p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">Selected Symptom Summary</h3>
                  <p className="text-xs text-gray-500">Review how uncomfortable each selected symptom feels today.</p>
                </div>
                <button
                  onClick={() => setSelectedSymptoms({})}
                  className="text-xs font-medium text-[color:var(--theme-primary)] hover:text-[color:var(--theme-secondary)]"
                >
                  Clear all
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeSymptoms.map((symptom) => (
                  <div key={symptom.id} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                    {symptom.name}: {selectedSymptoms[symptom.id]}/10
                  </div>
                ))}
              </div>
            </div>
          ) : null}

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
                {otherSymptom.trim() ? (
                  <div className="rounded-2xl bg-[#F9F6EF] p-4 mt-3">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800">Other Symptom Intensity</h3>
                        <p className="text-xs text-gray-500">Measure how uncomfortable this symptom feels today.</p>
                      </div>
                      <div className="rounded-full bg-purple-50 px-3 py-1 text-sm font-semibold text-[color:var(--theme-primary)]">
                        {otherSeverity}/10
                      </div>
                    </div>

                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={otherSeverity}
                      onChange={(e) => setOtherSeverity(Number(e.target.value))}
                      className="mt-4 w-full accent-[color:var(--theme-primary)]"
                    />

                    <div className="mt-3 flex flex-wrap gap-2">
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((level) => (
                        <button
                          key={level}
                          onClick={() => setOtherSeverity(level)}
                          className={`h-8 w-8 rounded-full text-xs font-semibold transition-colors ${otherSeverity === level ? 'bg-[color:var(--theme-primary)] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}
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
