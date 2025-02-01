import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// Fetch all influencers
router.get("/", async (req, res) => {
  try {
    const influencers = await db("influencers").select("*");
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
    const influencer = await db("influencers").where({ id }).first();
    if (!influencer) {
      return res.status(404).json({ error: "Influencer not found" });
    }

    // Get all claims associated with the influencer
    const claims = await db("claims").where({ influencer_id: id });

    // Calculate trust score (simple ratio of verified claims)
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
