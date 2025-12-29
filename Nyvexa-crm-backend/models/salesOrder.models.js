import mongoose from "mongoose";

const salesOrderSchema = new mongoose.Schema(
  {
    // Reference to Sale Quotation
    quotationNo: {
      type: String,
      required: true,
      index: true
    },

    orderNo: {
      type: String,
      unique: true,
      index: true
    },

    date: {
      type: Date,
      default: Date.now
    },

    vendorPODate: {
      type: Date
    },

    vendorPONo: {
      type: String
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

    rate: {
      type: Number,
      required: true
    },

    currency: {
      type: String,
      default: "INR"
    },

    paymentMethod: {
      type: String,
      enum: [
        "Advance",
        "Credit",
        "Cash",
        "Immediate",
        "LC",
        "Stock Transfer",
        "NEFT"
      ],
      required: true
    },

    paymentTerms: {
      type: String,
      enum: ["100% Advance", "45 Days", "60 Days"],
      default: "100% Advance"
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

    otherTax: {
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

export default mongoose.model("SalesOrder", salesOrderSchema);


