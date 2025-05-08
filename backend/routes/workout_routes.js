const express= require("express");
const controller = require("../controller/workout_controller");
const auth_middleware = require("../middleware/auth_middleware");
const route = express.Router();

route.post('/add_excercise',auth_middleware,controller.add_excercise);
route.post('/add_workout',auth_middleware,controller.add_workout);
route.post('/progress/:id',auth_middleware,controller.progress);


route.get('/view_workouts',auth_middleware,controller.view_workouts);
route.get('/view_workouts/:id',auth_middleware,controller.view_workoutbyid);
route.get('/view_excercise',auth_middleware,controller.view_excercise);
route.get('/view_progress/:date',auth_middleware,controller.viewProgressByDate);
route.get('/view_progress/month/:year/:month', auth_middleware,controller.viewProgressByMonthYear);
// Example delete route
route.delete("/delete_workout/:id", auth_middleware,controller.delete_workout);
route.delete("/delete_exercise/:id", auth_middleware, controller.delete_exercise);
route.delete("/delete_progress/:id", auth_middleware, controller.delete_progress);

route.put("/edit/:id", auth_middleware, controller.update_workout);
route.put("/edit_exer/:id", auth_middleware, controller.Exer_update);

route.get("/Get_Workout/:id", auth_middleware, controller.view_workoutbyid);

module.exports = route;