import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Moon, Sun } from "lucide-react";

const CycleTracker = () => {
  const currentDay = 12;
  const cycleLength = 28;
  const phase = getCurrentPhase(currentDay);
  
  function getCurrentPhase(day: number) {
    if (day >= 1 && day <= 5) return "menstrual";
    if (day >= 6 && day <= 13) return "follicular";
    if (day >= 14 && day <= 16) return "ovulation";
    return "luteal";
  }

  const phases = [
    {
      name: "Menstrual",
      icon: Moon,
      days: "1-5",
      description: "Your period. Rest and be gentle with yourself.",
      color: "text-destructive",
      bgColor: "bg-destructive/10"
    },
    {
      name: "Follicular", 
      icon: Sun,
      days: "6-13",
      description: "Energy is building. Great time to start new projects.",
      color: "text-secondary-foreground",
      bgColor: "bg-secondary/50"
    },
    {
      name: "Ovulation",
      icon: Heart,
      days: "14-16", 
      description: "Peak energy and fertility. You might feel most social.",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      name: "Luteal",
      icon: Calendar,
      days: "17-28",
      description: "Energy may dip. Focus on self-care and completion.",
      color: "text-accent-foreground",
      bgColor: "bg-accent/30"
    }
  ];

  const currentPhaseData = phases.find(p => p.name.toLowerCase() === phase);

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Cycle Tracker</h1>
          <p className="text-muted-foreground">Understanding your natural rhythm</p>
        </div>

        {/* Current Day Display */}
        <Card className="mb-8 bg-gradient-primary border-0 shadow-glow">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <div className="text-primary-foreground">
                <p className="text-lg opacity-90">Day</p>
                <p className="text-5xl font-bold">{currentDay}</p>
                <p className="text-sm opacity-75">of {cycleLength} day cycle</p>
              </div>
              
              {/* Progress Circle */}
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="rgba(255,255,255,0.8)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - currentDay / cycleLength)}`}
                    className="transition-all duration-300"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Current Phase */}
        {currentPhaseData && (
          <Card className={`mb-8 ${currentPhaseData.bgColor} shadow-soft`}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-3">
                <div className={`p-3 rounded-full bg-white/20`}>
                  <currentPhaseData.icon className={`h-6 w-6 ${currentPhaseData.color}`} />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${currentPhaseData.color}`}>
                    {currentPhaseData.name} Phase
                  </h3>
                  <p className={`text-sm ${currentPhaseData.color} opacity-75`}>
                    Days {currentPhaseData.days}
                  </p>
                </div>
              </div>
              <p className={`text-sm ${currentPhaseData.color} opacity-90`}>
                {currentPhaseData.description}
              </p>
            </CardContent>
          </Card>
        )}

        {/* All Phases Overview */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-foreground mb-4">Cycle Phases</h2>
          {phases.map((phaseData, index) => {
            const Icon = phaseData.icon;
            const isActive = phaseData.name.toLowerCase() === phase;
            
            return (
              <Card 
                key={index} 
                className={`${isActive ? phaseData.bgColor : 'bg-card'} shadow-soft border ${isActive ? 'border-primary/20' : 'border-border'}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${isActive ? phaseData.color : 'text-muted-foreground'}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${isActive ? phaseData.color : 'text-foreground'}`}>
                          {phaseData.name}
                        </h4>
                        <span className={`text-xs ${isActive ? phaseData.color : 'text-muted-foreground'} opacity-75`}>
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
      </div>
    </div>
  );
};

export default CycleTracker;