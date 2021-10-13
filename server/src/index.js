const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.send("Welcome to e-commerce app");
});

app.listen(port, () =>
    console.log("server is up and running in port :" + port),
);
