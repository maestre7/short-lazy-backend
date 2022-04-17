
const Url = require("../models/Url");

async function getShortUrl(req, res) {
    try {
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            url.clicks++;
            url.save();
            res.json({'shortUrl':url.origUrl});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        res.status(500).json("Server Error");
    }
}

module.exports = getShortUrl;