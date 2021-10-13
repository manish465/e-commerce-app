const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Users = require("../models/userModel");

dotenv.config();

exports.signUp = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "add all fields" });
    }

    Users.findOne({ email }).then((user) => {
        if (user) {
            return res.status(400).json({ msg: "user exists" });
        }
        hash_password = bcrypt.hashSync(password, 20);
        const _user = new Users({ email, password: hash_password });
        _user
            .save()
            .then(() => {
                return res.status(200).json({ msg: "sign up successful" });
            })
            .catch((err) => {
                return res.status(400).json({ msg: err.message });
            });
    });
};

exports.logIn = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "add all fields" });
    }

    Users.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(400).json({ msg: "user not found" });
        }
        bcrypt
            .compare(password, user.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign(
                        { _id: user._id },
                        process.env.JWT_SECRET,
                    );
                    user.password = undefined;
                    return res.status(200).json({ token, user });
                }
                return res.status(400).json({ msg: "Invalid Input" });
            })
            .catch((err) => console.log(err));
    });
};
