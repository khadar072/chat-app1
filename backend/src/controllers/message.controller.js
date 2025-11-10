// import { gerReciverSocketId } from "../config/socket.io.js";
import { getScoketMessageId, io } from "../config/socket.io.js";
import Messages from "../models/message.model.js";
import User from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";

// ✅ Get all users except logged-in user
export const getUsers = async (req, res) => {
    try {
        const loggedUserId = req.user.userId;

        const users = await User.find({ _id: { $ne: loggedUserId } }).select(
            "-password"
        );

        return res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get all messages between logged-in user and another user
export const getMessages = async (req, res) => {
    try {
        const { id: userToChat } = req.params;
        const myId = req.user.userId;

        const messages = await Messages.find({
            $or: [
                { senderId: myId, receiverId: userToChat },
                { senderId: userToChat, receiverId: myId },
            ],
        }).sort({ createdAt: 1 }); // oldest → newest

        return res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Send a message
export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.userId;

        let imageUrl = "";
        if (image) {
            const uploadImage = await cloudinary.uploader.upload(image);
            imageUrl = uploadImage.secure_url;
        }

        const newMessage = new Messages({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        const recivedSocketId = getScoketMessageId(receiverId);

        if (recivedSocketId) {
            io.to(recivedSocketId).emit('newMessage',newMessage)
        }


        return res.status(200).json({
            success: true,
            message: newMessage,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
