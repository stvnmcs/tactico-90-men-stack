const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require('express-session');

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");

const port = process.env.PORT ? process.env.PORT : "3000";

app.use(methodOverride("_method"));
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    })
);


const authController = require("./controllers/auth.js");
app.use("/auth", authController);


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.get("/" , (req, res) => {
    res.render("index.ejs", {
        user: req.session.user,
    });
});

app.listen(port, () => {
  console.log(`The express app is jammin' on port ${port}!`);
});
