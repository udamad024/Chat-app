import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    senderGender: {
        type: String,
        enum: ["male", "female"],
    },
    receiverGender: {
        type: String,
        enum: ["male", "female"],
    },
    message: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
    }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;
