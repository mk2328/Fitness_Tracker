const mongoose = require("mongoose")

const db = async()=>{
    try {
        await mongoose.connect("mongodb+srv://muskankamran3369:muskurahat2328u@cluster0.fxk1min.mongodb.net/fitness_tracker?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connection Successfull");
    } catch (error) {
        console.log(error)
        process.exit(0);
    }
}

module.exports = db;
