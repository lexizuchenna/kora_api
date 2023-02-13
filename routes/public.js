const router = require("express").Router();

const { getHome } = require("../controllers/public");

router.route("/").get(getHome);

module.exports = router;
