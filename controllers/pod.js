const cheerio = require("cheerio");
const { geeksforgeeksURL, getHTMLusingPlaywright } = require("../utility");

const getPOD = async (req, res) => {
  const geeksforgeeksUserProfileURL = `${geeksforgeeksURL}/problem-of-the-day`;

  try {
    const html = await getHTMLusingPlaywright(geeksforgeeksUserProfileURL);
    const $ = cheerio.load(html);

    // Select the parent container
    const parentContainer = $(".problemOfTheDay_potd_banner__0FA1E");

    // If the container does not exist, return an error
    if (!parentContainer.length) {
      return res.status(500).json({ error: "POTD section not found." });
    }

    // Extract problem name (fixing repetition issue)
    const problemName = parentContainer
      .find(".problemOfTheDay_problemContainerTxt__pPZ3Z")
      .first()
      .text()
      .trim();

    // Extract company names (check if the class exists)
    const companyNames = [];
    parentContainer
      .find(".problemOfTheDay_problemCompanies__L8L0S")
      .each((i, elem) => {
        companyNames.push($(elem).text().trim());
      });

    // Extract question link
    const questionLink =
      parentContainer
        .find(".problemOfTheDay_problemContainer__BmMDm a")
        .attr("href") || "";

    // Extract difficulty, submissions, and accuracy
    const details = parentContainer.find(
      ".problemOfTheDay_problemDescription__ebnoz span"
    );
    const difficulty = $(details[0]).text().trim();
    const submissions = $(details[1]).text().trim();
    const accuracy = $(details[2]).text().trim();

    return res.json({
      message: "Problem of the day fetched successfully!",
      problemName,
      companies: companyNames,
      questionLink,
      difficulty,
      submissions,
      accuracy,
    });
  } catch (err) {
    console.error("Error scraping the page:", err.message);
    res.status(500).json({ error: "Failed to fetch POD." });
  }
};

module.exports = getPOD;
