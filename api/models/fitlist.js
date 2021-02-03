const mongoose = require("mongoose");

const fitlistsSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {
        type:String,
        required: true,
        unique: true
    },
    time: {
       type: Number,
       required: true,
       min: 5
    },
    fitlistImage: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model("Trening", fitlistsSchema);