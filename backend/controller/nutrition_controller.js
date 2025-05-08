const Food = require("../model/Food");
const Meal = require("../model/Meal");

//Add Food
const add_food = async(req,res)=>{
    try {
        const{name,category,protein,calories,carbs,fats} = req.body;
        const user_Id = req.userId;
        const food_exist= await Food.findOne({name});
        if(food_exist)
        {
            return res.status(400).json({error:"Food Already Exist"});

        }
        const food_data = await Food.create({name,category,protein,carbs,fats,calories,added_by:user_Id});
        return res.status(200).json({msg:food_data});
           

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}

//View Food
const view_food = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const food_data = await Food.find({added_by:user_Id});
        if(!food_data || food_data.length === 0)
        {
            return res.status(400).json({error:"Notfound"})
        }
        else{
        return res.status(200).json({msg:food_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

//View Food
const view_foodbyID = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const id = req.params.id;

        const food_data = await Food.findOne({_id: id,added_by:user_Id});

        if(!food_data || food_data.length === 0)
        {
            return res.status(400).json({error:"Food Item NotFound"})
        }
        else{
        return res.status(200).json({msg:food_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
//edit food
const edit_food = async (req, res) => {
    try {
        const {name, category, protein, calories, carbs, fats } = req.body; 
        const user_Id = req.userId;
        const id = req.params.id;

        const food_data = await Food.findOne({ _id: id, added_by: user_Id });
        if (!food_data) {
            return res.status(404).json({ error: "Food not found" });
        }

        food_data.name = name || food_data.name;
        food_data.category = category || food_data.category;
        food_data.protein = protein || food_data.protein;
        food_data.calories = calories || food_data.calories;
        food_data.carbs = carbs || food_data.carbs;
        food_data.fats = fats || food_data.fats;

        await food_data.save();

        return res.status(200).json({ msg: "Food updated successfully", food: food_data });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//delete food

const delete_food = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const id = req.params.id;

        const food_data = await Food.deleteOne({_id: id,added_by:user_Id});

        if(!food_data || food_data.length === 0)
        {
            return res.status(400).json({error:"Food Item Not Found"})
        }
        else{
        return res.status(200).json({msg:food_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

//Add Meal
const add_meal = async(req,res)=>{
    try {
        const{meal_name,food_item,taken_on} = req.body;
        const user_Id = req.userId;
        const meal_data = await Meal.create({meal_name,food_item,taken_on,userId:user_Id});
        return res.status(200).json({msg:meal_data});
           

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}

const view_mealbydate = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const date = req.params.date;

        const meal_data = await Meal.find({taken_on: date,userId:user_Id}).populate("food_item.foodId", "name")
        .exec();;

        if(!meal_data || meal_data.length === 0)
        {
            return res.status(200).json({error:"No Meal Taken Yet"})
        }
        else{
        return res.status(200).json({msg:meal_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}

//delete food

const delete_meal = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const id = req.params.id;

        const meal_data = await Meal.deleteOne({_id: id,userId:user_Id});

        if(!meal_data || meal_data.length === 0)
        {
            return res.status(400).json({error:"MealNot Found"})
        }
        else{
        return res.status(200).json({msg:meal_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}


const viewMonthlyNutrition = async (req, res) => {
    try {
        const user_Id = req.userId; 
        const { year, month } = req.params; 

        // Validate year and month
        if (!year || !month || month < 1 || month > 12) {
            return res.status(400).json({ error: "Invalid year or month" });
        }

        const startDate = new Date(year, month - 1, 1); 
        const endDate = new Date(year, month, 1); 

        const meals = await Meal.find({
            taken_on: { $gte: startDate, $lt: endDate },
            userId: user_Id
        });

        if (!meals || meals.length === 0) {
            return res.status(200).json({ message: "No meals found for the specified month" });
        }

        // Create an object to hold daily nutrition values
        const dailyNutrition = {};

        // Iterate through the meals and accumulate nutrition values by date
        meals.forEach(meal => {
            const date = meal.taken_on.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format

            if (!dailyNutrition[date]) {
                dailyNutrition[date] = { calories: 0, carbs: 0, protein: 0, fats: 0 };
            }

            meal.food_item.forEach(item => {
                dailyNutrition[date].calories += parseFloat(item.calories || 0);
                dailyNutrition[date].carbs += parseFloat(item.carbs || 0);
                dailyNutrition[date].protein += parseFloat(item.protein || 0);
                dailyNutrition[date].fats += parseFloat(item.fats || 0);
            });
        });

        // Convert the dailyNutrition object into an array for easier handling
        const nutritionArray = Object.keys(dailyNutrition).map(date => ({
            date,
            ...dailyNutrition[date]
        }));

        // Return the daily nutrition values
        return res.status(200).json({
            monthlyNutrition: nutritionArray
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports ={add_food,view_food,view_foodbyID,edit_food,delete_food,
    add_meal,view_mealbydate,delete_meal,viewMonthlyNutrition

};