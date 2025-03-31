const cheerio = require("cheerio");
const axios = require("axios");

const { geeksforgeeksURL, getHTML } = require("../utility");

const getUserInfo = async (req, res) => {
  const username = req.params.username;
  const geeksforgeeksUserProfileURL = `${geeksforgeeksURL}/user/${username}`;

  // Given below route is used to get the name of the user alone that's all
  const apiUrl = `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${username}`;
  /*
The response to the above route is as follows
{
    "message": "data retrieved successfully",
    "data": {
        "name": "Vishal Kumar Yadav",
        "profile_image_url": "https://media.geeksforgeeks.org/img-practice/user_web-1598433228.svg",
        "is_campus_ambassador": false,
        "created_date": "2022-03-07 18:31:56",
        "practice_course_visibility": true,
        "institute_name": "Vellore Institute of Technology",
        "organization_name": null,
        "institute_slug": null,
        "organization_slug": null,
        "campus_ambassador": null,
        "school": "",
        "designation": null,
        "score": 850,
        "monthly_score": 0,
        "total_problems_solved": 342,
        "institute_rank": "",
        "pod_solved_longest_streak": 0,
        "pod_solved_global_longest_streak": 1337
    }
}
  */

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;

    const html = await getHTML(geeksforgeeksUserProfileURL);
    const $ = cheerio.load(html);

    // Extracting university rank
    const universityRankText = $(".toolTip_tooltip_head__U3klv a span b")
      .text()
      .trim();
    const universityRank = universityRankText.match(/\d+/)?.[0] || "N/A";

    // Extracting coding score and problems solved
    const scoreCards = $(".scoreCards_head__G_uNQ").children(
      ".scoreCard_head__nxXR8"
    );

    const codingScore = $(scoreCards[0])
      .find(".scoreCard_head_left--score__oSi_x")
      .text()
      .trim();
    const problemsSolved = $(scoreCards[1])
      .find(".scoreCard_head_left--score__oSi_x")
      .text()
      .trim();

    return res.json({
      message: "User info fetched successfully!",
      name: data.data.name ? data.data.name : null,
      universityRank,
      codingScore,
      problemsSolved,
    });
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch user info." });
  }
};

module.exports = getUserInfo;
