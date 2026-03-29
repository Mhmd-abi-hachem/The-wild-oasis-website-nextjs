import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    created_at: {
      type: Date,
      required: true,
      default: Date.now,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    cabinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cabin",
      required: true,
      index: true,
    },

    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
      index: true,
    },

    hasBreakfast: {
      type: Boolean,
      required: true,
      default: false,
    },

    observations: {
      type: String,
      trim: true,
      default: "",
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },

    numGuests: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: false,
  }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
