const db = require("../models/model")


const sequelize = db.sequelize;
const jwt = require('jsonwebtoken');
const users = db.users;
const bcrypt = require('bcrypt');
const Models = require('../models/users.model');
const User = Models.user
const { validationResult } = require("express-validator");
module.exports = {

    createUser: (req, res) => {
        password = req.body.Password;
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt)

        let user = { Name: req.body.Name, Mobile: req.body.Mobile, Email: req.body.Email, Password: hashpassword };
        users
            .create(user)
            .then((users) => {
                res.send(users);
            })
            .catch((err) => {
                res.send(err);
            });
    },
    loginUser: (req, res) => {
        let email = req.body.Email
        const user = users.findOne({ where: { Email: email } }).then((result) => {

            const password_valid = bcrypt.compareSync(req.body.Password, result.Password);

            if (password_valid) {
                let token = jwt.sign({ id: result.id, Email: result.Email }, "secretKey", { algorithm: "HS256", expiresIn: "1h" });
                res.send({ token: token, message: "user logged in" });

            } else {
                res.send({ error: "Password Incorrect" });
            }
        }).catch((err) => {
            res.send({ error: true, message: "user doesnt exist" });
        });
    },

};