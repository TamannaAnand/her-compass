import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Utensils,
  Dumbbell,
  Calendar,
  BookHeart,
  Plus,
} from "lucide-react";
import { fetchWaterFromDb } from "@/api/waterAPI";
import { fetchMealsFromDb } from "@/api/mealAPI";
import { fetchWorkoutsFromDb } from "@/api/workoutAPI";
import { fetchEntriesFromDb } from "@/api/journalAPI";
import { useEffect, useState } from "react";

interface QuickStats {
  waterGlasses: number;
  waterGoal: number;
  mealsLogged: number;
  workoutMinutes: number;
  cycleDay: number;
  journalEntries: number;
}

const Dashboard = ({ setActiveTab }) => {
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [waterGoal, setWaterGoal] = useState(8);
  const [mealsLogged, setMealsLogged] = useState(0);
  const [workoutMinutes, setWorkoutMinutes] = useState(0);
  const [journalEntries, setJournalEntries] = useState(0);

  useEffect(() => {
  const fetchStats = async () => {
    // Water
    const waterData = await fetchWaterFromDb();
      if (waterData && waterData.length > 0) {
        const mostRecentEntry = waterData[0]; // Get most recent entry
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
      const totalMinutes = todaysWorkouts.reduce((sum, w) => sum + w.duration, 0);
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
  };

  fetchStats();
}, []);


  const stats: QuickStats = {
    waterGlasses,
    waterGoal,
    mealsLogged,
    workoutMinutes,
    cycleDay: 0,
    journalEntries,
  };

  const trackingCards = [
    {
      title: "Water Intake",
      icon: Droplets,
      value: `${stats.waterGlasses}/${stats.waterGoal}`,
      subtitle: "glasses today",
      color: "text-secondary-foreground",
      bgGradient: "bg-gradient-accent",
    },
    {
      title: "Meals",
      icon: Utensils,
      value: stats.mealsLogged.toString(),
      subtitle: "logged today",
      color: "text-accent-foreground",
      bgGradient: "bg-gradient-soft",
    },
    {
      title: "Workout",
      icon: Dumbbell,
      value: stats.workoutMinutes.toString(),
      subtitle: "minutes today",
      color: "text-primary-foreground",
      bgGradient: "bg-gradient-primary",
    },
     {
      title: "Journal",
      icon: BookHeart,
      value: stats.journalEntries.toString(),
      subtitle: "entries today",
      color: "text-accent-foreground",
      bgGradient: "bg-gradient-soft",
    },
    {
      title: "Cycle",
      icon: Calendar,
      value: `Day ${stats.cycleDay}`,
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
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Good morning!
          </h1>
          <p className="text-muted-foreground">
            Let's track your wellness journey
          </p>
        </div>

        {/* Quick Add Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button
            className="h-16 bg-primary hover:bg-primary/90 shadow-soft"
            onClick={handleAddWater}
          >
            <div className="flex flex-col items-center gap-1">
              <Droplets className="h-5 w-5" />
              <span className="text-sm">Add Water</span>
            </div>
          </Button>
          <Button
            variant="secondary"
            className="h-16 shadow-soft"
            onClick={handleJournalClick}
          >
            <div className="flex flex-col items-center gap-1">
              <BookHeart className="h-5 w-5" />
              <span className="text-sm">Journal</span>
            </div>
          </Button>
        </div>

        {/* Tracking Cards */}
        <div className="space-y-4">
          {trackingCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className={`${card.bgGradient} border-0 shadow-soft overflow-hidden relative`}
              >
                <CardContent className="p-6">
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
                      <Icon className="h-8 w-8" />
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

export default Dashboard;
