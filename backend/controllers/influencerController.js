const axios = require("axios");
const supabase = require("../db");
const { fetchPerplexityData, verifyWithOpenAI } = require("../services");

exports.getInfluencerData = async (req, res) => {
  const { handle } = req.params;
  try {
    const data = await fetchPerplexityData(handle);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching influencer data" });
  }
};

exports.extractClaims = async (req, res) => {
    const { content } = req.body;
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [{ role: "user", content: `Extract health claims: ${content}` }],
        },
        { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
      );
  
      const claims = response.data.choices[0].message.content.split("\n");
      res.json({ claims });
    } catch (error) {
      res.status(500).json({ error: "Error extracting claims" });
    }
};

exports.verifyClaims = async (req, res) => {
    const { claims } = req.body;
    try {
      const results = await verifyWithOpenAI(claims);
      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Error verifying claims" });
    }
 };

exports.getLeaderboard = async (req, res) => {
    try {
      const { data, error } = await supabase
        .from("influencers")
        .select("name, trust_score, follower_count, claim_stats")
        .order("trust_score", { ascending: false });
  
      if (error) throw error;
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching leaderboard data" });
    }
  };
  

  
