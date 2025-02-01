import express from "express";
import { getClaims, addClaim, verifyClaim } from "../controllers/claimController.js";

const router = express.Router();

// @route   GET /api/claims
// @desc    Get all claims
router.get("/", getClaims);

// @route   POST /api/claims
// @desc    Add a new claim
router.post("/", addClaim);

// @route   PATCH /api/claims/:id
// @desc    Verify or update a claim status
router.patch("/:id", verifyClaim);

export default router;
