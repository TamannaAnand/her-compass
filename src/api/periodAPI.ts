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

// add period data for current user
const addPeriodToDb = async (period) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("cycle_tracker")
    .insert([{ user_id: uid, ...period }]);

  if (error) {
    console.error("Error adding period:", error);
    return null;
  }

  return data;
};

//fetch period data for current user
const fetchPeriodsFromDb = async () => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const { data, error } = await supabase
    .from("cycle_tracker")
    .select("*")
    .eq("user_id", uid);

  if (error) {
    console.error("Error fetching periods:", error);
    return [];
  }

  return data;
};

// Utility to calculate current day in cycle
// Accepts lastPeriodDate (string) and cycleLength (number)
const calculateCurrentDay = (lastPeriodDate: string, cycleLength: number): number => {
  if (!lastPeriodDate) return 1;
  const startDate = new Date(lastPeriodDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const dayInCycle = ((diffDays - 1) % cycleLength) + 1;
  return dayInCycle;
};

export { addPeriodToDb, fetchPeriodsFromDb, calculateCurrentDay };