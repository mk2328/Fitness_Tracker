const mongoose =require("mongoose");

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    protein: {
        type: String,
        required: true,
    },
    carbs: {
        type: String,
        required: true,
    },
    fats: {
        type: String,
        required: true,
    },
    calories:{
        type:String,
        required:true
    },
    quantity:{
        type:String,
        default:'100'
    },
   added_by:{
    type:mongoose.Schema.Types.ObjectId,
    required:false,
    ref:"User"
   }
});

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;


