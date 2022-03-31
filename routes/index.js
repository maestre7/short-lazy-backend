const router = require("express").Router();

router.post("/short", require("../controllers/postUrl"));
router.get("/:urlId", require("../controllers/getShortUrl"));

module.exports = router;