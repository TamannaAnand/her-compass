import { Heart, Plus, Info } from "lucide-react";
import PatternsTab from './PatternsTab';
import AdvancedTab from './AdvancedTab';
import { useState } from "react";

const AdvancedOptions = ({ formData, updateFormData }) => {
  const [activeTab, setActiveTab] = useState('patterns');

  return (
    <div className="mt-6">
      {/* Warm introduction */}
      <div className="mb-4 p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl">
        <p className="text-sm text-rose-700 leading-relaxed flex items-start">
          <Heart className="w-5 h-5 inline mr-2 text-rose-500 mt-0.5 flex-shrink-0" />
          Every body is unique. These optional settings help us provide more personalized insights just for you.
        </p>
      </div>
      
      {/* Tabbed interface */}
      <div className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
        {/* Tab navigation */}
        <div className="flex border-b border-rose-100">
          <button 
            onClick={() => setActiveTab('patterns')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'patterns' 
                ? 'bg-rose-50 text-rose-700 border-b-2 border-rose-400' 
                : 'text-gray-600 hover:text-rose-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
              </svg>
              My Patterns
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              activeTab === 'advanced' 
                ? 'bg-rose-50 text-rose-700 border-b-2 border-rose-400' 
                : 'text-gray-600 hover:text-rose-600'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              Advanced
            </span>
          </button>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {activeTab === 'patterns' ? (
            <PatternsTab formData={formData} updateFormData={updateFormData} />
          ) : (
            <AdvancedTab formData={formData} updateFormData={updateFormData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptions;