require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const { PORT, MONGO_SERVER } = process.env;

app.use(require("./routes/users.route"));
app.use(require("./routes/comments.route"));

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_SERVER);
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(`Error on connecting ${err}`);
  }
};

startServer();
