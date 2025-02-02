import { supabase } from "./config/db.js";

async function testConnection() {
  const { data, error } = await supabase.from("influencers").select("*");

  if (error) {
    console.error("Database connection error:", error);
  } else {
    console.log("Database is connected. Data:", data);
  }
}

testConnection();
