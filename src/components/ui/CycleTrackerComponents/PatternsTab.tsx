import { Info, Plus } from "lucide-react";

const PatternsTab = ({ formData, updateFormData }) => {
  const addCycleInput = () => {
    updateFormData({ 
      previousCycles: [...formData.previousCycles, ''] 
    });
  };

  const removeCycleInput = (index) => {
    const updated = formData.previousCycles.filter((_, i) => i !== index);
    updateFormData({ previousCycles: updated });
  };

  const updateCycleInput = (index, value) => {
    const updated = [...formData.previousCycles];
    updated[index] = value;
    updateFormData({ previousCycles: updated });
  };

  const lifeStages = [
    { value: 'under-18', label: 'I\'m under 18', desc: '(cycles still regulating)' },
    { value: '18-44', label: 'I\'m 18-44', desc: '(regular reproductive years)' },
    { value: '45-plus', label: 'I\'m 45+', desc: '(approaching menopause)' }
  ];

  const pmsTimings = [
    { value: '1-3', label: '1-3 days before period' },
    { value: '4-7', label: '4-7 days before period' },
    { value: '7-14', label: '7-14 days before period' },
    { value: 'none', label: 'No significant PMS' }
  ];

  return (
    <div className="space-y-6">
      {/* Life Stage */}
      <div>
        <h4 className="text-sm font-medium text-rose-700 mb-3 flex items-center gap-2">
          Life Stage
          <Info className="w-4 h-4 text-rose-400" />
        </h4>
        <div className="space-y-2">
          {lifeStages.map((stage) => (
            <label key={stage.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
              <input 
                type="radio" 
                name="lifeStage" 
                value={stage.value}
                checked={formData.lifeStage === stage.value}
                onChange={(e) => updateFormData({ lifeStage: e.target.value })}
                className="text-rose-400 focus:ring-rose-300"
              />
              <span className="text-sm text-gray-700">
                {stage.label} <span className="text-gray-500">{stage.desc}</span>
              </span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Previous Cycles */}
      <div className="pt-4 border-t border-rose-100">
        <h4 className="text-sm font-medium text-rose-700 mb-2">Remember my past cycles</h4>
        <div className="space-y-2">
          {formData.previousCycles.map((cycle, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="date"
                value={cycle}
                onChange={(e) => updateCycleInput(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-rose-200 rounded-lg focus:ring-2 focus:ring-rose-300 bg-white text-sm"
              />
              <button
                onClick={() => removeCycleInput(index)}
                className="px-2 py-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button 
          onClick={addCycleInput}
          className="mt-2 px-4 py-2 text-sm bg-rose-100 text-rose-700 rounded-lg hover:bg-rose-200 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add cycle
        </button>
      </div>
      
      {/* PMS Symptoms */}
      <div className="pt-4 border-t border-rose-100">
        <h4 className="text-sm font-medium text-rose-700 mb-3">When do PMS symptoms appear?</h4>
        <div className="space-y-2">
          {pmsTimings.map((timing) => (
            <label key={timing.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
              <input 
                type="radio" 
                name="pmsTiming" 
                value={timing.value}
                checked={formData.pmsTiming === timing.value}
                onChange={(e) => updateFormData({ pmsTiming: e.target.value })}
                className="text-rose-400 focus:ring-rose-300"
              />
              <span className="text-sm text-gray-700">{timing.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatternsTab;