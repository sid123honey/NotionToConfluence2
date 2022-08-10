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
      console.log("Page meta data ----------->", pageMetaData);
      //req.title = pageMetaData.properties.title.id;
      // retrieve page property item to get title

      const titleData = await notion.pages.properties.retrieve({
        page_id: req.body.inputid,
        property_id: pageMetaData.properties.title.id,
      });
      console.log(titleData.results[0].title.text.content);
      req.title = titleData.results[0].title.text.content;

      if (pageMetaData.object == "page") next();
    } catch (err) {
      console.log(err);
    }
  },

  isPageOnConf: async (req, res, next) => {
    try {
      console.log(req);
      confluence.getContentByPageTitle(
        req.body.inputname,
        req.title,
        (err, data) => {
          console.log(data);

          if (err || data.results.length == 0) {
            console.log("->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>hello");
            next();
          }
        }
      );
    } catch (err) {
      // console.log(err);
    }
  },
};

module.exports = isPageAvailable;
