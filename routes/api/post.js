const db = require("../../models");

//acting as our controller
module.exports = {
    findAll: function (req, res) {
        db.Post
            .find({})
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    create: function (req, res) {
        db.Post
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    update: function (req, res) {
        db.Post              //   conditions   ,  update
            .findOneAndUpdate({ _id: req.params.id }, {
                $set: req.body
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    remove: function (req, res) {
        db.Post
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(500).json(err));
    },
    update: function (req, res) {
        console.log(req.body)
        const userId = mongoose.Types.ObjectId(req.body.userId)
        db.User              //   conditions   ,  update
            .findOneAndUpdate({ _id: userId }, {
                //push -we are pushing to array, set- replaces
                //favorites - array we are pushing to in the model, and req.body.id, the user id so we can filkter by that
                $push: { userFavorites: req.params.id }
            })
            .then(dbModel => res.json(dbModel))
            .catch(err => console.log(err))
        //res.status(500).json(err));
    }
}