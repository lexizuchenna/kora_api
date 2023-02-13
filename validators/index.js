const { check, validationResult } = require("express-validator");

module.exports = {
  validateRegistration: [
    check("first_name").notEmpty().withMessage("Enter name").trim(),
    check("last_name").notEmpty().withMessage("Enter name").trim(),
    check("username")
      .trim()
      .notEmpty()
      .withMessage("Enter User Name")
      .toLowerCase(),
    check("email").notEmpty().withMessage("Enter Email").trim().toLowerCase(),
    check("password")
      .notEmpty()
      .withMessage("Enter Password")
      .isLength({ min: 8 })
      .withMessage("Paswword must be up to Five"),
    check("phone_number").replace(/[-]/g, "").trim(),

    (req, res, next) => {
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).render("account/register", {
          layout: "account",
          errors: errors.array(),
        });
      }

      next();
    },
  ],
};
