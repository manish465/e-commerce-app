const { Schema, model } = require("mongoose");

const userScema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = model("Users", userScema);
