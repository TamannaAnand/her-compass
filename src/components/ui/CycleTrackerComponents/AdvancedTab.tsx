const AdvancedTab = ({ formData, updateFormData }) => {
  const regularityOptions = [
    { value: 'very-regular', label: 'Very regular', desc: '(±2 days)' },
    { value: 'regular', label: 'Fairly regular', desc: '(±5 days)' },
    { value: 'irregular', label: 'Somewhat irregular', desc: '(±7 days)' },
    { value: 'very-irregular', label: 'Very irregular', desc: '(>7 days)' }
  ];

  return (
    <div className="space-y-6">
      {/* Cycle Regularity */}
      <div>
        <label className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg cursor-pointer">
          <input 
            type="checkbox" 
            checked={formData.enableRegularity}
            onChange={(e) => updateFormData({ enableRegularity: e.target.checked })}
            className="rounded text-rose-400 focus:ring-rose-300"
          />
          <span className="text-sm font-medium text-rose-700">Track cycle regularity</span>
        </label>
        {formData.enableRegularity && (
          <div className="mt-3 pl-3 space-y-2">
            {regularityOptions.map((reg) => (
              <label key={reg.value} className="flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer">
                <input 
                  type="radio" 
                  name="cycleRegularity" 
                  value={reg.value}
                  checked={formData.cycleRegularity === reg.value}
                  onChange={(e) => updateFormData({ cycleRegularity: e.target.value })}
                  className="text-rose-400 focus:ring-rose-300"
                />
                <span className="text-sm text-gray-700">
                  {reg.label} <span className="text-gray-500">{reg.desc}</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>
      
      {/* Flow Patterns */}
      <div className="pt-4 border-t border-rose-100">
        <label className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg cursor-pointer">
          <input 
            type="checkbox" 
            checked={formData.enableFlowTracking}
            onChange={(e) => updateFormData({ enableFlowTracking: e.target.checked })}
            className="rounded text-rose-400 focus:ring-rose-300"
          />
          <span className="text-sm font-medium text-rose-700">Track flow patterns</span>
        </label>
        {formData.enableFlowTracking && (
          <div className="mt-3 pl-3">
            <p className="text-sm text-gray-600">Flow tracking options would go here...</p>
          </div>
        )}
      </div>
      
      {/* Luteal Phase */}
      <div className="pt-4 border-t border-rose-100">
        <label className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg cursor-pointer">
          <input 
            type="checkbox" 
            checked={formData.enableLutealPhase}
            onChange={(e) => updateFormData({ enableLutealPhase: e.target.checked })}
            className="rounded text-rose-400 focus:ring-rose-300"
          />
          <span className="text-sm font-medium text-rose-700">Adjust luteal phase</span>
        </label>
        {formData.enableLutealPhase && (
          <div className="mt-3 pl-3">
            <h4 className="text-sm font-medium text-rose-700 mb-1">Days from ovulation to period</h4>
            <p className="text-xs text-gray-500 mb-3">Most people have 14 days</p>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="8" 
                max="17" 
                value={formData.lutealPhase}
                onChange={(e) => updateFormData({ lutealPhase: e.target.value })}
                className="flex-1 h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-sm font-medium text-rose-700 w-20">{formData.lutealPhase} days</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>8</span>
              <span>17</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedTab;