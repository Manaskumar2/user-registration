const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose')
const route = require("./src/routes/route");
const app = express();
const path =  require('path');



const multer = require("multer");

app.use(express.json());
const upload = multer();
app.use(upload.any());

mongoose.set("strictQuery", true);
let mongoDbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const envPath = path.resolve(__dirname, '.env.production');

  dotenv.config({ path:envPath });


let DATABASE = process.env.DATABASE;
let PORT = process.env.PORT;

mongoose
  .connect(DATABASE, mongoDbConfig)
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));



app.use("/api", route);



app.use((req, res, next) => {
  const error = new Error("Path not found.");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send({
    error: {
      status: error.status || 500,
      message: error.message,
    },
  });
});

app.listen(process.env.PORT, function () {
  console.log(`Express app running on ${PORT}`);
});