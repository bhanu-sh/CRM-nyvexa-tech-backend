import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true, // CREATE_USER, VIEW_LEADS
      trim: true
    },

    module: {
      type: String,
      required: true, // CRM, SALES, HR, INVENTORY
      trim: true
    },

    description: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Permission", permissionSchema);