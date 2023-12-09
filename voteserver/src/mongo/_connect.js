const mongoose = require('mongoose');
// const MONGO_URL = 'mongodb+srv://maxik:yk2ThGWe9zDYpTi9@cluster0.bzlptvl.mongodb.net/voteserver?retryWrites=true&w=majority';
const MONGO_URL = 'mongodb://127.0.0.1:27017/voteserver';

(async () => {
        mongoose.connection.once("open", () => {
            console.log("DB connected successfully");
        })
        await mongoose.connect(MONGO_URL).catch(e => {
            console.log('DB connecting error: ', e);
        })
    }
)()

module.exports = mongoose;
