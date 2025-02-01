import { createClient } from "@supabase/supabase-js";;
import dotenv from "dotenv";
dotenv.config();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase credentials missing!");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
