const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day:{
        type: Date,
        default: Date.now
    },
    exercises:[{
        type:{
            type: String,
            required: false
        },
        name:{
            type: String,
            required: false
        },
        duration:{
            type: Number,
            
        },
        distance:{
            type: Number,
            required:false
        },
        weight:{
            type: Number,
            
        },
        reps:{
            type: Number,
           
        },
        sets:{
            type: Number,
            
        }
    }]
})



const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;