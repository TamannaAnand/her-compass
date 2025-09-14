import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Plus, Play, Pause, RotateCcw, Timer, TrashIcon, PencilIcon } from "lucide-react";
import { addWorkoutToDb, deleteWorkoutFromDb, fetchWorkoutsFromDb, updateWorkoutInDb } from "@/api/workoutAPI";
import { useTheme } from "@/theme/useTheme";

interface Workout {
  id: string;
  name: string;
  duration: number;
  type: string;
  time: string;
}

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("Cardio");

  // Workout types for selection
  const workoutTypes = ["Cardio", "Strength", "Flexibility", "HIIT", "Yoga", "Pilates"];

  // -------------------- Timer Logic --------------------
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev + 1 === 60) {
            setTimerMinutes((m) => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  // -------------------- DB Logic --------------------
  const fetchWorkouts = async () => {
    const data = await fetchWorkoutsFromDb();
    if (data) setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleAddWorkout = async () => {
    if (!workoutName.trim() || (timerMinutes === 0 && timerSeconds === 0)) return;

    const totalMinutes = timerMinutes + (timerSeconds > 0 ? 1 : 0);
    const newWorkout = {
      name: workoutName.trim(),
      duration: totalMinutes,
      type: workoutType,
      time: new Date().toISOString(),
    };

    await addWorkoutToDb(newWorkout);
    await fetchWorkouts();

    setWorkoutName("");
    resetTimer();
  };

  const handleDeleteWorkout = async (workoutId: string) => {
    await deleteWorkoutFromDb(workoutId);
    await fetchWorkouts();
  };

  // const handleUpdateWorkout = async (workoutId: string, updatedWorkout: Partial<Workout>) => {
  //   // This function can be implemented to update a workout if needed
  //   await updateWorkoutInDb(workoutId, updatedWorkout);
  //   await fetchWorkouts();
  // }

  const todaysWorkouts = workouts.filter(
    (w) => new Date(w.time).toDateString() === new Date().toDateString()
  );
  const totalMinutes = todaysWorkouts.reduce((sum, w) => sum + w.duration, 0);

  // ...existing code...
  const theme = useTheme();
  return (
    <div className={theme.mainContainer}>
      <div className={theme.innerContainer}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Workouts</h1>
          <p className={`${theme.sectionSubHeader} pb-3`}>Track your fitness journey</p>
        
        {/* Today's Summary */}
        <Card className={`mb-8 bg-gradient-primary border-0 shadow-glow`}>
          <CardContent className={theme.cardContentBase + " text-center"}>
            <Dumbbell className="h-12 w-12 text-primary-foreground mx-auto opacity-80" aria-hidden="true" />
            <p className="text-sm text-primary-foreground opacity-90">Today's Total</p>
            <p className="text-3xl font-bold text-primary-foreground">{totalMinutes}</p>
            <p className="text-sm text-primary-foreground opacity-75">minutes active</p>
          </CardContent>
        </Card>
        </div>

        {/* Workout Timer */}
        <Card className={`mb-8 ${theme.cardBase} ${theme.cardAccent}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Timer className="h-5 w-5 text-primary" aria-hidden="true" />
              Workout Timer
            </CardTitle>
          </CardHeader>
          <CardContent className={theme.cardContentBase + " space-y-4"}>
            <div className="text-center bg-muted/30 rounded-lg p-6">
              <div className="text-4xl font-mono font-bold text-foreground" aria-label="Timer">
                {String(timerMinutes).padStart(2, "0")}:{String(timerSeconds).padStart(2, "0")}
              </div>
              <p className="text-sm text-muted-foreground mt-1">minutes:seconds</p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={resetTimer} aria-label="Reset Timer">
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button
                variant={isTimerActive ? "secondary" : "default"}
                size="sm"
                className="flex-1"
                onClick={() => setIsTimerActive(!isTimerActive)}
                aria-label={isTimerActive ? "Pause Timer" : "Start Timer"}
              >
                {isTimerActive ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
              </Button>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <Input
                placeholder="Workout name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
                aria-label="Workout name"
              />

              <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Workout Type">
                {workoutTypes.map((type) => (
                  <Button
                    key={type}
                    variant={workoutType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWorkoutType(type)}
                    aria-pressed={workoutType === type}
                    aria-label={type}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              <Button
                onClick={handleAddWorkout}
                className={`w-full ${theme.buttonPrimary}`}
                disabled={!workoutName.trim() || (timerMinutes === 0 && timerSeconds === 0)}
                aria-label="Finish Workout"
              >
                <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
                Finish Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <div className="space-y-4 flex-1">
          <h3 className="text-lg font-semibold text-foreground">Recent Workouts</h3>
          {workouts.map((workout) => (
            <Card key={workout.id} className={`${theme.cardBase} ${theme.cardSoft}`}>
              <CardContent className={theme.cardContentBase + " flex justify-between items-start"}>
                <div>
                  <h4 className="font-medium text-foreground">{workout.name}</h4>
                  <p className="text-sm text-muted-foreground">{workout.type}</p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="font-semibold text-primary">{workout.duration} min</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(workout.time).toLocaleDateString()}
                  </p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteWorkout(workout.id)}
                    aria-label={`Delete ${workout.name}`}
                  >
                    <TrashIcon className="h-4 w-4 text-muted-foreground hover:text-destructive" aria-hidden="true" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
  // ...existing code...
};

export default WorkoutTracker;
