import crypto from "crypto";

export const ensureDeviceId = (req, res, next) => {
  let deviceId = req.signedCookies?.deviceId;

  if (!deviceId) {
    deviceId = crypto.randomBytes(16).toString("hex");

    res.cookie("deviceId", deviceId, {
      httpOnly: true,
      signed: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 365 * 24 * 60 * 60 * 1000 // 1 year
    });
  }

  req.deviceId = deviceId;
  next();
};
