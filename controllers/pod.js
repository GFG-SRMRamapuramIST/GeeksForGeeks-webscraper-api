const axios = require("axios");

const getPOD = async (req, res) => {
  const apiUrl =
    "https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/";

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (!data || !data.problem_name) {
      return res.status(500).json({ error: "Failed to fetch POD data." });
    }

    return res.json({
      message: "Problem of the day fetched successfully!",
      problemName: data.problem_name,
      problemURL: data.problem_url,
      difficulty: data.difficulty,
      companyTags: data.tags.company_tags || [],
      topicTags: data.tags.topic_tags || [],
      accuracy: data.accuracy,
    });
  } catch (err) {
    console.error("Error fetching the API:", err.message);
    res.status(500).json({ error: "Failed to fetch POD." });
  }
};

module.exports = getPOD;
