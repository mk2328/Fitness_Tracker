const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true, 
    },
    workout_name: {
        type: String,
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
    created_on: {
        type: Date,
        required: true,
        default: Date.now, 
    },
    day:{
        type:String,
        required:true
    },
    notes: {
        type: String, 
        maxlength: 200,
    },
});

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
