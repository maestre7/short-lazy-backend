
const shortid = require("shortid");
const validUrl = require("valid-url");
require("dotenv").config({ path: "../config/.env" });

const Url = require("../models/Url");

// Short URL Generator
async function postUrl(req, res) {
    /* original url and calling web url */
    const { origUrl, callUrl } = req.body;
  
    // if valid, we create the url code
    const urlId = shortid.generate();
    // check long url if valid using the validUrl.isUri method
    if (validUrl.isUri(origUrl)) {
        try {
            let url = await Url.findOne({ origUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = `${callUrl}/${urlId}`;
                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            res.status(500).json("Server Error");
        }
    } else {
        res.status(400).json("Invalid Original Url");
    }
}
  
module.exports = postUrl;