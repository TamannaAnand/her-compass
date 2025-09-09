import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Utensils,
  Plus,
  Coffee,
  Sun,
  Moon,
  Apple,
  TrashIcon,
  PencilIcon,
} from "lucide-react";
import {
  addMealToDb,
  deleteMealFromDb,
  updateMealInDb,
  fetchMealsFromDb,
} from "@/lib/mealAPI";
import { useEffect } from "react";


interface Meal {
  id: string;
  name: string;
  type: "breakfast" | "lunch" | "dinner" | "snack";
  time: string;
}

const MealTracker = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [newMeal, setNewMeal] = useState("");
  const [selectedType, setSelectedType] = useState<Meal["type"]>("breakfast");

  const mealTypes = [
    { type: "breakfast" as const, icon: Coffee, label: "Breakfast" },
    { type: "lunch" as const, icon: Sun, label: "Lunch" },
    { type: "dinner" as const, icon: Moon, label: "Dinner" },
    { type: "snack" as const, icon: Apple, label: "Snack" },
  ];

  // Fetch meals from DB on mount
  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetchMealsFromDb(); // 👈 no need to pass userId
      if (data) setMeals(data);
    };
    fetchMeals();
  }, []);

  const handleAddMeal = async () => {
    if (newMeal.trim()) {
      const now = new Date();
      const meal = {
        name: newMeal.trim(),
        type: selectedType,
        time: now.toISOString(),
      };
      await addMealToDb(meal);
      const data = await fetchMealsFromDb();
      if (data) setMeals(data);
      setNewMeal("");
    }
  };

  const getMealsByType = (type: Meal["type"]) => {
    return meals.filter((meal) => meal.type === type);
  };

  return (
    <div className="min-h-screen bg-gradient-soft p-4 pb-20">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Meals</h1>
          <p className="text-muted-foreground">Track your nutrition journey</p>
        </div>

        {/* Add Meal Form */}
        <Card className="mb-8 bg-card shadow-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Plus className="h-5 w-5 text-primary" />
              Log a Meal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Meal Type Selection */}
            <div className="grid grid-cols-4 gap-2">
              {mealTypes.map(({ type, icon: Icon, label }) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  className="h-16 flex flex-col gap-1"
                  onClick={() => setSelectedType(type)}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-xs">{label}</span>
                </Button>
              ))}
            </div>

            {/* Meal Input */}
            <div className="space-y-3">
              <Input
                placeholder="What did you eat?"
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
                className="h-12"
              />
              <Button onClick={handleAddMeal} className="w-full h-12">
                <Plus className="h-4 w-4 mr-2" />
                Add Meal
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Today's Meals */}
        <div className="space-y-6">
          {mealTypes.map(({ type, icon: Icon, label }) => {
            const typeMeals = getMealsByType(type);

            return (
              <div key={type}>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  {label}
                </h3>

                {typeMeals.length > 0 ? (
                  <div className="space-y-2">
                    {typeMeals.map((meal) => (
                      <Card key={meal.id} className="bg-card shadow-soft">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-center">
                            <p className="font-medium text-foreground">
                              {meal.name}
                            </p>

                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">
                                {new Date(meal.time).toLocaleDateString()}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  deleteMealFromDb(meal.id).then(async () => {
                                    const data = await fetchMealsFromDb();
                                    if (data) setMeals(data);
                                  })
                                }
                              >
                                <TrashIcon className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const updatedName = prompt(
                                    "Update meal name",
                                    meal.name
                                  );
                                  if (updatedName) {
                                    updateMealInDb(meal.id, {
                                      name: updatedName,
                                    }).then(async () => {
                                      const data = await fetchMealsFromDb();
                                      if (data) setMeals(data);
                                    });
                                  }
                                }}
                              >
                                <PencilIcon className="h-4 w-4 text-muted-foreground hover:text-primary" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="bg-muted/30 border-dashed">
                    <CardContent className="p-6 text-center">
                      <Utensils className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                      <p className="text-muted-foreground text-sm">
                        No {label.toLowerCase()} logged yet
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MealTracker;
