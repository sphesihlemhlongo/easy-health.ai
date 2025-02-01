import { supabase } from "../config/db.js";

// @desc    Get all influencers
// @route   GET /api/influencers
export const getInfluencers = async (req, res) => {
  try {
    let { data, error } = await supabase.from("influencers").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching influencers", error: error.message });
  }
};

// @desc    Add a new influencer
// @route   POST /api/influencers
export const addInfluencer = async (req, res) => {
  try {
    const { name, platform, healthClaims, category } = req.body;

    let { data, error } = await supabase.from("influencers").insert([
      { name, platform, healthClaims, category }
    ]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error adding influencer", error: error.message });
  }
};
