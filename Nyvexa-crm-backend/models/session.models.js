import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    sessionToken: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    deviceId: {
      type: String,
      required: true,
      index: true
    },

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true
    },

    isValid: {
      type: Boolean,
      default: true,
      index: true
    },

    ipAddress: String,
    userAgent: String,

    // NO index:true here
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

/* -------------------- INDEXES -------------------- */

// TTL index (ONLY here)
sessionSchema.index(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// One active session per device
sessionSchema.index(
  { user: 1, deviceId: 1 },
  { unique: true, partialFilterExpression: { isValid: true } }
);

export default mongoose.model("Session", sessionSchema);


