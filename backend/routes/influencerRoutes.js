import express from "express";
import { supabase } from "../config/db.js";

const router = express.Router();

// Fetch all influencers
router.get("/", async (req, res) => {
    try {
      const { data: influencers, error } = await supabase.from("influencers").select("*");
  
      if (error) {
        console.error("Supabase Error:", error);
        return res.status(500).json({ error: "Database error" });
      }
  
      console.log("Influencers fetched:", influencers); // 🔍 Debugging output
  
      res.json(influencers);
    } catch (error) {
      console.error("Error fetching influencers:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  
// Fetch a specific influencer's details
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch influencer details
    const { data: influencer, error: influencerError } = await supabase
      .from("influencers")
      .select("*")
      .eq("id", id)
      .single();

    if (influencerError || !influencer) {
      return res.status(404).json({ error: "Influencer not found" });
    }

    // Fetch claims for the influencer
    const { data: claims, error: claimsError } = await supabase
      .from("claims")
      .select("*")
      .eq("influencer_id", id);

    if (claimsError) {
      throw claimsError;
    }

    // Calculate trust score
    const verifiedClaims = claims.filter((c) => c.status === "Verified").length;
    const totalClaims = claims.length;
    const trustScore = totalClaims > 0 ? (verifiedClaims / totalClaims) * 100 : 0;

    res.json({ influencer, claims, trustScore: trustScore.toFixed(2) });
  } catch (error) {
    console.error("Error fetching influencer details:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
