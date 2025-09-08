import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus, Minus } from "lucide-react";

const WaterTracker = () => {
  const [waterCount, setWaterCount] = useState(4);
  const dailyGoal = 8;
  
  const percentage = Math.min((waterCount / dailyGoal) * 100, 100);

  const addWater = () => {
    if (waterCount < dailyGoal + 4) {
      setWaterCount(prev => prev + 1);
    }
  };

  const removeWater = () => {
    if (waterCount > 0) {
      setWaterCount(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Water Intake</h1>
          <p className="text-muted-foreground">Stay hydrated throughout the day</p>
        </div>

        {/* Water Counter */}
        <Card className="mb-8 bg-gradient-accent border-0 shadow-glow">
          <CardContent className="p-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Droplets className="h-16 w-16 text-secondary-foreground opacity-80" />
            </div>
            
            <div className="space-y-4">
              <div>
                <span className="text-4xl font-bold text-secondary-foreground">{waterCount}</span>
                <span className="text-xl text-secondary-foreground/70 ml-2">/ {dailyGoal}</span>
              </div>
              <p className="text-secondary-foreground/80">glasses today</p>
              
              {/* Progress bar */}
              <div className="w-full bg-white/20 rounded-full h-3 mt-4">
                <div 
                  className="bg-white/60 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-secondary-foreground/70">
                {percentage.toFixed(0)}% of daily goal
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            onClick={removeWater}
            variant="outline"
            size="lg"
            className="h-16 border-primary/20 hover:bg-primary-soft"
            disabled={waterCount === 0}
          >
            <Minus className="h-6 w-6 mr-2" />
            Remove
          </Button>
          <Button
            onClick={addWater}
            size="lg"
            className="h-16 bg-primary hover:bg-primary/90 shadow-soft"
          >
            <Plus className="h-6 w-6 mr-2" />
            Add Glass
          </Button>
        </div>

        {/* Daily Tips */}
        <Card className="bg-card shadow-soft">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="h-5 w-5 text-primary" />
              Hydration Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              • Start your day with a glass of water
            </p>
            <p className="text-sm text-muted-foreground">
              • Keep a water bottle nearby at all times
            </p>
            <p className="text-sm text-muted-foreground">
              • Drink water before, during, and after exercise
            </p>
            <p className="text-sm text-muted-foreground">
              • Add lemon or cucumber for flavor variety
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaterTracker;