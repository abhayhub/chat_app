const mongoose = require('mongoose');


//setting up schema for one to one chat
const chatSchema = new mongoose.Schema({
    content: {
        type: String,
    },
    user: {
        type: String,
    },
    roomId: {
        type: String
    }
});

const Chat = mongoose.model('Chat',chatSchema);
module.exports =  Chat;