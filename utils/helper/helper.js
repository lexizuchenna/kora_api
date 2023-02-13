const moment = require("moment");

module.exports = {
  formatDate: (input) => {
    return moment(input, "Do MMM YYYY", true).format("Do MMM YYYY");
  },
};
