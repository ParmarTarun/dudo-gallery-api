require("dotenv").config();

module.exports = {
    // server configs
    port: process.env.PORT,
    // firebase config
    db_url: process.env.DB_URL,
    bucket_name: process.env.BUCKET_NAME,
    serviceAccountKeys: {
        type: "service_account",
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_id: process.env.CLIENT_ID,
        auth_uri: process.env.AUTH_URI,
        token_uri: process.env.TOKEN_URI,
        auth_provider_x509_cert_url: process.env.AUTH_CERT_URL,
        client_x509_cert_url: process.env.CLIENT_CERT_URL,
    },
    // files config
    expiration: process.env.PUBLIC_URL_EXPIRATION,
    suppoprtedImageTypes: ["image/jpeg", "image/png"],
};
