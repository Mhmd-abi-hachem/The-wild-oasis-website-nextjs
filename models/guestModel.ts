import mongoose from "mongoose";

const guestSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    emailVerified: Boolean,
    nationality: { type: String, trim: true, default: "" },
    nationalID: { type: String, unique: true, trim: true, default: "" },
    countryFlag: { type: String, trim: true, default: "" },
    image: String,
  },
  {
    timestamps: true,
  },
);

const Guest =
  mongoose.models.Guest || mongoose.model("Guest", guestSchema, "user");

export default Guest;
