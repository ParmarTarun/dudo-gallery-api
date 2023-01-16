const config = require("../config");
const { bucket, db } = require("../firebase");
const uploadImages = async (files) => {
    return new Promise((resolve, reject) => {
        console.log(`Uploading ${files.length} Images`);
        let urls = {};
        files.forEach((file, i) => {
            const [name, type] = file.originalname.split(".");
            const newFileName = `${name}_${Date.now()}.${type}`;
            const fileUpload = bucket.file(newFileName);

            const stream = fileUpload.createWriteStream({
                metadata: {
                    contentType: file.mimetype,
                },
            });
            stream.on("error", (error) => {
                console.log(error);
                reject("Something went wrong while uploading!");
            });
            stream.on("finish", async () => {
                console.log(`File no: ${i + 1} uploaded`);
                const url = await fileUpload.getSignedUrl({
                    action: "read",
                    expires: config.expiration,
                });
                urls[newFileName.split(".")[0]] = url[0];
                if (Object.keys(urls).length === files.length) {
                    console.log("Uploaded all files");
                    resolve(urls);
                }
            });
            stream.end(file.buffer);
        });
    });
};

const uploadLinks = async (urls, category) => {
    console.log(`Uploading ${Object.keys(urls).length} links for ${category}`);
    try {
        await db(category).push(urls);
    } catch (e) {
        console.log(e);
    }
    console.log("Uploaded");
};

const getLinks = async (category = "dummy") => {
    const snap = await db(category).once("value");
    const docs = snap.val();
    let links = {};
    if (docs) {
        Object.values(docs).forEach((doc) => {
            Object.entries(doc).forEach(([n, l]) => {
                links[n] = l;
            });
        });
    }
    return links;
};

module.exports = { uploadImages, uploadLinks, getLinks };
