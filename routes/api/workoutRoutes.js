const router = require('express').Router();
const workouts = require('../../models/workout');
const mongojs = require('mongojs')

router.get("/workouts", (req, res) => {
    workouts.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ]).then(dbWorkouts => {
        console.log(dbWorkouts)
        res.send(dbWorkouts)
    })
        .catch(error => {
            console.log(error)
            res.send(error)
        })
})

router.put('/workouts/:id', ({ body, params }, res) => {
    console.log("hey there", body)
    console.log("params.id", params.id)
    workouts.findOneAndUpdate(
        { _id: params.id },
        { $push: { exercises: body } })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json(err);
        })
})

router.post("/workouts", (req, res) => {
    workouts.create(req.body, (error, data) => {
        if (error) {
            console.error(error)
        }
        else {
            res.send(data)
            console.log("get money")
        }
    })

})

router.get(`/workouts/range`, (req, res) => {
    workouts.find({}, (error, data) => {
        if (error) {
            console.log(error)
        }
        else {
            workouts.aggregate([
                {
                    $addFields: {
                        totalWeight: { $sum: "$exercises.weight" },
                        totalDuration: { $sum: "$exercises.duration" }
                    }
                }
            ]).then(dbWorkouts => {
                console.log(dbWorkouts)
                res.send(dbWorkouts)
            })
                .catch(error => {
                    console.log(error)
                    res.send(error)
                })
        }
    })

})
module.exports = router;