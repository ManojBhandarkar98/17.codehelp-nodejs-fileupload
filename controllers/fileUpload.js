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
        console.log(err)
    }
}