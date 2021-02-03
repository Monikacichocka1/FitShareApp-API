const fitlist = require("../models/fitlist");
const Fitlist = require("../models/fitlist");

exports.fitlist_get_all = (req, res, next) => {
    Fitlist.find()
    .exec()
    .then(fitlists => {
        res.status(200).json({ 
        Message: "Lista treningów",
        info: fitlists,
    });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })
}

exports.fitlists_add = (req, res, next) => {
    console.log(req.file);

    const fitlist = new Fitlist({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        time: req.body.time,
        fitlistImage: req.file.path,
    })

    fitlist
    .save()
    .then(result => {
        res.status(200).json({ 
            Message: "Nowy trening dodany",
            info: result,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
        });
    });

}
exports.fitlists_get = (req, res, next) => {
    const id = req.params.fitlistId;
    Fitlist.findById(id)
    .exec()
    .then((fitlist) => {
        res.status(200).json({ 
        Message: "Szczegóły numer treningu " + id,
        info: fitlist,
    });
})
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })}
exports.fitlists_change = (req, res, next) => {
    const id = req.params.fitlistId;
    const fitlist = {
        name: req.body.name,
        time: req.body.time,
    }

    Fitlist.findByIdAndUpdate(id, fitlist, {new: true})
    .exec()
    .then(newFitlist => {
        res.status(200).json({ 
            Message: "Dane odnośnie numeru treningu zostały zmienione  " + id,
            newData: newFitlist,
        });
    })
    .catch((err) => {
        res.status(500).json({ 
            Message: "Błąd",
            info: err,
            });
    })}
    exports.fitlists_del = (req, res, next) => {
        const id = req.params.fitlistId;
        Fitlist.findByIdAndRemove(id)
        .exec()
        .then(fitlist => {
            res.status(200).json({ Message: "Trening usunięto " + id})
        })
        .catch((err) => {
            res.status(500).json({ 
                Message: "Błąd",
                info: err,
                });
        })
        
    }
