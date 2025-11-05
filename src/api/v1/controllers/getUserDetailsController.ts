// External library imports
import { Request, Response, NextFunction } from "express";
import { UserRecord } from "firebase-admin/auth";

// Internal module imports
import { auth } from "../../../config/firebaseConfig";
import { successResponse } from "../models/responseModel";

const HTTP_OK = 200;

/**
 * Retrieves user details by UID from Firebase Authentication.
 *
 * @param req - Express request object containing the UID parameter.
 * @param res - Express response object used to send the response.
 * @param next - Express next middleware for error handling.
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { uid } = req.params; // Destructure directly inside try block
    const userRecord: UserRecord = await auth.getUser(uid);

    // Send standardized success response
    res.status(HTTP_OK).json(successResponse(userRecord));
  } catch (error) {
    // Delegate errors to the centralized error handler
    next(error);
  }
};
