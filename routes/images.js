const config = require("../config");
const express = require("express");
const router = express.Router();
const Multer = require("multer");
const { uploadImages, uploadLinks, getLinks } = require("../controller/images");

const mStorage = Multer.memoryStorage();
const processImages = Multer({ storage: mStorage }).array("images");

const _validateImageFiles = (files) => {
    let isValid = true;
    files.forEach((file) => {
        if (!config.suppoprtedImageTypes.includes(file.mimetype))
            isValid = false;
    });
    return isValid;
};

router.post("/", processImages, async (req, res) => {
    const { category } = req.query;
    let files = req.files;
    if (!files.length)
        return res
            .status(400)
            .json({ message: "Please provide files to store" });

    if (!_validateImageFiles(files))
        return res.status(400).json({ message: "Invalid image files" });

    try {
        const urls = await uploadImages(files);
        await uploadLinks(urls, category);
        return res.json({ message: "success", data: urls });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong" });
    }
});

router.get("/", async (req, res) => {
    const { category } = req.query;

    const links = await getLinks(category);
    return res.json({ message: "success", data: links });
});

module.exports = router;
