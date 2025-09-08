import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dumbbell, Plus, Play, Pause, RotateCcw, Timer } from "lucide-react";

interface Workout {
  id: string;
  name: string;
  duration: number;
  type: string;
  date: string;
}

const WorkoutTracker = () => {
  const [workouts, setWorkouts] = useState<Workout[]>([
  ]);

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [workoutName, setWorkoutName] = useState("");
  const [workoutType, setWorkoutType] = useState("Cardio");

  const workoutTypes = ["Cardio", "Strength", "Flexibility", "HIIT", "Yoga", "Pilates"];

  const startTimer = () => {
    setIsTimerActive(true);
    // Timer logic would be implemented with setInterval
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerMinutes(0);
    setTimerSeconds(0);
  };

  const finishWorkout = () => {
    if (workoutName.trim() && (timerMinutes > 0 || timerSeconds > 0)) {
      const totalMinutes = timerMinutes + (timerSeconds > 0 ? 1 : 0);
      const newWorkout: Workout = {
        id: Date.now().toString(),
        name: workoutName.trim(),
        duration: totalMinutes,
        type: workoutType,
        date: "Today"
      };
      
      setWorkouts([newWorkout, ...workouts]);
      setWorkoutName("");
      resetTimer();
    }
  };

  const todaysWorkouts = workouts.filter(w => w.date === "Today");
  const totalMinutes = todaysWorkouts.reduce((sum, w) => sum + w.duration, 0);

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Workouts</h1>
          <p className="text-muted-foreground">Track your fitness journey</p>
        </div>

        {/* Today's Summary */}
        <Card className="mb-8 bg-gradient-primary border-0 shadow-glow">
          <CardContent className="p-6 text-center">
            <div className="space-y-2">
              <Dumbbell className="h-12 w-12 text-primary-foreground mx-auto opacity-80" />
              <p className="text-sm text-primary-foreground opacity-90">Today's Total</p>
              <p className="text-3xl font-bold text-primary-foreground">{totalMinutes}</p>
              <p className="text-sm text-primary-foreground opacity-75">minutes active</p>
            </div>
          </CardContent>
        </Card>

        {/* Workout Timer */}
        <Card className="mb-8 bg-card shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Timer className="h-5 w-5 text-primary" />
              Workout Timer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Timer Display */}
            <div className="text-center bg-muted/30 rounded-lg p-6">
              <div className="text-4xl font-mono font-bold text-foreground">
                {String(timerMinutes).padStart(2, '0')}:{String(timerSeconds).padStart(2, '0')}
              </div>
              <p className="text-sm text-muted-foreground mt-1">minutes:seconds</p>
            </div>

            {/* Timer Controls */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={resetTimer}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant={isTimerActive ? "secondary" : "default"}
                size="sm"
                className="flex-1"
                onClick={isTimerActive ? pauseTimer : startTimer}
              >
                {isTimerActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>

            {/* Workout Details */}
            <div className="space-y-3 pt-4 border-t">
              <Input
                placeholder="Workout name"
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
              
              {/* Workout Type */}
              <div className="grid grid-cols-3 gap-2">
                {workoutTypes.map((type) => (
                  <Button
                    key={type}
                    variant={workoutType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => setWorkoutType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>

              <Button 
                onClick={finishWorkout}
                className="w-full"
                disabled={!workoutName.trim() || (timerMinutes === 0 && timerSeconds === 0)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Finish Workout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Workouts */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Workouts</h3>
          {workouts.map((workout) => (
            <Card key={workout.id} className="bg-card shadow-soft">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-foreground">{workout.name}</h4>
                    <p className="text-sm text-muted-foreground">{workout.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{workout.duration}min</p>
                    <p className="text-xs text-muted-foreground">{workout.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkoutTracker;