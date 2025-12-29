import mongoose from "mongoose";

const saleQuotationSchema = new mongoose.Schema(
  {
    // Reference to Lead
    leadNo: {
      type: String,
      required: true,
      index: true
    },

    quotationNo: {
      type: String,
      unique: true,
      index: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    engDate: {
      type: Date
    },

    validTill: {
      type: Date,
      required: true
    },

    paymentTerms: {
      type: String,
      enum: ["100% Advance", "45 Days", "60 Days"],
      default: "100% Advance"
    },

    companyName: {
      type: String,
      required: true
    },

    companyAddress: {
      type: String,
      required: true
    },

    carrier: {
      type: String
    },

    product: {
      code: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    },

    currency: {
      type: String,
      required: true,
      default: "INR"
    },

    secondaryCurrency: {
      type: String
    },

    rate: {
      type: Number,
      required: true
    },

    gst: {
      cgst: { type: Number, default: 0 },
      sgst: { type: Number, default: 0 },
      igst: { type: Number, default: 0 }
    },

    freights: {
      type: Number,
      default: 0
    },

    taxAmount: {
      type: Number,
      default: 0
    },

    netAmount: {
      type: Number,
      default: 0
    },

    grossAmount: {
      type: Number,
      default: 0
    },

    termsAndConditions: {
      type: String
    },

    description: {
      type: String
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

export default mongoose.model("SaleQuotation", saleQuotationSchema);
