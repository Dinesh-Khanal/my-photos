const express = require("express");
const cors = require("./cors");
const cloudinary = require("./cloudinary");
//const fileupload = require("express-fileupload"); //require only to post from postman

const app = express();
app.use(cors);

//app.use(fileupload({ useTempFiles: true })); //require only to post from postman
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:my_Photos/*")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});
app.post("/api/upload", async (req, res, next) => {
  try {
    const fileStr = req.body.data;
    //const fileStr = req.files.file; //require only to post from postman
    const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "my_Photos",
      use_filename: true,
    });
    //console.log(uploadedResponse);
    res.json({ msg: "Wow! photo uploaded" });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`The server is up and running at port ${PORT}`);
});
