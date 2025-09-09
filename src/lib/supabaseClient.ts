
//Supabase client setup

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);
const userId = supabase.auth.getUser().then(({ data: { user } }) => user?.id);

export default supabase;
export { userId };
        