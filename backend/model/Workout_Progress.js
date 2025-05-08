const mongoose = require("mongoose");

const workoutProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    workoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workout",
        required: true,
    },
    exercises: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Excercise",
                required: true,
            },
            sets: [
                {
                    set_num: {
                        type: Number,
                        required: true,
                    },
                    reps: {
                        type: Number,
                        required: true,
                    },
                    weight: {
                        type: Number,
                        required: false,
                    },
                }
            ],
        },
    ],
    calories_burned: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    volume: {
        type: String,
        required: true,
    },
    total_reps: {
        type: String,
        required: true,
    },
    total_sets: {
        type: String,
        required: true,
    },
    performed_on: {

        type: Date,
        required: true,
    },

    notes: {
        type: String,
        maxlength: 500,
    },
});

const WorkoutProgress = mongoose.model("WorkoutProgress", workoutProgressSchema);
module.exports = WorkoutProgress;
