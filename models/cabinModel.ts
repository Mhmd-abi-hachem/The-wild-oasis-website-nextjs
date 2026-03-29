import mongoose from "mongoose";

const cabinSchema = new mongoose.Schema({
  cabinName: {
    type: String,
    required: [true, "A cabin must have a name"],
    unique: true,
    maxlength: [20, "A cabin name must have less or equal than 20 characters"],
  },
  maxCapacity: {
    type: Number,
    required: [true, "A cabin must have a maximum capacity"],
  },
  price: {
    type: Number,
    required: [true, "A cabin must have a price"],
  },
  discount: {
    type: Number,
  },

  description: String,

  cabinImage: String,
});

const Cabin = mongoose.models.Cabin || mongoose.model("Cabin", cabinSchema);

export default Cabin;
