import express from "express";
import { getUserById } from "../controllers/getUserDetailsController";

const router = express.Router();

router.get("/users/:uid", getUserById);

export default router;
