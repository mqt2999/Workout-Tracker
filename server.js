const express = require("express");
const mongojs = require("mongojs");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose")

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


const databaseUrl = "workoutTracker";
const collections = ["workouts"];

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex:true,
  useFindAndModify:false
});



app.use(require('./routes'));



// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname + '/public/index.html'))
// })

// app.get("/exercise", (req,res) => {
//     res.sendFile(path.join(__dirname + '/public/exercise.html'))
// })
// app.get("/stats", (req,res) => {
//     res.sendFile(path.join(__dirname + '/public/stats.html'))
// })

// app.get("/api/workouts", (req, res) => {
//     db.workouts.find({}, (error, data) => {
//         if (error) {
//             console.error(error)
//         }
//         else {
//             res.send(data)
//         }
//     })
// })

// app.put('api/workouts/:id', ({body},res) => {
//     console.log("get the cheese")
//     db.workouts.findOne({ _id: req.params }).Update( { $push:{ body } }, {new:true})
//     .then(data => {
//         res.json(data);
//     })
//     .catch(err => {
//         res.json(err);
//     })
// })

// app.post("/api/workouts", (req,res) => {
//     db.workouts.insert(req.body, (error,data) => {
//         if (error){
//             console.error(error)
//         }
//         else{
//             res.send(data)
//             console.log("get money")
//         }
//     })
// })
app.listen(3001, () => {
    console.log("App running on port 3001!");
});