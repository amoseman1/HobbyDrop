const db = require("../../models");
const mongoose = require('mongoose');

//acting as our controller
module.exports = {

    create: function (req, res) {
        db.User
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    findOne: function (req, res) {
        db.User
            .findOne(req.body).populate('userFavorites userPosts')
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    }
}