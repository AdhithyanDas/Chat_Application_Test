const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatRoom',
        required: true
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

messageSchema.index({ roomId: 1, timestamp: 1 })

const Message = mongoose.model("messages", messageSchema)

module.exports = Message