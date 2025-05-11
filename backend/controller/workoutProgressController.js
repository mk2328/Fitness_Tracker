const WorkoutProgress = require('../model/Workout_Progress');
const { ObjectId } = require('mongoose').Types;

// API to update workout progress
exports.updateWorkoutProgress = async (req, res) => {
  const { userId, workoutId, exerciseId, duration, caloriesBurnt } = req.body;
  
  console.log('Request received with data:', { userId, workoutId, exerciseId, duration, caloriesBurnt });
  console.log('Request body received:', req.body);

  try {
    // Ensure ObjectId conversion
    const userObjectId = new ObjectId(userId);
    const workoutObjectId = new ObjectId(workoutId);
    const exerciseObjectId = new ObjectId(exerciseId);

    // Find or create workout progress for this user and workout
    let workoutProgress = await WorkoutProgress.findOne({ 
      userId: userObjectId, workoutId: workoutObjectId 
    });

    if (!workoutProgress) {
      // If no progress found, create a new progress document
      workoutProgress = new WorkoutProgress({
        userId: userObjectId,  // wrap userId in ObjectId
        workoutId: workoutObjectId,  // wrap workoutId in ObjectId
        completedExercises: [],
        totalDuration: 0,
        totalCaloriesBurnt: 0
      });
    }

    console.log('Current workout progress:', workoutProgress);

    // Add completed exercise to completedExercises array
    workoutProgress.completedExercises.push({
      exerciseId: exerciseObjectId,  // wrap exerciseId in ObjectId
      duration,
      caloriesBurnt
    });

    // Update total duration and total calories burnt
    workoutProgress.totalDuration += duration;
    workoutProgress.totalCaloriesBurnt += caloriesBurnt;

    console.log('Updated workout progress:', workoutProgress);

    // Save the updated progress back to the database
    await workoutProgress.save();

    return res.status(200).json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.log('Error updating progress:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
