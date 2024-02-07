require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const swagger = require("./utils/swagger");
const morgan = require("morgan");
const error = require("./middlewares/error");
const dbConfig = require("./config/db.config");

const app = express();

mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Not connected to database", err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/v1", routes);

swagger(app);

app.use(error.notFound);
app.use(error.handler);

app.use("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Test Backend",
  });
});

const PORT = process.env.NODE_DOCKER_PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
