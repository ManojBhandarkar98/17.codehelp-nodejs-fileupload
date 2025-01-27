const mongoose = require('mongoose');

require("dotenv").config();

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => console.log('DB connection Successful...'))
        .catch((error) => {
            console.log('DB issue in connction');
            console.error(error);
            process.exit(1);
        })
}
module.exports = connect;