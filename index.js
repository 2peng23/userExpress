const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./router");

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
  console.log("App is running on port 3000");
});

// user
app.use("/api/user", routes.userRoute);

// guest
app.use("/api", routes.guestRoute);
