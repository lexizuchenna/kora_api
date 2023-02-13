const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema(
  {
    account_reference: {
      type: String,
      required: true,
    },
    account_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    bank_name: {
      type: String,
      required: true,
    },
    bank_code: {
      type: String,
      required: true,
    },
    customer_email: {
      type: String,
      required: true,
    },
    customer_name: {
      type: String,
      required: true,
    },
    unique_id: {
      type: String,
      required: true,
    },
    kora_id: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Account = mongoose.model("Account", AccountSchema);

module.exports = Account;
