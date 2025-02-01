import express from "express";
import { fetchInfluencersFromWeb } from "../fetchFromPerplexity.js";

const router = express.Router();

router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Query is required" });

        const results = await fetchInfluencersFromWeb(query);
        res.json(results);
    } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
