const express = require("express");
const mongoose = require("mongoose");
const { findByIdAndUpdate } = require("../models/exercise");
const router = express.Router();

const Exercise = require("../models/exercise");
const checkAuth = require("../middleware/check-auth");
const fitlist = require("../models/fitlist");
const exercise = require("../models/exercise");

router.get("/",(req, res,next) => {
    Exercise.find()
    .exec()
    .then(exercises => {
        res.status(200).json({ 
        Message: "Lista wszystkich ćwiczeń",
        info: exercises
    });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })
});

router.post("/", checkAuth, (req, res,next) => {
    const exercise = new Exercise({
        _id: new mongoose.Types.ObjectId(),
        items: req.body.items,
        time: req.body.time,
    })
    time
    .save()
    .then(result => {

        res.status(200).json({ 
            Message: "Nowe ćwiczenie dodane",
            info: result,
            });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    });

});

router.get("/:exerciseId", (req, res, next) => {
    const id = req.params.exerciseId;
    Exercise.findById(id)
    .exec()
    .then((exercise) => {
        res.status(200).json({ 
        Message: "Szczegóły numeru ćwiczeń " + id,
        info: exercise,
    });
})
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    });
});

router.patch("/:exerciseId", checkAuth, (req, res, next) => {
    const id = req.params.exerciseId;
    const exercise = {
        items: req.body.items,
        time: req.body.time,
    }
    Fitlist.findByIdAndUpdate(id, fitlist, {new: true})
    .exec()
    .then(newExercise => {
        res.status(200).json({ 
            Message: "Dane dotyczące numeru ćwiczeń zostały zmienione  " + id,
            newData: newExercise,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })
});

router.delete("/:exerciseId", checkAuth, (req, res, next) => {
    const id = req.params.orderId;
    Exercise.findByIdAndRemove(id)
    .exec()
    .then(exercise => {
        res.status(200).json({ Message: "Usunięto numeru ćwiczenia " + id})
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })
});

module.exports = router;
