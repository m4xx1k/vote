require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routers/index')
const fileUpload = require('express-fileupload')
const path = require("path");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 5001

app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001', 'https://2v9vxd30-8080.euw.devtunnels.ms/', 'http://localhost:8080', 'http://localhost:3000', 'http://localhost:5174', 'https://admin.goodjoy.uz', 'https://voteip.onrender.com', 'https://votebot.onrender.com', 'https://goodjoy.uz']
}))
app.use(express.static(path.join(__dirname, '..', '/photos/candidates')));

app.use('/', router)

app.use(fileUpload({
    createParentPath: true
}))
app.use(morgan('dev'))

function start() {
    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    })
}

start();

