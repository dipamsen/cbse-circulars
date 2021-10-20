const axios = require("axios").default;
const cheerio = require("cheerio");

const BASE_URL = "http://www.cbseacademic.nic.in/";

async function loadPage(url) {
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);
  return $;
}

function HomePage() {
  return loadPage(BASE_URL);
}

async function AcademicCirculars() {
  const $ = await HomePage();
  return $("#tab1_ans p a")
    .toArray()
    .map((x) => ({
      name: x.children[0].data,
      url: BASE_URL + x.attribs["href"],
    }));
}

async function ExamCirculars() {
  const $ = await loadPage(
    "https://www.cbse.gov.in/cbsenew/examination_Circular.html"
  );
  return $("table")
    .first()
    .children()
    .children()
    .toArray()
    .map((x) =>
      "children" in x
        ? {
            date: x.children[0].children?.[0]?.data,
            name: x.children[1].children[0].data,
            html: cheerio
              .load($(x.children[2].children).parent().html() || "")("a")
              .attr("href", (_, w) => `https://cbse.gov.in/cbsenew/${w}`)
              .parent()
              .html(),
          }
        : null
    )
    .slice(1);
  //    "#fontSize > div.courses-page.page-wrapper > div > div.container > div:nth-child(2) > div > table > tr"
  //    .map((x) => ({ name: x.children[2] }));
}

module.exports = {
  HomePage,
  AcademicCirculars,
  ExamCirculars,
};
