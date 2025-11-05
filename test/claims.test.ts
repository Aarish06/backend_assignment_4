jest.mock("../src/config/firebaseConfig", () => ({
  auth: {
    setCustomUserClaims: jest.fn(),
  },
}));


import { Request, Response, NextFunction } from "express";
import { setCustomClaims } from "../src/api/v1/controllers/adminController";
import { auth } from "../src/config/firebaseConfig";

describe("setCustomClaims controller", () => {
  const makeRes = () =>
    ({
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response);

  const next = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("sets custom claims successfully", async () => {
    const req = {
      body: { uid: "uid-1", claims: { role: "officer", beta: true } },
    } as Request;
    const res = makeRes();

    (auth.setCustomUserClaims as jest.Mock).mockResolvedValue(undefined);

    await setCustomClaims(req, res, next);

    expect(auth.setCustomUserClaims).toHaveBeenCalledWith("uid-1", {
      role: "officer",
      beta: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled(); // uses successResponse(...)
    expect(next).not.toHaveBeenCalled();
  });

  test("returns 400 if uid or claims missing", async () => {
    const req = { body: { uid: "", claims: null } } as unknown as Request;
    const res = makeRes();

    await setCustomClaims(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: false,
        message: expect.stringContaining("uid"),
      })
    );
    expect(auth.setCustomUserClaims).not.toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test("calls next on error from Firebase", async () => {
    const req = {
      body: { uid: "bad-uid", claims: { role: "officer" } },
    } as Request;
    const res = makeRes();

    (auth.setCustomUserClaims as jest.Mock).mockRejectedValue(
      new Error("boom")
    );

    await setCustomClaims(req, res, next);

    expect(auth.setCustomUserClaims).toHaveBeenCalledWith("bad-uid", {
      role: "officer",
    });
    expect(next).toHaveBeenCalled();
  });
});
