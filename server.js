const express = require("express");
//const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// your NewsAPI key
//require("dotenv").config({ path: __dirname + "/.env" });
require('dotenv').config();
const API_KEY = process.env.NEWS_API_KEY;

console.log("Loaded API_KEY from env:", API_KEY);
// allow frontend JS to call backend
app.use(cors());


// ✅ backend route: fetch news from NewsAPI
app.get("/news", async (req, res) => {
  try {
    const query = req.query.q ||"defence"; // default india if no query given

    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
    //console.log(data)
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

