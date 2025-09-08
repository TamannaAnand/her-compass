import supabase from "@/lib/supabaseClient";
//Insert
const addMealToDb = async (meal) => {
  const { data, error } = await supabase
    .from("meal_tracker")
    .insert([meal]);
  if (error) {
    // handle error
    console.error(error);
  }
  return data;
};

//Delete
const deleteMealFromDb = async (mealId) => {
  const { data, error } = await supabase
    .from("meal_tracker")
    .delete()
    .eq("id", mealId);
    if (error) {
    // handle error
    console.error(error);
  }
    return data;
};

//Read
const fetchMealsFromDb = async (userId) => {
  const { data, error } = await supabase
    .from("meal_tracker")
    .select("*")
    .eq("user_id", userId)
    .order("time", { ascending: false });
    if (error) {
    // handle error
    console.error(error);
  }
    return data;
};

//Update
const updateMealInDb = async (mealId, updatedMeal) => {
  const { data, error } = await supabase
    .from("meal_tracker")
    .update(updatedMeal)
    .eq("id", mealId);
    if (error) {
    // handle error
    console.error(error);
  }
    return data;
};

export { addMealToDb, deleteMealFromDb, fetchMealsFromDb, updateMealInDb };
