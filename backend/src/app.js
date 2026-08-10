const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {

    res.json({
        success: true,
        message: "Welcome to Royal Vision API 🚀"
    });

});

module.exports = app;