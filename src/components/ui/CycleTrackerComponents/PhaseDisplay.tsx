import { Card, CardContent } from "@/components/ui/card";

const PhaseDisplay = ({ phaseData }) => {
  const Icon = phaseData.icon;

  return (
    <Card className={`mb-8 ${phaseData.bgColor} shadow-lg border-l-4 border-rose-400`}>
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 rounded-full bg-white/20">
            <Icon className={`h-6 w-6 ${phaseData.color}`} />
          </div>
          <div>
            <h3 className={`text-lg font-semibold ${phaseData.color}`}>
              {phaseData.name} Phase
            </h3>
            <p className={`text-sm ${phaseData.color} opacity-75`}>
              Days {phaseData.days}
            </p>
          </div>
        </div>
        <p className={`text-sm ${phaseData.color} opacity-90`}>
          {phaseData.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default PhaseDisplay;