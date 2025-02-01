import express from "express";
import { supabase } from "../config/db.js";

const router = express.Router();

// Register User and Create Profile
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  // Create User in Supabase Auth
  const { data: user, error: authError } = await supabase.auth.signUp({ email, password });

  if (authError) return res.status(400).json({ error: authError.message });

  // Insert User Profile into "profiles" table
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .insert([{ id: user.user.id, email, name }]);

  if (profileError) return res.status(400).json({ error: profileError.message });

  res.json({ message: "User registered successfully!", user, profile });
});

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: "Login successful!", data });
});

// Fetch User Profile
router.get("/profile", async (req, res) => {
  const { user } = await supabase.auth.getUser();
  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const { data: profile, error } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  if (error) return res.status(400).json({ error: error.message });

  res.json({ profile });
});

export default router;