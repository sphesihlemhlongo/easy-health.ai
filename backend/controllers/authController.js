import bcrypt from "bcrypt";
import { supabase } from "../config/db.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, password: hashedPassword }]);

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ message: "User registered!", data });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (!users || users.length === 0) return res.status(404).json({ error: "User not found!" });

  const isValid = await bcrypt.compare(password, users[0].password);
  if (!isValid) return res.status(401).json({ error: "Invalid credentials!" });

  res.json({ message: "Login successful!", user: users[0] });
};
