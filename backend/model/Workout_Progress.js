const mongoose = require('mongoose');

const WorkoutProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout',
    required: true
  },
  completedExercises: [{
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise'
    },
    duration: Number, // in minutes or seconds
    caloriesBurnt: Number
  }],
  totalDuration: Number, // total duration of this workout in minutes
  totalCaloriesBurnt: Number,
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WorkoutProgress', WorkoutProgressSchema);
