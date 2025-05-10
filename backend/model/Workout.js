const mongoose = require("mongoose");
const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // ✅ Now optional
  },
  goalType: {
    type: String,
    enum: ["weight loss", "weight gain", "weight maintenance"],
    required: true, // Goal type is mandatory
  },
  workouts: [
    {
      day: {
        type: String,
        required: true, // Each workout will have a specific day (e.g., Monday, Tuesday)
      },
      exercises: [
        {
          exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exercise", // Reference to the Exercise model
            required: true,
          },
          duration: {
            type: Number, // Duration in seconds
            required: true,
          },
          calories_burned: {
            type: Number, // Total calories burned for this exercise
            required: true,
          },
        },
      ],
      total_calories_burned: {
        type: Number, // Total calories burned during this workout
        default: 0, // This will be calculated later
      },
    },
  ],
  created_on: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    maxlength: 200,
  },
  isSuggested: {
    type: Boolean,
    default: false, // Indicates if this workout is suggested or custom
  },
});

const Workout = mongoose.model('Workout', workoutSchema);
module.exports = Workout;