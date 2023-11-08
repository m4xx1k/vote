const db = require('./_connect')

const schema = new db.Schema({
    order: {
        type: Number,
        // unique: true
    },
    ru: {
        name: {
            type: String,
            required: true
        }
    },
    uz: {
        name: {
            type: String,
            required: true
        }
    }

})

module.exports = db.model('Nomination', schema)
