const express = require('express');
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 3000;

//fileupload middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload());

//db connect
const db = require("./config/database");
db();

//connect to cloudinary 
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//get route required to mount
const Upload = require("./routes/FileUpload");
//route mount
app.use("/api/v1/upload", Upload);

//activate server
app.listen(PORT, () => {
    console.log(`app is running at port no ${PORT}`);
})