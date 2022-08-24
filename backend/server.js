const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// bringing routes
const userRoute = require("./routes/user");

// databases

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
  });

app.use(express.json());
// cors
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use("/api/user", userRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
