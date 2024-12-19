const axios = require("axios");
const Weather = require("../models/weatherModel");

const fetchWeatherData = async (cityName) => {
  try {
    const response = await axios.get(process.env.WEATHER_APP_URL, {
      params: {
        q: cityName,
        appid: process.env.API_KEY,
        units: "metric", // Temperature in Celsius
      },
    });

    return {
      id: response.data.id,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      city: response.data.name,
      date: new Date(),
      icon: response.data.weather[0].icon + ".png",
      coord: response.data.coord,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw new Error("Unable to fetch weather data");
  }
};

module.exports = { fetchWeatherData };
