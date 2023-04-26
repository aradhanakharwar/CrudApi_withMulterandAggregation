const express = require('express');
const router = require('./router/router');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/upload", express.static(path.join(__dirname, "Upload")));
app.use(express.static("upload"));

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "Upload");
    },
    filename: function (req, file, cb) {
      let ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    },
  });
  
  const fileFilter = (req, file, callback) => {
    if (
      file.mimetype.includes("png") ||
      file.mimetype.includes("jpg") ||
      file.mimetype.includes("jpeg") ||
      file.mimetype.includes("webp")
    ) {
      callback(null, true);
    } else {
      console.log("Error in uploading");
      callback(null, false);
    }
  };
  
  app.use(
    multer({
      storage: storage,
      fileFilter: fileFilter,
      limits: { fieldSize: 1024 * 1024 * 5 },
    }).single("image")
  );

app.use(router);

const port = 8080;

const DB = 'mongodb+srv://nodejs:p03oXNCar3nMuG4L@cluster0.qk0lgka.mongodb.net/crud_api_revision'

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port http://localhost:${port}`);
        })
    })
    .catch((error) => {
        console.log(error + 'Something went wrong while running the server');
    });