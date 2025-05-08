const express = require("express");
const controller = require("../controller/user_controller");
const auth_middleware = require("../middleware/auth_middleware");
const route = express.Router();

route.post('/login',controller.login);
route.post('/register',controller.register);
route.post('/info',auth_middleware,controller.Information);

route.get('/user-info',auth_middleware,controller.fetch_info);
route.put('/update-info', auth_middleware, controller.update_info);

route.get('/bmi', auth_middleware, controller.getUserBMI);

module.exports=route