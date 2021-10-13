const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

app.use(cors());
app.use(express.json());

const userRouter = require("./routers/users");

app.get("/", (_req, res) => {
    res.send("Welcome to e-commerce app");
});

app.use("/api/user", userRouter);

mongoose.connect(process.env.DB_URI, (err) => {
    err
        ? console.log("Something went wrong")
        : app.listen(port, () => console.log("Connected to db & server"));
});
