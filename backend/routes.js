const express = require("express");
const { getInfluencerData, extractClaims, verifyClaims, getLeaderboard } = require("./controllers/influencerController");

const router = express.Router();

router.get("/influencer/:handle", getInfluencerData);
router.post("/extract-claims", extractClaims);
router.post("/verify-claims", verifyClaims);
router.get("/leaderboard", getLeaderboard);

module.exports = router;
