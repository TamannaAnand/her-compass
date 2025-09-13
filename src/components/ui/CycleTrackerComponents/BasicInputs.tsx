import { ChevronRight } from "lucide-react";
import AdvancedOptions from "./AdvancedOptions";
import { useState } from "react";

const BasicInputs = ({ formData, updateFormData, onCalculate, isFormValid }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const adjustValue = (field, delta) => {
    if (field === 'cycleLength') {
      const newValue = Math.max(21, Math.min(35, formData.cycleLength + delta));
      updateFormData({ cycleLength: newValue });
    } else if (field === 'periodDuration') {
      const newValue = Math.max(1, Math.min(10, formData.periodDuration + delta));
      updateFormData({ periodDuration: newValue });
    }
  };

  return (
    <div className="p-6 bg-rose-50 rounded-xl mx-auto mt-4 mb-4 shadow-sm">
      <h2 className="text-xl font-medium text-rose-800 mb-5">Track Your Journey</h2>
      
      {/* Basic Inputs */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <label htmlFor="lastPeriodDate" className="block text-sm font-medium text-rose-700 mb-2">
            When did it start?
          </label>
          <input 
            type="date" 
            id="lastPeriodDate" 
            value={formData.lastPeriodDate}
            onChange={(e) => updateFormData({ lastPeriodDate: e.target.value })}
            className="w-full px-4 py-2.5 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-2">
            Your usual cycle
          </label>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => adjustValue('cycleLength', -1)} 
              className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-full hover:bg-rose-200 transition-colors"
            >
              <span className="text-lg leading-none text-rose-600">−</span>
            </button>
            <input 
              type="number" 
              value={formData.cycleLength} 
              min="21" 
              max="35" 
              onChange={(e) => updateFormData({ cycleLength: parseInt(e.target.value) || 28 })}
              className="w-16 text-center px-2 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-400 bg-white"
            />
            <button 
              onClick={() => adjustValue('cycleLength', 1)} 
              className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-full hover:bg-rose-200 transition-colors"
            >
              <span className="text-lg leading-none text-rose-600">+</span>
            </button>
            <span className="text-sm text-rose-500">days</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-rose-700 mb-2">
            How long it lasts
          </label>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => adjustValue('periodDuration', -1)} 
              className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-full hover:bg-rose-200 transition-colors"
            >
              <span className="text-lg leading-none text-rose-600">−</span>
            </button>
            <input 
              type="number" 
              value={formData.periodDuration} 
              min="1" 
              max="10" 
              onChange={(e) => updateFormData({ periodDuration: parseInt(e.target.value) || 5 })}
              className="w-16 text-center px-2 py-2 border border-rose-200 rounded-xl focus:ring-2 focus:ring-pink-400 bg-white"
            />
            <button 
              onClick={() => adjustValue('periodDuration', 1)} 
              className="w-10 h-10 flex items-center justify-center bg-rose-100 rounded-full hover:bg-rose-200 transition-colors"
            >
              <span className="text-lg leading-none text-rose-600">+</span>
            </button>
            <span className="text-sm text-rose-500">days</span>
          </div>
        </div>
      </div>
      
      {/* Advanced Options Toggle */}
      <div className="mb-4">
        <button 
          onClick={() => setShowAdvanced(!showAdvanced)} 
          className="group flex items-center gap-3 py-2 bg-rose-50 hover:bg-rose-100 rounded-full transition-all duration-200 w-full"
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-rose-200 rounded-full flex items-center justify-center group-hover:bg-rose-300 transition-colors">
              <ChevronRight className={`w-4 h-4 text-rose-600 transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`} />
            </div>
            <span className="text-sm font-medium text-rose-700">Personalize My Tracking</span>
          </div>
          <span className="text-xs text-rose-500 hidden sm:inline pr-3">Optional</span>
        </button>
      </div>
      
      {/* Update button */}
      <div className="flex justify-center">
        <button 
          onClick={onCalculate}
          disabled={!isFormValid}
          className={`px-8 py-2.5 rounded-full shadow-sm flex items-center text-xl transition-all ${
            isFormValid 
              ? 'bg-rose-500 hover:bg-rose-600 text-white cursor-pointer' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <svg className="w-6 h-6 fill-current mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M512 185.2V15l-67.6 67.6-7.6-7.5a254.2 254.2 0 0 0-181-75C114.9.1 0 115 0 256s114.8 255.9 255.9 255.9S511.8 397 511.8 256h-49.5c0 113.8-92.6 206.4-206.4 206.4S49.5 369.8 49.5 256a206.6 206.6 0 0 1 352.3-146l7.6 7.7-67.6 67.5H512z"/>
            <path d="M255.9 256v-90.8h-49.5v140.3h140.3V256z"/>
          </svg>
          Update My Cycle
        </button>
      </div>
      
      {/* Advanced Options */}
      {showAdvanced && (
        <AdvancedOptions 
          formData={formData}
          updateFormData={updateFormData}
        />
      )}
    </div>
  );
};

export default BasicInputs;