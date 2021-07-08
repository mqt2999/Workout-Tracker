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

const PORT = process.env.PORT || 3001

const db = mongojs(databaseUrl, collections);

db.on("error", error => {
    console.log("Database Error:", error);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex:true,
  useFindAndModify:false
});



app.use(require('./routes'));




app.listen(PORT, () => {
    console.log("App running on port 3001!");
});