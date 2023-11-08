const db = require('./_connect')

const schema = new db.Schema({
    order: {
        type: Number, required: true, default: 0
    },
    photo: {
        type: String,
        required: true
    },
    nomination: {
        type: db.Schema.ObjectId,
        ref: 'Nomination',
        required: true,
        index:true
    },

    uz: {
        name: {type: String, required: true},
        description: {type: String, default: ''}
    },
    ru: {
        name: {type: String, required: true},
        description: {type: String, default: ''}
    }
})

module.exports = db.model('Candidate', schema)
