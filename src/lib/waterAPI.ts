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

// Insert water for current user
const addWaterToDb = async (water) => {
  const uid = await getCurrentUserId();
  if (!uid) {
    console.error("❌ No logged-in user found. Cannot add entry.");
    return null;
  }

  const { data, error } = await supabase
    .from("water_intake")
    .insert([
      {
        ...water,
        user_id: uid, // ✅ attach user automatically
      },
    ])
    .select(); // ✅ ADD THIS to return the inserted data with id

  if (error) {
    console.error("Error inserting water count:", error);
    return null;
  }
  return data;
};

const fetchWaterFromDb = async () => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const { data, error } = await supabase
    .from("water_intake")
    .select("*")
    .eq("user_id", uid)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching Water Count:", error);
    return [];
  }
  return data;
};

// update water count if entry exists for today for remove or add 
const updateWaterInDb = async (waterId, updatedWater) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("water_intake")
    .update(updatedWater)
    .eq("id", waterId)
    .eq("user_id", uid)
    .select(); // ✅ ADD THIS if you want to return updated data

  if (error) {
    console.error("Error updating Water Count:", error);
    return null;
  }
  return data;
};

export { addWaterToDb, fetchWaterFromDb, updateWaterInDb };