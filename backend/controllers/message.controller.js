import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import AWS from 'aws-sdk';

// Initialize AWS Polly client
const Polly = new AWS.Polly();

// Initialize AWS S3 client
const s3 = new AWS.S3();

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        // Synthesize speech from message text using AWS Polly
        const pollyParams = {
            OutputFormat: 'mp3',
            Text: message,
            VoiceId: 'Joanna'
        };

        const pollyResult = await Polly.synthesizeSpeech(pollyParams).promise();
        const audioStream = pollyResult.AudioStream;

        // Generate filename with sender and receiver IDs
        const fileName = `audio_${senderId}_${receiverId}_${Date.now()}.mp3`;

        // Put the audio file into an S3 bucket (you can customize the bucket name)
        const bucketName = 'news-asduasda'; // Modify with your bucket name
        const s3Params = {
            Bucket: bucketName,
            Key: fileName,
            Body: audioStream
        };

        await s3.putObject(s3Params).promise();

        // Generate pre-signed URL for the audio file
        const signedUrlParams = {
            Bucket: bucketName,
            Key: fileName,
            Expires: 3600 // URL expiration time in seconds
        };

        const signedUrl = await s3.getSignedUrlPromise('getObject', signedUrlParams);
		console.log(`Pre-signed URL generated: ${signedUrl}`);

        // Create and save new message
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            audioUrl: signedUrl // Save pre-signed URL of audio file in message
        });

        conversation.messages.push(newMessage._id);
        await Promise.all([conversation.save(), newMessage.save()]);

        // Emit newMessage event
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);

        // Map messages to include pre-signed URL for audio file
        const messagesWithSignedUrl = conversation.messages.map(message => ({
            _id: message._id,
            senderId: message.senderId,
            receiverId: message.receiverId,
            message: message.message,
            audioUrl: message.audioUrl // Use pre-signed URL directly
        }));

        res.status(200).json(messagesWithSignedUrl);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


