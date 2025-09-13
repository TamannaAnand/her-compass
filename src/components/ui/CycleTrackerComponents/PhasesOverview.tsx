import { Card, CardContent } from "@/components/ui/card";

const PhasesOverview = ({ phases, currentPhase }) => {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-rose-800 mb-4">Cycle Phases</h2>
      {phases.map((phaseData, index) => {
        const Icon = phaseData.icon;
        const isActive = currentPhase && phaseData.name.toLowerCase() === currentPhase;
        
        return (
          <Card 
            key={index} 
            className={`${isActive ? phaseData.bgColor + ' border-rose-300' : 'bg-white border-gray-200'} shadow-sm border-2 transition-all duration-200`}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${isActive ? phaseData.color : 'text-gray-400'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`font-medium ${isActive ? phaseData.color : 'text-gray-700'}`}>
                      {phaseData.name}
                    </h4>
                    <span className={`text-xs ${isActive ? phaseData.color : 'text-gray-500'} opacity-75`}>
                      Days {phaseData.days}
                    </span>
                  </div>
                  {isActive && (
                    <p className={`text-sm mt-1 ${phaseData.color} opacity-90`}>
                      {phaseData.description}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PhasesOverview;