const express = require("express");
const app = express();
const genres = require("./routes/genres");
const home = require("./routes/home");

//converts the json to req.body
app.use(express.json());
app.use("/", home);
app.use("/api/genres", genres);

app.listen(3000);
