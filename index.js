require("dotenv").config();

const express = require("express");
const cors = require("cors");

const router = require("./routers/scraperRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Keep-Alive Ping
require("./KeepAliveScheduler");

// Scraper Routes
app.use(router);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
