const mongoose = require("mongoose");

const soccerEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    rsvp: {
        type: String,
        enum: ['yes', 'no'],
    },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [soccerEventSchema]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
