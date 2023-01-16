require("dotenv").config();

module.exports = {
    // server configs
    port: process.env.PORT,
    // firebase config
    db_url: process.env.DB_URL,
    bucket_name: process.env.BUCKET_NAME,

    // files config
    expiration: process.env.PUBLIC_URL_EXPIRATION,
    suppoprtedImageTypes: ["image/jpeg", "image/png"],
};
