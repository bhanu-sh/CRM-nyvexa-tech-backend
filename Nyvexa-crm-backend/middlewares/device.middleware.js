import crypto from "crypto";

const isProd = process.env.NODE_ENV === "production";

export const ensureDeviceId = (req, res, next) => {
  let deviceId = req.signedCookies?.deviceId;

  if (!deviceId) {
    deviceId = crypto.randomBytes(16).toString("hex");

    res.cookie("deviceId", deviceId, {
      httpOnly: true,
      signed: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    });
  }

  req.deviceId = deviceId;
  next();
};
