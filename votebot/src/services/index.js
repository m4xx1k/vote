const axios = require("axios");
const api = axios.create({
    baseURL: process.env.BACKEND_API_URL
});
module.exports ={api}

