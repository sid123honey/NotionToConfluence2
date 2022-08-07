const Confluence = require("confluence-api");
const { Client } = require("@notionhq/client");

//Importing Functions
const { createPage } = require("../functions/notion");

const configConfluence = {
  username: process.env.CONFLUENCE_USERNAME,
  password: process.env.CONFLUENCE_TOKEN,
  baseUrl: process.env.CONFLUENCE_URL,
};

//Importing Notion
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const confluence = new Confluence(configConfluence);

exports.sendPage2Confluence = async (req, res, next) => {
  try {
    const { inputid, inputname } = req.body;

    console.log("Trying to Finding The Page MetaData . . . . . .");
    const title = req.title;
    console.log(title);
    console.log("Got the Metadata . . .");

    console.log("Requesting for Page Blocks . . . ");
    console.log(inputid);
    const pageBlocks = await notion.blocks.children.list({
      block_id: inputid,
    });
    console.log(pageBlocks);

    console.log("Recreating Page . . . . ");
    const page = await createPage(pageBlocks.results);
    console.log(
      "==============================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",
      page
    );

    console.log("Started Sending Data to Confluence .. ..");

    confluence.postContent(inputname, title, page, null, function (err, data) {
     
      if (data && data.status != 400) {
        console.log("here");
        res.status(200);
      } else {
        console.log("here1");
        console.log(err);
        res.status(404);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
