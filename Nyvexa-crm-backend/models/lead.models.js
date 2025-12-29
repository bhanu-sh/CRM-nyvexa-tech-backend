import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    //Client reference
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
      index: true
    },

    //Auto-generated Lead Number
    panNo: {
      type: String,
      unique: true,
      index: true
    },

    status: {
      type: String,
      enum: ["Pending", "Done", "Cancel", "Postpone"],
      default: "Pending"
    },

    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    source: {
      type: String,
      enum: ["Meta", "WhatsApp", "Ads", "Cold Calling", "Email", "Other"],
      required: true
    },

    companyCategory: {
      type: String,
      enum: ["Account", "Creditor", "Debtor", "Both"],
      required: true
    },

    mobileNo1: {
      type: String,
      required: true,
      unique: true
    },

    mobileNo2: {
      type: String,
      unique: true,
      sparse: true
    },

    buildAddress: {
      type: String,
      required: true
    },

    shipAddress: {
      type: String
    },

    product: {
      name: {
        type: String,
        required: true
      },
      code: {
        type: String
      }
    },

    qty: {
      type: Number,
      min: 1
    },

    followUpDate: {
      type: Date
    },

    printable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Lead", leadSchema);

