require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./models/db");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connect to database
connectDB();

// Routes
app.use("/api/v1/weather", weatherRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
