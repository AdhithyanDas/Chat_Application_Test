const mongoose = require('mongoose')

const chatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const chatRoom = mongoose.model('chatRooms', chatRoomSchema)

module.exports = chatRoom