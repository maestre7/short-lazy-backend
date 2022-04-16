
const Url = require("../models/Url");

async function getShortUrl(req, res) {
    try {
        console.log('req.params.urlId',req.params.urlId);
        const url = await Url.findOne({ urlId: req.params.urlId });
        if (url) {
            url.clicks++;
            url.save();
            console.log('url.origUrl ok:',url.origUrl);
            /* return res.redirect(url.origUrl); // problemas de cors */
            res.json({'shortUrl':url.origUrl});
        } else {
            res.status(404).json("Not found");
        }
    } catch (err) {
        console.log('err',err);
        res.status(500).json("Server Error");
    }
}

module.exports = getShortUrl;