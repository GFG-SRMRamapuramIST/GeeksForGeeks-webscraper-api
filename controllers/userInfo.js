const cheerio = require("cheerio");
const { geeksforgeeksURL, getHTML } = require("../utility");

const getUserInfo = async (req, res) => {
  const username = req.params.username;
  const geeksforgeeksUserProfileURL = `${geeksforgeeksURL}/user/${username}`;

  try {
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
