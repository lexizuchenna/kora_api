const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = async (mongoUri) => {
  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
