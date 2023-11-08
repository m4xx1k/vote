const db = require('./_connect')

const schema = new db.Schema({

    tg_id: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    ip: {
        type: String,
        required: true
    },
    username: {
        type: String,
        default: ''
    },
    phone: {
        type: String, required: true
    }
}, {timestamps: true})

module.exports = db.model('User', schema)
