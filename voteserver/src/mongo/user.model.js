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
        default: ''
    },
    username: {
        type: String,
        default: ''
    },
    phone: {
        type: String, required: true
    },
    date: {type: Date}
}, {timestamps: true})

module.exports = db.model('User', schema)
