const express= require("express");
const controller = require("../controller/nutrition_controller");
const auth_middleware = require("../middleware/auth_middleware");
const route = express.Router();

route.post('/add_food',auth_middleware,controller.add_food);
route.post('/add_meal',auth_middleware,controller.add_meal);


route.get('/view_food',auth_middleware,controller.view_food);
route.get('/view_food/:id',auth_middleware,controller.view_foodbyID);
route.get('/view_meal/:date',auth_middleware,controller.view_mealbydate);
route.get('/view_nutrition/month/:year/:month', auth_middleware,controller.viewMonthlyNutrition);


route.patch('/edit_food/:id',auth_middleware,controller.edit_food);


route.delete('/delete_food/:id',auth_middleware,controller.delete_food);
route.delete('/delete_meal/:id',auth_middleware,controller.delete_meal);




module.exports = route