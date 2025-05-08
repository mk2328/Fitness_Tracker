const mongoose =require("mongoose");

const excerciseSchema = new mongoose.Schema({
    ex_name: {
        type: String,
        required: true,
    },
    pri_muscle_group: {
        type: String,
        required: true,
    },
    sec_muscle_groups: {
        type: String,
        required: false,
    },
   added_by:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:"User"
   }
});

const Excercise = mongoose.model("Excercise", excerciseSchema);
module.exports = Excercise;


