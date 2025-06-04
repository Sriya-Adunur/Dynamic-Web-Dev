import express, { Request, Response } from "express";
import { Profile } from "../models/profile";
import { authenticateUser } from "./auth";

const router = express.Router();

// GET profile
router.get("/:userid", authenticateUser, async (req, res) => {
  const profile = await Profile.findOne({ userid: req.params.userid });
  if (profile) res.json(profile);
  else res.status(404).send("Not found");
});

// PUT profile
router.put("/:userid", authenticateUser, async (req, res) => {
  const updated = await Profile.findOneAndUpdate(
    { userid: req.params.userid },
    req.body,
    { new: true, upsert: true }
  );
  res.json(updated);
});

export default router;
