const router = require("express").Router();
const postRoutes = require("./post");
const userRoutes = require("./user");

router.route("/posts")
    .get(postRoutes.findAll)
    .post(postRoutes.create)

router.route("/posts/:id")
    .put(postRoutes.update)
    .delete(postRoutes.remove);

router.route("/posts/favorites/:id")
    .put(postRoutes.update)

router.route('/users')
    .post(userRoutes.create)
    .get(userRoutes.findOne)



module.exports = router;