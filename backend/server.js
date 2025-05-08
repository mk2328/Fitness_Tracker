const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const user_routes=require("./routes/user_routes");
const workout_routes=require("./routes/workout_routes");
const nutrition_routes=require("./routes/nutrition_routes");
const bodyparser = require("body-parser");
const app = express();
const corsoption ={
    origin: "http://localhost:3000",
    method:"POST,GET,PUT,PATCH,DELETE",
    credentials: true,
}
app.use(express.json());
app.use(bodyparser.json({ limit: '10mb' }))

app.use(cors(corsoption));
app.use("/",user_routes);
app.use("/workout",workout_routes);
app.use("/nutrition",nutrition_routes);
const port = 8000;
db().then(()=>{
    app.listen(port,()=>{
        console.log("Server Started "+port)
    })
});