const config = require("./config");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: config.db_url,
});

const storage = admin.storage();

const db = (category) => admin.database().ref("/data/" + category);
const bucket = storage.bucket(config.bucket_name);

module.exports = { bucket, db };
