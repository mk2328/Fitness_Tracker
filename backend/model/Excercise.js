const mongoose = require("mongoose");
const excerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  target_area: {
    type: String,
    required: true,
    enum: [
      "Chest",
      "Arms",
      "Legs",
      "Back",
      "Shoulders",
      "Core",
      "Full Body",
    ],
  },
  description: {
    type: String,
    default: "",
  },
  
  calories_burned_per_minute: {
    type: Number, // Calories burned per minute for this exercise
    required: true,
  },
  added_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

const Excercise = mongoose.model("Excercise", excerciseSchema);
module.exports = Excercise;