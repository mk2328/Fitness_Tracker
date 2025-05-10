const Excercise = require("../model/Excercise");
const Workout = require("../model/Workout");
const WorkoutProgress = require("../model/Workout_Progress");
const Users_Info=require("../model/Users_info");


//Add Excercise
const add_excercise = async(req,res)=>{
    try {
        const{ex_name,category,pri_muscle_group,sec_muscle_groups} = req.body;
        const user_Id = req.userId;
        const excercise_data = await Excercise.create({ex_name,category,pri_muscle_group,sec_muscle_groups,added_by:user_Id});
        return res.status(200).json({msg:excercise_data,name:excercise_data.ex_name});
           

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}

//View Excercise
const view_excercise = async(req,res)=>{
    try {
        const user_Id = req.userId;
        const excercise_data = await Excercise.find({added_by:user_Id});
        if(!excercise_data || excercise_data.length === 0)
        {
            return res.status(400).json({error:"No excercise found"})
        }
        else{
        return res.status(200).json({msg:excercise_data});
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})
    }
}
//Add Workouts
const add_workout = async(req,res)=>{
    try {
        const{workout_name,exercises,day,created_on,notes} = req.body;
        const user_Id = req.userId;
        const workout_data = await Workout.create({workout_name,exercises,day,created_on,notes,userId:user_Id});
        return res.status(200).json({msg:workout_data,name:workout_data.exercises});
           

    } catch (error) {
        console.log(error);
        return res.status(500).json({error:"Internal Server Error"})

    }
}
//view workout 
const view_workouts = async (req, res) => {
    try {
        const user_Id = req.userId;
        const workouts = await Workout.find({ userId: user_Id }).sort({ created_on: -1 }); // Sort by created date in descending order

        if (!workouts || workouts.length === 0) {
            return res.status(400).json({ error: "No workouts found" });
        }

        return res.status(200).json({ msg: workouts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete Workout
const delete_workout =  async (req, res) => {
    const workoutId = req.params.id;
    try {
      const workout = await Workout.findByIdAndDelete(workoutId);
      
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
      
      return res.status(200).json({ message: "Workout deleted successfully" });
    } catch (error) {
      console.error("Error deleting workout:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  //delete excercise
  const delete_exercise =  async (req, res) => {
    const exerId = req.params.id;
    try {
      const exercise = await Excercise.findByIdAndDelete(exerId);
      
      if (!exercise) {
        return res.status(404).json({ message: "Excercise not found" });
      }
      
      return res.status(200).json({ message: "Excercise deleted successfully" });
    } catch (error) {
      console.error("Error deleting Excercise:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  const update_workout = async (req, res) => {
    try {
      const workoutId = req.params.id;
      const updatedData = req.body;
  
      const updatedWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        updatedData,
        { new: true }
      );
  
      if (!updatedWorkout) {
        return res.status(404).json({ msg: "Workout not found" });
      }
  
      res.status(200).json({ msg: "Workout updated successfully", data: updatedWorkout });
    } catch (error) {
      res.status(500).json({ msg: "Failed to update workout", error });
    }
  };

  const Exer_update = async (req, res) => {
    try {
      const { ex_name, pri_muscle_group, sec_muscle_groups } = req.body;
  
      // Find the exercise by ID
      const exercise = await Excercise.findById(req.params.id);
  
      if (!exercise) {
        return res.status(404).json({ msg: "Exercise not found" });
      }
  
      exercise.ex_name = ex_name || exercise.ex_name;
      exercise.pri_muscle_group = pri_muscle_group || exercise.pri_muscle_group;
      exercise.sec_muscle_groups = sec_muscle_groups || exercise.sec_muscle_groups;
  
      const updatedExercise = await exercise.save();
      res.json(updatedExercise);
    } catch (error) {
      console.error("Error updating exercise", error);
      res.status(500).json({ msg: "Server error" });
    }
  }


  const view_workoutbyid = async (req, res) => {
    try {
      const user_Id = req.userId; 
      const id = req.params.id;
  
      if (!id) {
        return res.status(400).json({ error: "Workout ID is required." });
      }
  
      const workout_data = await Workout.findOne({ userId: user_Id, _id: id })
        .populate("exercises.exerciseId", "ex_name")
        .exec();
  
      // Check if workout exists
      if (!workout_data) {
        return res.status(404).json({ error: "No Workout found!" });
      }
  
      // Return data
      return res.status(200).json({ msg: workout_data });
    } catch (error) {
      console.error("Error fetching workout data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //Maintain Progress
const progress = async(req,res)=>{
  try {
      const{workoutId,exercises,calories_burned,performed_on,duration,volume,total_sets,total_reps,notes} = req.body;
      const user_Id = req.userId;
      const id = req.params.id;
      const progress_data = await WorkoutProgress.create({
          workoutId:id,exercises,calories_burned,performed_on,duration,volume,total_sets,total_reps,notes,userId:user_Id
      });
      return res.status(200).json({msg:progress_data});
         

  } catch (error) {
      console.log(error);
      return res.status(500).json({error:"Internal Server Error"})

  }
}

const viewProgressByDate = async (req, res) => {
  try {
      const user_Id = req.userId; 
      const date = req.params.date; 

      
      const progressData = await WorkoutProgress.find({
          userId: user_Id,
          performed_on: new Date(date), 
      })
          .populate("workoutId", "workout_name") 
          .populate("exercises.exerciseId", "ex_name") 
          .exec();

      if (!progressData || progressData.length === 0) {
          return res.status(404).json({ error: "No progress found for the specified date." });
      }

      return res.status(200).json({ msg: progressData });
  } catch (error) {
      console.error("Error fetching progress:", error);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};
  
const viewProgressByMonthYear = async (req, res) => {
  try {
    const user_Id = req.userId; 
    const { year, month } = req.params; 

    const startDate = new Date(Date.UTC(year, month - 1, 1)); 
    const endDate = new Date(Date.UTC(year, month, 1)); 

   
    const progressData = await WorkoutProgress.find({
      userId: user_Id,
      performed_on: { $gte: startDate, $lt: endDate }, 
    })
      .populate("workoutId", "workout_name") 
      .populate("exercises.exerciseId", "ex_name") 
      .exec();


    if (!progressData || progressData.length === 0) {
      return res.status(404).json({ error: "No progress found for the specified month." });
    }

    // Calculate totals for the month
    const totals = progressData.reduce((acc, workout) => {
      acc.calories += parseFloat(workout.calories_burned || 0);
      acc.volume += parseFloat(workout.volume || 0);
      acc.total_reps += parseFloat(workout.total_reps || 0);
      acc.total_sets += parseFloat(workout.total_sets || 0);
      acc.duration += parseFloat(workout.duration || 0);
      return acc;
    }, { calories: 0, volume: 0, total_reps: 0, total_sets: 0, duration: 0 });

    return res.status(200).json({ msg: progressData, totals });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
//delete progress

const delete_progress = async(req,res)=>{
  try {
      const user_Id = req.userId;
      const id = req.params.id;

      const progress_data = await WorkoutProgress.deleteOne({_id: id,userId:user_Id});

      if(!progress_data || progress_data.length === 0)
      {
          return res.status(400).json({error:"Progress Not Found"})
      }
      else{
      return res.status(200).json({msg:"Deleted Successfully"});
      }

  } catch (error) {
      console.log(error);
      return res.status(500).json({error:"Internal Server Error"})
  }
}


 const getUserBMIAndWorkouts = async (req, res) => {
  try {    
    // Fetch the user's height, weight, and calculate BMI
    const userId = req.userId; // assuming auth middleware sets this
      const user = await Users_Info.findOne({ userId: userId }); // adjust if needed
  
      // if (!user || !user.height || !user.weight) {
      //   return res.status(400).json({ message: "Height or weight missing" });
      // }

    // const heightCm = user.height;
    // const weightKg = user.weight;
    // const heightM = heightCm / 100; // Convert height to meters
    const bmi = 12;
    
    let goal = '';

    // Categorizing BMI and setting goal
    if (bmi < 18.5) {
      goal = 'weight gain';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      goal = 'weight maintenance';
    } else if (bmi >= 25 && bmi < 29.9) {
      goal = 'weight loss';
    } else {
      goal = 'weight loss';
    }

    // Fetch workouts based on goalType
    const workouts = await Workout.find({ goalType: goal })
      .populate("workouts.exercises.exerciseId")  // Populate exercises with Exercise details
      .populate("userId"); // Populate userId to get user details

    if (workouts.length === 0) {
      return res.status(200).json({ message: "No workouts available for this goal type" });
    }

    // Returning BMI details along with workouts
    return res.status(200).json({
      bmi: bmi.toFixed(2),
      goal: goal,
      workouts: workouts
    });

  } catch (err) {
    console.log("Error fetching workouts:", err.message);
    res.status(500).json({ message: "Error fetching workouts: " + err.message });
  }
};

  
module.exports={add_excercise,view_excercise,Exer_update,
  add_workout,view_workouts,delete_workout,
  delete_exercise,update_workout,view_workoutbyid,
  progress,viewProgressByDate, viewProgressByMonthYear,delete_progress,getUserBMIAndWorkouts


}