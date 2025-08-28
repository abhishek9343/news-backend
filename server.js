const express = require("express");
//const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

// your NewsAPI key
require('dotenv').config();
const API_KEY = process.env.NEWS_API_KEY;
// allow frontend JS to call backend
app.use(cors());

//console.log("API_KEY:",API_KEY);

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

