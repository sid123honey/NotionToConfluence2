const express = require("express");
const router = express.Router();

const checkPage = require("../middleware/isPageAvailable");
const mainController = require("../controller/main");
router.post(
  "/n2c",
  checkPage.isPageOnNotion,
  checkPage.isPageOnConf,
  mainController.sendPage2Confluence
);

module.exports = router;
