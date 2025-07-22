const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// routes
const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);

module.exports = app;
