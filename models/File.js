const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    }
});

//Post middleware
fileSchema.post("save", async function (doc) {
    try {
        console.log("doc", doc);

        //define transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        //mail send
        let info = await transporter.sendMail({
            from: 'Codehelp',
            to: doc.email,
            subject: "New file upload on cloudinary",
            html: `<h1>Hello Jee,</h1> <p>File Uploaded View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p> `
        });

        console.log("Info: ", info);

    } catch (err) {
        console.log(err);
    }
})



const File = mongoose.model("File", fileSchema);
module.exports = File;