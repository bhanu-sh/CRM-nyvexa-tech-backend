import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    // Client reference (many contacts → one client)
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true
    },

    name: {
      type: String,
      required: true
    },

    panNo: {
      type: String,
      required: true
    },

    gstin: {
      type: String,
      uppercase: true,
      trim: true
    },

    designation: {
      type: String
    },

    email: {
      type: String
    },

    phone: {
      type: String
    },

    whatsapp: {
      type: String
    },

    notes: {
      type: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
