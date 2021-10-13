const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8000;
dotenv.config();

app.use(cors());
app.use(express.json());

const userRouter = require("./routers/users");
const productRouter = require("./routers/product");

app.get("/", (_req, res) => {
    res.json({ msg: "welcome to e-comm app" });
});

app.use("/api/user", userRouter);
app.use("/api/products", productRouter);

app.listen(port, () => console.log("Connected to server at port : " + port));
