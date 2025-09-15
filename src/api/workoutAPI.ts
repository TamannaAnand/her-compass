import supabase from "@/api/supabaseClient";

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

// Insert workout for current user
const addWorkoutToDb = async (workout) => {
  const uid = await getCurrentUserId();
  if (!uid) {
    console.error("❌ No logged-in user found. Cannot add entry.");
    return null;
  }

  const { data, error } = await supabase
    .from("workout_tracker")
    .insert([
      {
        ...workout,
        user_id: uid, // ✅ attach user automatically
      },
    ]);

  if (error) {
    console.error("Error inserting workout:", error);
    return null;
  }
  return data;
};

// Delete workout by id (scoped to current user)
const deleteWorkoutFromDb = async (workoutId) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("workout_tracker")
    .delete()
    .eq("id", workoutId)
    .eq("user_id", uid); // ✅ ensures user can only delete their meals

  if (error) {
    console.error("Error deleting workout:", error);
    return null;
  }
  return data;
};

// Read all journal entries for current user
const fetchWorkoutsFromDb = async () => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const { data, error } = await supabase
    .from("workout_tracker")
    .select("*")
    .eq("user_id", uid)
    .order("time", { ascending: false });

  if (error) {
    console.error("Error fetching Workouts:", error);
    return [];
  }
  return data;
};

// Update meal (only if it belongs to current user)
const updateWorkoutInDb = async (workoutId, updatedWorkout) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("workout_tracker")
    .update(updatedWorkout)
    .eq("id", workoutId)
    .eq("user_id", uid);

  if (error) {
    console.error("Error updating workout:", error);
    return null;
  }
  return data;
};

export { addWorkoutToDb, deleteWorkoutFromDb, fetchWorkoutsFromDb, updateWorkoutInDb };
