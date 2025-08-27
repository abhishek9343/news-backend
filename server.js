

const express = require("express");
//const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 5000;

// your NewsAPI key
const API_KEY = "bbbe4fb4e5104054a4bd5636945eec33";

// allow frontend JS to call backend
app.use(cors());

// ✅ serve frontend (index.html, news.js, css, etc.)
//app.use(express.static("public"));

// ✅ backend route: fetch news from NewsAPI
app.get("/news", async (req, res) => {
  try {
    const query = req.query.q || "defence"; // default india if no query given
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`
    );
    const data = await response.json();
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

