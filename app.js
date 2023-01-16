const config = require("./config");
const cors = require("cors");
const express = require("express");
const images = require("./routes/images");

const app = express();
app.use(cors());
app.use("/images", images);

app.get("/", async (req, res) => {
    return res.json({ message: "success" });
});

const port = config.port;
app.listen(port, () => {
    console.log(`App listening to port ${port}`);
});
