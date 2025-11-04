// Mock Firebase auth before import
jest.mock("../src/config/firebaseConfig", () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

import { Request, Response, NextFunction } from "express";
import authenticate from "../src/api/v1/middleware/authenticate";
import { auth } from "../src/config/firebaseConfig";

describe("authenticate middleware (basic)", () => {
  const next = jest.fn() as NextFunction;
  const makeRes = () => ({ locals: {} } as unknown as Response);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should allow valid token", async () => {
    const req = {
      headers: { authorization: "Bearer validToken" },
    } as unknown as Request;
    const res = makeRes();

    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: "user1", role: "officer" });

    await authenticate(req, res, next);

    expect(auth.verifyIdToken).toHaveBeenCalledWith("validToken");
    expect(res.locals.uid).toBe("user1");
    expect(res.locals.role).toBe("officer");
    expect(next).toHaveBeenCalled();
  });

  test("should handle missing token", async () => {
    const req = { headers: {} } as unknown as Request;
    const res = makeRes();

    await authenticate(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  test("should handle invalid token", async () => {
    const req = { headers: { authorization: "Bearer badToken" } } as unknown as Request;
    const res = makeRes();

    (auth.verifyIdToken as jest.Mock).mockRejectedValue(new Error("invalid token"));

    await authenticate(req, res, next);

    expect(auth.verifyIdToken).toHaveBeenCalledWith("badToken");
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});
