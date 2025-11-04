import { Request, Response, NextFunction } from "express";

import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

const HTTP_OK = 200;

/**
 * Handles assigning custom claims (roles) to a user.
 *
 * @param req - Express request object containing UID and role.
 * @param res - Express response object used to send results.
 * @param next - Express next middleware function for error handling.
 * @returns A JSON response with success message.
 */
export const setCustomClaims = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid, claims } = req.body;

    if (!uid || !claims) {
      res.status(400).json({
        success: false,
        message: "Both 'uid' and 'claims' are required.",
      });
      return;
    }

    await auth.setCustomUserClaims(uid, { claims });

    res
      .status(HTTP_OK)
      .json(successResponse({}, `Custom claims set for user: ${uid}`));
  } catch (error) {
    next(error);
  }
};
