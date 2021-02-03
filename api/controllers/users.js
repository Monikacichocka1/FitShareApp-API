const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const User = require("../models/user");

exports.user_sign = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({ wiadomość: err });
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                email: req.body.email,
                password: hash,
            });
            user.save()
            .then(result => {
                res.status(201).json({ wiadomość: "Dodano nowego użytkownika "})
            })
            .catch((err) => {
                res.status(500).json({ 
                    wiadomosc: "Błąd",
                    info: err,
                    });
            })
        }
    });
}
exports.user_del = (req, res, next) => {
    User.findByIdAndDelete(req.params.userId)
    .then(result => {
        res.status(200).json({ wiadomość: "Użytkownika usunięto "})
    })
    .catch((err) => {
        res.status(500).json({ 
            wiadomosc: "Błąd",
            info: err,
            });
    })
}
exports.user_login = (req, res, next) => {
    
    User.findOne({ email: req.body.email })
    .then(user => {
        
        if(!user) {
            res.status(401).json({ wiadomość: "Błąd autoryzacji"})
        }
        
        bcrypt.compare(req.body.password, user.password)
            .then((result) => {
                if (result) {
                    
                    const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id
                    }, 
                    process.env.JWT_PASS, 
                    { expiresIn: "2h"}
                    );
                    res.status(200).json({ 
                        wiadomość: "Zalogowano ",
                        token: token
                    });
                } else {
                    res.status(401).json({ wiadomość: "Błąd autoryzacji "})
                }
            })
            .catch( err => {
                res.status(401).json({ wiadomość: "Błąd autoryzacji "})
            })
    })
    .catch((err) => {
        res.status(500).json({ 
            wiadomosc: "Błąd",
            info: err,
            });
    })
}