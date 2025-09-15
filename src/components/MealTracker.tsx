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
import { useTheme } from "@/theme/useTheme";
import {
  addMealToDb,
  deleteMealFromDb,
  updateMealInDb,
  fetchMealsFromDb,
} from "@/api/mealAPI";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

  // Meal types for selection
  const mealTypes = [
    { type: "breakfast" as const, icon: Coffee, label: "Breakfast" },
    { type: "lunch" as const, icon: Sun, label: "Lunch" },
    { type: "dinner" as const, icon: Moon, label: "Dinner" },
    { type: "snack" as const, icon: Apple, label: "Snack" },
  ];

  // Fetch meals from DB on mount
  useEffect(() => {
    const fetchMeals = async () => {
      const data = await fetchMealsFromDb();
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
      toast({ title: "Success!", description: "Your meal was added." });
    }
  };

  const getMealsByType = (type: Meal["type"]) => {
    return meals.filter((meal) => meal.type === type);
  };

  // ...existing code...
  const theme = useTheme();
  return (
    <div className={theme.mainContainer}>
      <div className={theme.innerContainer}>
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className={theme.sectionHeader}>Meals</h1>
          <p className={`${theme.sectionSubHeader} pb-3`}>
            Track your nutrition journey
          </p>
          {/* Add Meal Form */}
          <Card className={` ${theme.cardBase} ${theme.cardAccent}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Plus className="text-primary" />
                Log a Meal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Meal Type Selection */}
              <div
                className="grid grid-cols-4 gap-2 py-2"
                role="radiogroup"
                aria-label="Meal Type"
              >
                {mealTypes.map(({ type, icon: Icon, label }) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    className="h-16 flex flex-col gap-1"
                    onClick={() => setSelectedType(type)}
                    aria-pressed={selectedType === type}
                    aria-label={label}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
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
                  className={theme.inputBase}
                  aria-label="Meal name"
                />
                <Button
                  onClick={handleAddMeal}
                  className={`w-full h-12 ${theme.buttonPrimary}`}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Meal
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Meals */}
        <div className="space-y-6 flex-1">
          {mealTypes.map(({ type, icon: Icon, label }) => {
            const typeMeals = getMealsByType(type);

            return (
              <div key={type}>
                <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {label}
                </h3>

                {typeMeals.length > 0 ? (
                  <div className="space-y-2">
                    {typeMeals.map((meal) => (
                      <Card
                        key={meal.id}
                        className={`${theme.cardBase} ${theme.cardSoft}`}
                      >
                        <CardContent className={theme.cardContentBase}>
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
                                aria-label={`Delete ${meal.name}`}
                                onClick={() =>
                                  deleteMealFromDb(meal.id).then(async () => {
                                    const data = await fetchMealsFromDb();
                                    if (data) setMeals(data);
                                    toast({ title: "Success!", description: "Your meal was deleted."})
                                  })
                                }
                              >
                                <TrashIcon
                                  className="h-4 w-4 text-muted-foreground hover:text-destructive"
                                  aria-hidden="true"
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`Edit ${meal.name}`}
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
                                      toast({ title: "Success!", description: "Your meal was updated." });
                                    });
                                  }
                                }}
                              >
                                <PencilIcon
                                  className="h-4 w-4 text-muted-foreground hover:text-primary"
                                  aria-hidden="true"
                                />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className={theme.cardMuted}>
                    <CardContent
                      className={theme.cardContentBase + " text-center"}
                    >
                      <Utensils
                        className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50"
                        aria-hidden="true"
                      />
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
  // ...existing code...
};

export default MealTracker;
