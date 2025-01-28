const cloudinary = require("cloudinary").v2;
const File = require("../models/File");

//localFileUpload -> handler function
exports.localFileUpload = async (req, res) => {
    try {
        //fetch file
        const file = req.files.file;
        console.log("File aagyi jee", file);

        //where to save, decide path
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.'[1])}`;
        console.log("PATH-> ", path);

        //upload fun
        file.mv(path, (err) => { console.log(err) });

        res.json({
            success: true,
            message: "Loacal file upload successfully"
        })
    } catch (err) {
        console.log(err);
        console.log('Not able to upload the file on server')
    }
}

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    console.log("temp file path", file.tempFilePath);
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

//image upload handler
exports.imageUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log(file);

        //validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        //current file type extract extension
        const fileType = file.name.split('.')[1].toLowerCase();
        //if file format not support
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported'
            })
        }
        //if file format supported
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //insert into DB
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url
        })

        res.json({
            sucess: true,
            imageUrl: response.secure_url,
            message: 'Image Successfully uploaded'
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}

//video upload ka handler
exports.videoUpload = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type:", fileType);

        //TODO: add a upper limit of 5MB for Video
        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format not supported',
            })
        }

        //file format supported hai
        console.log("Uploading to Codehelp");
        const response = await uploadFileToCloudinary(file, "Codehelp");
        console.log(response);

        //db me entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Video Successfully Uploaded',
        })

    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: 'Something went wrong',
        })
    }
}
