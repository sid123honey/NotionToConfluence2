const Confluence = require("confluence-api");
const { Client } = require("@notionhq/client");

const configConfluence = {
  username: process.env.CONFLUENCE_USERNAME,
  password: process.env.CONFLUENCE_TOKEN,
  baseUrl: process.env.CONFLUENCE_URL,
};

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const confluence = new Confluence(configConfluence);

const isPageAvailable = {
  isPageOnNotion: async (req, res, next) => {
    try {
      const pageMetaData = await notion.pages.retrieve({
        page_id: req.body.inputid,
      });
      console.log(pageMetaData);
      req.title = pageMetaData.properties.title.id;

      if (pageMetaData.object == "page") next();
    } catch (err) {
      console.log(err);
    }
  },

  isPageOnConf: async (req, res, next) => {
    try {
      console.log(req.title);
      confluence.getContentByPageTitle(
        req.body.inputname,
        req.title,
        (err, data) => {
          console.log(data);

          if (err || data.results.length == 0) {
            next();
          }
        }
      );
    } catch (err) {
      console.log(err);
    }
  },
};

module.exports = isPageAvailable;
