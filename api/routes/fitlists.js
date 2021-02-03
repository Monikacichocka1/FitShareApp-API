const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer");


const FitlistController = require("../controllers/fitlists")

const checkAuth = require("../middleware/check-auth")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(':', '_').replace(':', '-') +
        file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024*1024*5
},
    fileFilter: fileFilter,
});


router.get("/", FitlistController.fitlists_get_all)

const Fitlist = require("../models/fitlist");

router.get("/", FitlistController.fitlists_get_all);

router.post("/", upload.single("fitlistImage"), checkAuth, FitlistController.fitlists_add);

router.get("/:fitlistId", FitlistController.fitlists_get);

router.patch("/:fitlistId", checkAuth, FitlistController.fitlists_change);

router.delete("/:fitlistId", checkAuth, FitlistController.fitlists_del);

module.exports = router;
