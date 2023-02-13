const bcryptjs = require("bcryptjs");
const crypto = require("crypto");
const request = require("request");
const path = require("path");

const User = require("../models/User");
const Account = require("../models/Account");

let layout = "account";

module.exports = {
  getRegister: async (req, res) => {
    let success = req.flash("success");
    let errors = req.flash("errors");
    try {
      return res.status(500).render("account/register", {
        layout,
        errors,
        success,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
  createAccount: async (req, res) => {
    const success = req.flash("success");
    const errors = req.flash("errors");
    try {
      const { first_name, last_name, email, password, username, phone_number } =
        req.body;

      const uid = crypto.randomUUID().split("-")[0];

      const salt = await bcryptjs.genSalt(10);
      const hashedPwd = await bcryptjs.hash(password, salt);

      const existingUser = await User.findOne({ username });
      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
        req.flash("errors", "Email Exists");
        return res.status(400).redirect("/accounts/create-account");
      }
      if (existingUser) {
        req.flash("errors", "Username Exists");
        return res.status(400).redirect("/accounts/create-account");
      }

      const body = JSON.stringify({
        account_name: first_name + last_name,
        account_reference: uid,
        permanent: true,
        bank_code: "035",
        customer: {
          name: first_name + last_name,
          email,
        },
      });

      const options = {
        method: "POST",
        url: `${process.env.BASE_URL}/merchant/api/v1/virtual-bank-account`,
        headers: {
          Authorization: `Bearer ${process.env.KEY}`,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        body,
      };

      request(options, async function (error, response) {
        if (error) {
          return res.status(500).render("error/500");
        }

        const data = JSON.parse(response.body);

        if (data.status === true) {
          const newUser = await User.create({
            first_name,
            last_name,
            username,
            email,
            phone_number: phone_number.replace(/[-]/g, ""),
            password: hashedPwd,
          });
          const newAccount = await Account.create({
            account_reference: data.data.account_reference,
            account_name: data.data.account_name,
            bank_code: data.data.bank_code,
            bank_name: data.data.bank_name,
            customer_name: data.data.customer.name,
            customer_email: data.data.customer.email,
            account_number: data.data.account_number,
            unique_id: data.data.unique_id,
            kora_id: data.data.id,
          });

          newUser.save();
          newAccount.save();
          
          req.flash("success", ["Account Created", "Login to your account below"]);
          return res.status(201).redirect("/accounts/login");
        } else {
          console.log(data);
          return res.status(500).render("error/500");
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
  getReset: async (req, res) => {
    const success = req.flash("success");
    const errors = req.flash("errors");
    try {
      return res.status(500).render("account/reset", {
        layout,
        errors,
        success,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
  getLogin: async (req, res) => {
    req.flash("success", ["Account Created", "Login to your account below"])
    const success = req.flash("success");
    const errors = req.flash("errors");
    try {
      return res.status(500).render("account/login", {
        layout,
        success,
        errors,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
  getForgotPassword: async (req, res) => {
    try {
      return res.status(500).render("account/forgot_password", {
        layout,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).render("error/500");
    }
  },
};
