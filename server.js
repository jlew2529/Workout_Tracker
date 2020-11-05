const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

// Set up the express app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));

// Set up the express app data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Set up MongoDB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Workout_Tracker",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
);

// Create the routes
require("./routes/api")(app);
require("./routes/html")(app);

// Start the server
app.listen(PORT, function() {
    console.log("App listening on Port ${PORT}!");
});