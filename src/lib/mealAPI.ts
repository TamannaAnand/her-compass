// src/lib/mealsAPI.ts
import supabase from "@/lib/supabaseClient";

// 🔧 Utility to get current logged-in user's ID
const getCurrentUserId = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return user?.id || null;
};

// -------------------- CRUD FUNCTIONS -------------------- //

// Insert meal for current user
const addMealToDb = async (meal) => {
  const uid = await getCurrentUserId();
  if (!uid) {
    console.error("❌ No logged-in user found. Cannot add meal.");
    return null;
  }

  const { data, error } = await supabase
    .from("meal_tracker")
    .insert([
      {
        ...meal,
        user_id: uid, // ✅ attach user automatically
      },
    ]);

  if (error) {
    console.error("Error inserting meal:", error);
    return null;
  }
  return data;
};

// Delete meal by id (scoped to current user)
const deleteMealFromDb = async (mealId) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("meal_tracker")
    .delete()
    .eq("id", mealId)
    .eq("user_id", uid); // ✅ ensures user can only delete their meals

  if (error) {
    console.error("Error deleting meal:", error);
    return null;
  }
  return data;
};

// Read all meals for current user
const fetchMealsFromDb = async () => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const { data, error } = await supabase
    .from("meal_tracker")
    .select("*")
    .eq("user_id", uid)
    .order("time", { ascending: false });

  if (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
  return data;
};

// Update meal (only if it belongs to current user)
const updateMealInDb = async (mealId, updatedMeal) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("meal_tracker")
    .update(updatedMeal)
    .eq("id", mealId)
    .eq("user_id", uid);

  if (error) {
    console.error("Error updating meal:", error);
    return null;
  }
  return data;
};

export { addMealToDb, deleteMealFromDb, fetchMealsFromDb, updateMealInDb };
