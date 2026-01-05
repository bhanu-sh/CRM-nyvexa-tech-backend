import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["Account", "Creditor", "Debtor", "Both"],
      required: true
    },

    gstin: {
      type: String,
      uppercase: true,
      trim: true
    },

    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: String,

    address1: {
      type: String,
      required: true
    },

    address2: String,

    city: String,
    state: String,
    pincode: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchema);


