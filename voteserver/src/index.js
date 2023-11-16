require('dotenv').config()
const express = require('express');
const cors = require('cors')
const router = require('./routers/index')
const fileUpload = require('express-fileupload')
const path = require("path");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors({
    origin: [ 'http://localhost:3001',   'http://localhost:3000',  'https://voteip.onrender.com',   'https://2v9vxd30-3000.euw.devtunnels.ms', 'https://api.repostuz.pp.ua', 'https://ip.repostuz.pp.ua','https://tg.repostuz.pp.ua','https://repostuz.pp.ua']
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

