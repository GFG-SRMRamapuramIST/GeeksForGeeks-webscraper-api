const express = require("express");

// Importing APIs Functions
const { getUserInfo, getPOD } = require("../controllers");

const router = new express.Router();

// API Routes Description
router.get("/", (req, res) => {
  const apiDetails = [
    {
      route: "/api/info/:username",
      method: "GET",
      description: "Fetches user information from GeeksForGeeks by username.",
    },
    {
      route: "/api/pod",
      method: "GET",
      description: "Fetches the Problem of the Day from GeeksForGeeks website.",
    },
  ];

  res.json({
    message: "Welcome to the GeeksForGeeks API!",
    availableRoutes: apiDetails,
  });
});

// User Info
router.get("/api/info/:username", getUserInfo);

// Problem of the Day
router.get("/api/pod", getPOD);

module.exports = router;
