import express from "express";
import { setCustomClaims } from "../controllers/adminController";

const router = express.Router();

router.post("/set-claims", setCustomClaims);

export default router;
