const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const { engine } = require("express-handlebars");

const app = express();

// Connect to Data Base
const connectDB = require("./config/db");

// Passport
// require("./config/passport")(passport);

// Connect to MongoDB
// connectDB(process.env.MONGO_URI);

// Body Parser
app.use(express.urlencoded({ limit: "30mb", extended: false }));
app.use(express.json({ extended: true, limit: "30mb" }));



// Handlebars Helpers
const {} = require("./utils/helper/helper");

// Express-Handlbars Engine
app.engine(
  ".hbs",
  engine({
    defaultLayout: "public",
    extname: "hbs",
    // helpers: {  },
  })
);
app.set("view engine", ".hbs");

//Public Folder
app.use(express.static(path.join(__dirname, "public")));

// Express Session
// app.use(
//   session({
//     secret: process.env.SECRET,
//     resave: true,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGO_URI,
//     }),
//     cookie: {
//       maxAge: 18000000,
//     },
//   })
// );

// Flash
app.use(flash());

// Passport Initialization
// app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use("/", require("./routes/public"));
app.use("/user", require("./routes/user"));
app.use("/admin", require("./routes/admin"));
app.use("/accounts", require("./routes/account"));
app.use("/webhook", require("./routes/webhook"));

// Port listening
app.listen(process.env.PORT, () => {
  console.log(`App Started on PORT ${process.env.PORT}`);
});
