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

// Insert Entry for current user
const addEntryToDb = async (entry) => {
  const uid = await getCurrentUserId();
  if (!uid) {
    console.error("❌ No logged-in user found. Cannot add entry.");
    return null;
  }

  const { data, error } = await supabase
    .from("journal_entries")
    .insert([
      {
        ...entry,
        user_id: uid, // ✅ attach user automatically
      },
    ]);

  if (error) {
    console.error("Error inserting entry:", error);
    return null;
  }
  return data;
};

// Delete entry by id (scoped to current user)
const deleteEntryFromDb = async (entryId) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", uid); // ✅ ensures user can only delete their meals

  if (error) {
    console.error("Error deleting entry:", error);
    return null;
  }
  return data;
};

// Read all journal entries for current user
const fetchEntriesFromDb = async () => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", uid)
    .order("time", { ascending: false });

  if (error) {
    console.error("Error fetching Journal Entries:", error);
    return [];
  }
  return data;
};

// Update meal (only if it belongs to current user)
const updateEntryInDb = async (entryId, updatedEntry) => {
  const uid = await getCurrentUserId();
  if (!uid) return null;

  const { data, error } = await supabase
    .from("journal_entries")
    .update(updatedEntry)
    .eq("id", entryId)
    .eq("user_id", uid);

  if (error) {
    console.error("Error updating entry:", error);
    return null;
  }
  return data;
};

// Fetch journal entries for a specific date
const fetchEntriesByDate = async (date) => {
  const uid = await getCurrentUserId();
  if (!uid) return [];

  const startOfDay = `${date}T00:00:00Z`;
  const endOfDay = `${date}T23:59:59Z`;

  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", uid)
    .gte("time", startOfDay)
    .lt("time", endOfDay);

  if (error) {
    console.error("Error fetching Journal Entries by date:", error);
    return [];
  }
  return data;
};

// fetjch journal entries for current date
const fetchEntriesByCurrentDate = async () => {
  const today = new Date().toISOString().split("T")[0];
  return await fetchEntriesByDate(today);
};

export { addEntryToDb, deleteEntryFromDb, fetchEntriesFromDb, updateEntryInDb, fetchEntriesByDate, fetchEntriesByCurrentDate };
