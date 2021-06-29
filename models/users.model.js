const mongoose = require("mongoose");

let users = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true,
        //unique:true
    },
    LastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true,
        enum: ["artist", "designer", "manager"],

    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Users", users);