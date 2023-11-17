const db = require('./_connect')

const schema = new db.Schema({
    user: {
        type: db.Schema.ObjectId, ref: "User",
        required: true, index: true
    },
    nomination: {
        type: db.Schema.ObjectId,
        ref: 'Nomination',
        required: true, index: true
    },
    candidate: {
        type: db.Schema.ObjectId,
        ref: 'Candidate',
        required: true, index: true
    }
}, {timestamps: true})

module.exports = db.model('VoteNeutral', schema)
