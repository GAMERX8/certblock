const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
