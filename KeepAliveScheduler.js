const cron = require("node-cron");

const axios = require("axios");

// Keep-Alive Cron Job (Every 14 Minutes)
const keepAliveJob = cron.schedule("*/14 * * * *", async () => {
  try {
    console.log("Pinging server to keep it awake...");
    await axios.get("https://geeksforgeeks-webscraper-api.onrender.com/");
    console.log("Server pinged successfully.");
  } catch (error) {
    console.error("Error in Keep-Alive Ping:", error.message);
  }
});

console.log("Keep-Alive Scheduler Initialized.");

// Export the cron job
module.exports = keepAliveJob;
