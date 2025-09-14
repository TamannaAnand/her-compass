import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Plus, Minus, Save } from "lucide-react";
import {
  fetchWaterFromDb,
  addWaterToDb,
  updateWaterInDb,
} from "@/api/waterAPI";
import { useTheme } from "@/theme/useTheme";

const WaterTracker = () => {
  const theme = useTheme();
  const dailyGoal = 8;
  const [waterCount, setWaterCount] = useState(0);
  const [waterEntryId, setWaterEntryId] = useState(null); // track most recent DB row
  const percentage = Math.min((waterCount / dailyGoal) * 100, 100);

  // Fetch most recent water entry on mount
  useEffect(() => {
    const loadWater = async () => {
      const data = await fetchWaterFromDb();
      const mostRecentEntry = data[0];
      if (mostRecentEntry) {
        setWaterCount(mostRecentEntry.count);
        setWaterEntryId(mostRecentEntry.id);
      }
    };
    loadWater();
  }, []);

  const handleAddGlass = () => {
    if (waterCount < dailyGoal + 4) {
      setWaterCount((prev) => prev + 1);
    }
  };

  const handleRemoveGlass = () => {
    if (waterCount > 0) {
      setWaterCount((prev) => prev - 1);
    }
  };

  const handleSave = async () => {
    if (waterEntryId) {
      await updateWaterInDb(waterEntryId, { count: waterCount });
    } else {
      const newEntry = await addWaterToDb({
        date: new Date().toISOString(),
        count: waterCount,
      });
      if (newEntry && newEntry[0]?.id) setWaterEntryId(newEntry[0].id);
    }
  };

  return (
    <div className={`${theme.mainContainer}`}>
      <div className={`${theme.innerContainer}`}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Water Intake</h1>
          <p className={`${theme.sectionSubHeader} pb-3`}>
            Stay hydrated throughout the day
          </p>
          {/* Water Counter */}
          <Card className={`mb-8 bg-gradient-accent border-0 shadow-glow`}>
            <CardContent className={theme.cardContentBase + " text-center"}>
              <div className="flex items-center justify-center mb-6">
                <Droplets
                  className="h-16 w-16 text-secondary-foreground opacity-80"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <span
                    className="text-4xl font-bold text-secondary-foreground"
                    aria-label="Glasses of water"
                  >
                    {waterCount}
                  </span>
                  <span className="text-xl text-secondary-foreground/70 ml-2">
                    / {dailyGoal}
                  </span>
                </div>
                <p className="text-secondary-foreground/80">glasses today</p>
                {/* Progress bar */}
                <div className={theme.progressBar} aria-label="Progress bar">
                  <div
                    className={theme.progressFill}
                    style={{ width: `${percentage}%` }}
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    role="progressbar"
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
              onClick={handleRemoveGlass}
              variant="outline"
              size="lg"
              className={theme.buttonOutline + " h-16"}
              disabled={waterCount === 0}
              aria-label="Remove glass"
            >
              <Minus className="h-6 w-6 mr-2" aria-hidden="true" />
              Remove
            </Button>
            <Button
              onClick={handleAddGlass}
              size="lg"
              className={theme.buttonPrimary + " h-16"}
              aria-label="Add glass"
            >
              <Plus className="h-6 w-6 mr-2" aria-hidden="true" />
              Add Glass
            </Button>
          </div>

          {/* Save Button */}
          <div className="mb-8">
            <Button
              onClick={handleSave}
              size="lg"
              className={`w-full bg-gradient-accent border-0 shadow-glow h-16 flex items-center justify-center gap-3`}
              aria-label="Save Progress"
            >
              <Save
                className="text-secondary-foreground opacity-80"
                aria-hidden="true"
              />
              <span className="text-xl font-bold text-secondary-foreground">
                Save Progress
              </span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterTracker;
