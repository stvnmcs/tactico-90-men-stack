const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const session = require('express-session');

const mongoose = require("mongoose");
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require('path');

app.use('/public', express.static(path.join(__dirname, 'public')));

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

//const isSignedIn = require("./middleware/is-signed-in.js");
//const passUserToView = require("./middleware/pass-user-to-views.js");


const authController = require("./controllers/auth.js");
const eventsController = require("./controllers/events.js");
app.use("/auth", authController);
//app.use(isSignedIn);
app.use('/users/:userId/events', eventsController);



//app.use(passUserToView);

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


app.get('/', (req, res) => {
    console.log(req.session.user)
    if (req.session.user) {
      res.redirect(`/users/${req.session.user.userId}/events`);
    } else {
      res.render('index.ejs');
    }
});

app.listen(port, () => {
  console.log(`The express app is jammin' on port ${port}!`);
});


