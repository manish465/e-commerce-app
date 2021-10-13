const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { connectToDatabase } = require("../utils/mongodb");

dotenv.config();

exports.signUp = async (req, res) => {
    const { db } = await connectToDatabase();
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "add all fields" });
    }

    const user = await db.collection("users").findOne({ email });

    if (user) {
        return res.status(400).json({ msg: "user exists" });
    }
    hash_password = bcrypt.hashSync(password, 5);
    db.collection("users").insertOne(
        { email: email, password: hash_password },
        (err, result) => {
            if (err) {
                return res.status(400).json({ msg: "somthing went wrong" });
            }
            return res
                .status(200)
                .json({ msg: "sign up completed successfully" });
        },
    );
};

exports.logIn = async (req, res) => {
    const { db } = await connectToDatabase();
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "add all fields" });
    }

    const user = await db.collection("users").findOne({ email });

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
};
