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
        const fileType = file.name.split('.'[1]).toLowerCase();
        //if file format not support
        if (!isFileTypeSupported(type, supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            })
        }

    } catch (err) {
        res.status(400).json({
            success: false,
            message: 'Something went wrong'
        })
    }
}