const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");


const app = express();

mongoose.connect("mongodb+srv://admin1:"+ process.env.ATLAS_PASS +"@cluster1.oar74.mongodb.net/shop?retryWrites=true&w=majority",
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});


const fitlistRoutes = require("./api/routes/fitlists");
const exerciseRoutes = require("./api/routes/exercises");
const userRoutes = require("./api/routes/users");

app.use("/uploads", express.static("uploads"))

app.use(morgan("combined"));
app.use(bodyParser.json());


app.use("/fitlists", fitlistRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/users", userRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            Message: error.message
        }
    })
})

module.exports = app;
