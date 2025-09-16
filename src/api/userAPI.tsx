import supabase from "@/api/supabaseClient";

const getUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error("Error getting user:", error);
    return null;
  }
  return user || null;
}

export { getUserData };