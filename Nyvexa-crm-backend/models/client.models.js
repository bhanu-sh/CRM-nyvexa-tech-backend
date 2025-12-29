import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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

    phone: {
      type: String
    },

    // 🔐 Password (hashed)
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false // IMPORTANT: hide password by default
    },

    address1: {
      type: String,
      required: true
    },

    address2: {
      type: String
    },

    city: String,
    state: String,
    pincode: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

clientSchema.pre("save", async function (next) {
  // Only hash if password is new or modified
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

clientSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Client", clientSchema);

