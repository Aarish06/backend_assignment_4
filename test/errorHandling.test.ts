import { Request, Response, NextFunction } from "express";
import errorHandler from "../src/api/v1/middleware/errorHandler";
import { AppError } from "../src/api/v1/errors/errors";
import { HTTP_STATUS } from "../src/api/v1/constants/httpConstants";

describe("errorHandler (simple mock test)", () => {
  const req = {} as Request;
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn() as NextFunction;

  test("should handle AppError", () => {
    const err = new AppError("Not authorized", "AUTH_ERROR", HTTP_STATUS.UNAUTHORIZED);

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.UNAUTHORIZED);
    expect(res.json).toHaveBeenCalled();
  });

  test("should handle normal Error", () => {
    const err = new Error("Something went wrong");

    errorHandler(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalled();
  });

  test("should handle null error", () => {
    errorHandler(null as unknown as Error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(HTTP_STATUS.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalled();
  });
});
