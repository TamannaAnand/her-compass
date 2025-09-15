import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/theme/useTheme";
import {
  Droplets,
  Utensils,
  Dumbbell,
  RotateCw,
  BookHeart,
} from "lucide-react";
import { fetchWaterFromDb } from "@/api/waterAPI";
import { fetchMealsFromDb } from "@/api/mealAPI";
import { fetchWorkoutsFromDb } from "@/api/workoutAPI";
import { fetchEntriesFromDb } from "@/api/journalAPI";
import { fetchPeriodsFromDb, calculateCurrentDay } from "@/api/periodAPI";
import { useEffect, useState } from "react";
import { Calendar } from "./ui/calendar";
import { DayData } from "@/types/app";
import CalendarDisplay  from "./ui/CalendarDisplay";

interface QuickStats {
  waterGlasses: number;
  waterGoal: number;
  mealsLogged: number;
  workoutMinutes: number;
  cycleDay: number;
  journalEntries: number;
}

const Dashboard = ({ setActiveTab }) => {
  const theme = useTheme();
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8);
  const [mealsLogged, setMealsLogged] = useState(0);
  const [workoutMinutes, setWorkoutMinutes] = useState(0);
  const [journalEntries, setJournalEntries] = useState(0);
  const [cycleDay, setCycleDay] = useState<number | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [dayData, setDayData] = useState<DayData>({
    journal: [],
    meals: [],
    water: [],
    workouts: [],
    periods: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      // Water
      const waterData = await fetchWaterFromDb();
      if (waterData && waterData.length > 0) {
        const mostRecentEntry = waterData[0];
        setWaterGlasses(mostRecentEntry?.count || 0);
      }

      // Meals
      const mealsData = await fetchMealsFromDb();
      if (mealsData) {
        const todayMeals = mealsData.filter(
          (m) => new Date(m.time).toDateString() === new Date().toDateString()
        );
        setMealsLogged(todayMeals.length);
      }

      // Workouts
      const workoutsData = await fetchWorkoutsFromDb();
      if (workoutsData) {
        const todaysWorkouts = workoutsData.filter(
          (w) => new Date(w.time).toDateString() === new Date().toDateString()
        );
        const totalMinutes = todaysWorkouts.reduce(
          (sum, w) => sum + w.duration,
          0
        );
        setWorkoutMinutes(totalMinutes);
      }

      // Journal
      const journalData = await fetchEntriesFromDb();
      if (journalData) {
        const todayEntries = journalData.filter(
          (e) => new Date(e.time).toDateString() === new Date().toDateString()
        );
        setJournalEntries(todayEntries.length);
      }

      // Periods
      const periodsData = await fetchPeriodsFromDb();
      if (periodsData && periodsData.length > 0) {
        const mostRecentPeriod = periodsData[0];
        const day = calculateCurrentDay(
          mostRecentPeriod.cycle_start_date,
          mostRecentPeriod.cycle_length
        );
        setCycleDay(day);
      } else {
        setCycleDay(undefined);
      }

    };
    fetchStats();
  }, [selectedDate]);

  const stats: QuickStats = {
    waterGlasses,
    waterGoal,
    mealsLogged,
    workoutMinutes,
    cycleDay: cycleDay ?? 0,
    journalEntries,
  };

  // Cards for quick stats tracking
  const trackingCards = [
    {
      id: "water",
      title: "Water Intake",
      icon: Droplets,
      value: `${stats.waterGlasses}/${stats.waterGoal}`,
      subtitle: "glasses today",
      color: "text-secondary-foreground",
      bgGradient: "bg-gradient-accent",
    },
    {
      id: "meals",
      title: "Meals",
      icon: Utensils,
      value: stats.mealsLogged.toString(),
      subtitle: "logged today",
      color: "text-accent-foreground",
      bgGradient: "bg-gradient-soft",
    },
    {
      id: "workout",
      title: "Workout",
      icon: Dumbbell,
      value: stats.workoutMinutes.toString(),
      subtitle: "minutes today",
      color: "text-primary-foreground",
      bgGradient: "bg-gradient-primary",
    },
    {
      id: "cycle",
      title: "Menstrual Cycle",
      icon: RotateCw,
      value: stats.cycleDay ? `Day ${stats.cycleDay}` : "N/A",
      subtitle: "of cycle",
      color: "text-secondary-foreground",
      bgGradient: "bg-gradient-accent",
    },
  ];

  const handleJournalClick = () => {
    setActiveTab("journal");
  };

  const handleAddWater = () => {
    setActiveTab("water");
  };

  return (
    <div className={theme.mainContainer}>
      <div className={theme.dashboardInnerContainer}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Welcome!</h1>
          <p className={theme.sectionSubHeader}>
            Let's track your wellness journey
          </p>
          {/* Quick Add Actions */}
          <div className="grid grid-cols-2 gap-3 mb-8 mt-8">
            <Button
              className={`h-16 ${theme.buttonPrimary}`}
              onClick={handleAddWater}
            >
              <div className="flex flex-col items-center gap-1">
                <Droplets className="h-5 w-5" />
                <span className="text-sm">Add Water</span>
              </div>
            </Button>
            <Button
              variant="secondary"
              className={`h-16 ${theme.buttonOutline}`}
              onClick={handleJournalClick}
            >
              <div className="flex flex-col items-center gap-1">
                <BookHeart className="h-5 w-5" />
                <span className="text-sm">Journal</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Tracking Cards - Responsive Layout */}
        <div className={theme.dashboardLayout} aria-label="Quick Stats">
          {trackingCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className={`${theme.dashboardCard} ${card.bgGradient} border-0 shadow-soft overflow-hidden relative`}
                aria-label={card.title}
              >
                <CardContent className={theme.cardContentBase}>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p
                        className={`text-sm font-medium ${card.color} opacity-90`}
                      >
                        {card.title}
                      </p>
                      <p className={`text-2xl font-bold ${card.color}`}>
                        {card.value}
                      </p>
                      <p className={`text-sm ${card.color} opacity-75`}>
                        {card.subtitle}
                      </p>
                    </div>
                    <div className={`${card.color} opacity-60`}>
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Calendar Section */}
        <div>
          <Calendar
            selected={selectedDate}
            onSelect={setSelectedDate}
            mode="single"
          />
          <CalendarDisplay />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
