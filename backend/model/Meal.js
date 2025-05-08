const mongoose = require("mongoose")

const mealSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    meal_name: {
        type: String,
        required: true,
    },
    food_item: [
        {
            foodId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Food",
                required: true,
            },
            quantity: {
                type: String,
                required: true,
            },
            calories: {
                type: String,
                required: true,
            },
            protein: {
                type: String,
                required: true,
            },
            fats: {
                type: String,
                required: true,
            },
            carbs: {
                type: String,
                required: true,
            },
        }
    ],
    taken_on: {
        type: Date,
        required: true,
    },
});

const Meal = mongoose.model("Meal", mealSchema);
module.exports = Meal;
