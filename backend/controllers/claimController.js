import { supabase } from "../config/db.js";

// @desc    Get all health claims
// @route   GET /api/claims
export const getClaims = async (req, res) => {
  try {
    let { data, error } = await supabase.from("claims").select("*");

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching claims", error: error.message });
  }
};

// @desc    Add a new health claim
// @route   POST /api/claims
export const addClaim = async (req, res) => {
  try {
    const { influencer_id, claim_text, category, status } = req.body;

    let { data, error } = await supabase.from("claims").insert([
      { influencer_id, claim_text, category, status }
    ]);

    if (error) throw error;
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error adding claim", error: error.message });
  }
};

// @desc    Verify or update claim status
// @route   PATCH /api/claims/:id
export const verifyClaim = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // "verified", "debunked", etc.

    let { data, error } = await supabase.from("claims").update({ status }).eq("id", id);

    if (error) throw error;
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error updating claim", error: error.message });
  }
};
