const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5123;

app.use(express.json());

// INSTRUCTION: setup cors

app.use(cors());

// INSTRUCTION: setup MongoDB Connection

mongoose
    .connect("mongodb://127.0.0.1:27017/jobboard")
    .then(() => console.log("Connected To MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use("/employers", require("./routes/employer"));
app.use("/jobs", require("./routes/job"));
app.use("/applications", require("./routes/application"));

// INSTRUCTION: setup routes

app.get("/", (req, res) => {
    res.send("Good luck with the exam!");
});

// Server listening
app.listen(port, () => console.log(`Server started on port ${port}`));
