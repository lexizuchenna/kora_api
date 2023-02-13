const router = require("express").Router();
const passport = require("passport")

const {
  getRegister,
  getReset,
  getLogin,
  getForgotPassword,
  createAccount,
} = require("../controllers/account");
const { validateRegistration } = require("../validators");

router
  .route("/create-account")
  .get(getRegister)
  .post(validateRegistration, createAccount);

router
  .route("/login")
  .get(getLogin)
  .post(
    passport.authenticate("local", {
      failureMessage: true,
      failureRedirect: "/users/login",
    }),
    (req, res) => {
      if (req.user.role !== "admin") {
        return res.status(301).redirect("/admin/dashboard");
      }

      return res.status(301).redirect("/users/dashboard");
    }
  );
router.route("/forgot-password").get(getForgotPassword);
router.route("/reset").get(getReset);

module.exports = router;
