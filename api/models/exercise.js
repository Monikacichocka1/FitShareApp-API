const mongoose = require("mongoose");

const exercisesSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    items: String,
    Time: Number,
});

module.exports = mongoose.model("Exercise", exercisesSchema);