import express from "express";
import { getInfluencers, addInfluencer } from "../controllers/influencerController.js";
import { searchHealthInfluencers } from "../services/perplexityService.js";
import { db } from "../config/db.js";

const router = express.Router();

// @route   GET /api/influencers
// @desc    Get all influencers
router.get("/", getInfluencers);

// @route   POST /api/influencers
// @desc    Add a new influencer
router.post("/", addInfluencer);

// Fetch & Store Influencers and Claims
router.post("/search", async (req, res) => {
    const { searchQuery } = req.body;
  
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }
  
    try {
      // Fetch influencers & claims from Perplexity
      const perplexityData = await searchHealthInfluencers(
        `Find health influencers and their claims about ${searchQuery}`
      );
  
      if (!perplexityData || !perplexityData.choices) {
        return res.status(500).json({ error: "No data received from Perplexity" });
      }
  
      const influencers = [];
  
      for (const choice of perplexityData.choices) {
        const content = choice.message.content; // Extract claim text
        const imageUrl = choice.message.image; // Profile picture (if available)
        const influencerName = content.split(" ")[0]; // Extract name (simplified)
  
        // Store influencer if not exists
        const [influencer] = await db("influencers")
          .select("*")
          .where({ name: influencerName });
  
        let influencerId;
        if (!influencer) {
          const [newInfluencer] = await db("influencers").insert(
            { name: influencerName, platform: "Perplexity", image_url: imageUrl },
            ["id"]
          );
          influencerId = newInfluencer.id;
        } else {
          influencerId = influencer.id;
        }
  
        // Store claim
        await db("claims").insert({
          influencer_id: influencerId,
          claim_text: content,
          category: searchQuery,
          status: "Unverified",
        });
  
        influencers.push({ name: influencerName, content, imageUrl });
      }
  
      res.json({ success: true, influencers });
    } catch (error) {
      console.error("Error processing influencer data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  export default router;