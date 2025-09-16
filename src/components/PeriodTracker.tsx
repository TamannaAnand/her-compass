import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Heart,
  Moon,
  Sun,
  Waves,
  Plus,
  RotateCw,
  Clock,
} from "lucide-react";
import { useTheme } from "@/theme/useTheme";
import { addPeriodToDb, calculateCurrentDay, fetchLatestPeriodEntry } from "@/api/periodAPI";
import { useToast } from "@/hooks/use-toast";


const PeriodTracker = () => {
  const defaultFormData = {
    lastPeriodDate: "",
    cycleLength: 28,
    periodDuration: 5,
    notes: "",
    previousCycles: [],
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [currentDay, setCurrentDay] = useState(new Date().getDate());
  const [showCycleCard, setShowCycleCard] = useState(false);
  const { toast } = useToast();

  const phases = [
    {
      name: "Menstrual",
      icon: Moon,
      days: "1-5",
      description: "Your period. Rest and be gentle with yourself.",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
    },
    {
      name: "Follicular",
      icon: Sun,
      days: "6-13",
      description: "Energy is building. Great time to start new projects.",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      name: "Ovulation",
      icon: Heart,
      days: "14-16",
      description: "Peak energy and fertility. You might feel most social.",
      color: "text-pink-600",
      bgColor: "bg-pink-50",
    },
    {
      name: "Luteal",
      icon: Waves,
      days: "17-28",
      description: "Energy may dip. Focus on self-care and completion.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];



  const getCurrentPhase = (day) => {
    if (day >= 1 && day <= 5) return "menstrual";
    if (day >= 6 && day <= 13) return "follicular";
    if (day >= 14 && day <= 16) return "ovulation";
    return "luteal";
  };

  const handleCalculate = () => {
    if (formData.lastPeriodDate) {
      const calculatedDay = calculateCurrentDay(formData.lastPeriodDate, formData.cycleLength);
      setCurrentDay(calculatedDay);
      setShowCycleCard(true);
    }
  };

  const handleAddPeriodData = async () => {
    const latestEntry = await fetchLatestPeriodEntry();

    // Check if the formData values differ from the most recent entry
    if (
      latestEntry &&
      latestEntry.cycle_start_date === formData.lastPeriodDate &&
      latestEntry.cycle_length === formData.cycleLength &&
      latestEntry.cycle_duration === formData.periodDuration
    ) {
      toast({ title: "No Changes", description: "Your cycle data is already up to date." });
      return;
    }

    const now = new Date();
    const period = {
      cycle_phase: getCurrentPhase(currentDay),
      cycle_start_date: formData.lastPeriodDate,
      cycle_length: formData.cycleLength,
      cycle_duration: formData.periodDuration,
      date: now.toISOString().split("T")[0],
    };
    await addPeriodToDb(period);
    toast({ title: "Success!", description: "Your cycle data was saved." });
  }

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const fetchLatestEntry = async () => {
      const latestEntry = await fetchLatestPeriodEntry();
      if (latestEntry) {
        setFormData({
          lastPeriodDate: latestEntry.cycle_start_date,
          cycleLength: latestEntry.cycle_length,
          periodDuration: latestEntry.cycle_duration,
          notes: latestEntry.notes || "",
          previousCycles: [],
        });
        const calculatedDay = calculateCurrentDay(latestEntry.cycle_start_date, latestEntry.cycle_length);
        setCurrentDay(calculatedDay);
        setShowCycleCard(true);
      }
    };

    fetchLatestEntry();
  }, []);

  const phase = getCurrentPhase(currentDay);
  const currentPhaseData = phases.find((p) => p.name.toLowerCase() === phase);

  // UI Render
  const theme = useTheme();
  return (
    <div className={theme.mainContainer}>
      <div className={theme.innerContainer}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Period Tracker</h1>
          <p className={`${theme.sectionSubHeader} pb-3`}>
            Track your menstrual cycle and phases
          </p>
          {/* Input Card */}
          <Card className={`${theme.cardBase} ${theme.cardAccent}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                Personalize Your Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastPeriodDate"
                  className="text-sm font-medium text-muted-foreground flex items-center gap-2 my-1"
                >
                  <Calendar className="h-4 w-4 text-primary" />
                  Last Period Start Date
                </label>
                <Input
                  id="lastPeriodDate"
                  type="date"
                  value={formData.lastPeriodDate}
                  onChange={(e) =>
                    updateFormData({ lastPeriodDate: e.target.value })
                  }
                  className={theme.inputBase}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastPeriodDate"
                  className="text-sm font-medium text-muted-foreground flex items-center gap-2 my-1"
                >
                  <RotateCw className="h-4 w-4 text-primary" />
                  Cycle Details
                </label>
                <Input
                  type="number"
                  min={21}
                  max={35}
                  value={formData.cycleLength}
                  onChange={(e) =>
                    updateFormData({
                      cycleLength: parseInt(e.target.value) || 28,
                    })
                  }
                  className={theme.inputBase}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="periodDuration"
                  className="text-sm font-medium text-muted-foreground flex items-center gap-2 my-1"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  Period Duration
                </label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={formData.periodDuration}
                  onChange={(e) =>
                    updateFormData({
                      periodDuration: parseInt(e.target.value) || 5,
                    })
                  }
                  className={theme.inputBase}
                />
              </div>
              <Button
                onClick={() => {
                  handleCalculate();
                  handleAddPeriodData();
                }}
                className={`w-full h-12 mt-4 ${theme.buttonPrimary}`}
                disabled={!formData.lastPeriodDate}
              >
                <Plus className="h-4 w-4 mr-2" />
                Update My Cycle
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Current Day & Phase */}
        {showCycleCard && (
          <Card className={`mb-8 bg-gradient-accent border-0 shadow-glow`}>
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-2">
                <p className="text-lg font-medium text-secondary-foreground">
                  Current Day
                </p>
                <p className="text-5xl font-bold text-secondary-foreground">
                  {currentDay}
                </p>
                <p className="text-sm text-secondary-foreground/80">
                  of {formData.cycleLength} day cycle
                </p>
              </div>
              {currentPhaseData && (
                <div className="mt-6">
                  <div
                    className={`flex items-center justify-center gap-2 ${currentPhaseData.color}`}
                  >
                    {currentPhaseData.icon && (
                      <currentPhaseData.icon className="h-6 w-6" />
                    )}
                    <span className="font-semibold text-lg">
                      {currentPhaseData.name} Phase
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-secondary-foreground/80">
                    {currentPhaseData.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Phases Overview */}
        <Card className={`mb-8 ${theme.cardBase} ${theme.cardSoft}`}>
          <CardHeader>
            <CardTitle className="text-lg">Cycle Phases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {phases.map((p, idx) => {
              const Icon = p.icon;
              const isActive =
                currentPhaseData && p.name === currentPhaseData.name;
              return (
                <Card
                  key={idx}
                  className={`${p.bgColor} ${
                    isActive ? "border-rose-400 border-2" : "border-none"
                  } shadow-sm`}
                >
                  <CardContent className="flex items-center gap-4 p-4">
                    <Icon className={`h-6 w-6 ${p.color}`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${p.color}`}>{p.name}</h4>
                        <span className={`text-xs ${p.color} opacity-75`}>
                          Days {p.days}
                        </span>
                      </div>
                      <p className="text-sm mt-1 text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PeriodTracker;
