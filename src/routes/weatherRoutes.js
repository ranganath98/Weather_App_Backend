const express = require("express");
const { fetchWeatherData } = require("../services/weatherService");
const Weather = require("../models/weatherModel");
const router = express.Router();

// Fetch current weather
router.get("/current/:city", async (req, res) => {
  const { city } = req.params;

  try {
    const weather = await fetchWeatherData(city);

    weather.units = "celsius";
    // Save to database
    const newWeather = new Weather(weather);
    await newWeather.save();

    res.status(200).json(newWeather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get historical weather data
router.get("/history", async (req, res) => {
  const { city, from, to } = req.query;

  try {
    const fromDate = new Date(from);
    fromDate.setHours(0, 0, 0, 0); // Start of the day: 00:00:00.000

    const toDate = new Date(to);
    toDate.setHours(23, 59, 59, 999); // End of the day: 23:59:59.999

    const query = {
      city: city.toLowerCase(),
      date: { $gte: fromDate, $lte: toDate },
    };

    const history = await Weather.find(query);

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
