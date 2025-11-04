import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

const HTTP_OK = 200;

export const setCustomClaims = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid, claims } = req.body;

    if (!uid || !claims || typeof claims !== "object") {
      res.status(400).json({
        success: false,
        message: "Provide 'uid' and 'claims' (object).",
      });
      return;
    }

    // ❗ send the claims object as-is (not { claims })
    await auth.setCustomUserClaims(uid, claims);

    res
      .status(HTTP_OK)
      .json(successResponse({}, `Custom claims set for user: ${uid}`));
  } catch (error) {
    next(error);
  }
};
