const router = require("express").Router();
const passport = require("passport");

const { getHome } = require("../controllers/user");

// Login
  

// Logout
router.route("/logout").get();

router.route("/dashboard").get(getHome)

module.exports = router;
