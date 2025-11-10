import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: "Missing data" });

    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const { password: _, ...userData } = user._doc;
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: userData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist)
      return res.status(404).json({ success: false, message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, message: "Login successful", token, userExist });
  } catch (error) {
    console.log(error);
    res.send({ success: false, message: error.message });
  }
};


export const getUser = async (req, res) => {
  try {
    const myId = req.user.userId;

    const user = await User.findById(myId).select('-password');
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// UPDATE USER
export const update = async (req, res) => {
  try {
    const { name, email } = req.body;
    const image = req.file;
    const { userId } = req.user;

    const userExist = await User.findById(userId);
    if (!userExist)
      return res.status(400).json({ success: false, message: "User not found" });

    const updateData = {};
    let imageUrl = "";

    // Upload image from buffer
    if (image) {
      const bufferStream = Readable.from(image.buffer);
      const uploadImage = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (error) return reject(error);
          resolve(result);
        });
        bufferStream.pipe(stream);
      });
      imageUrl = uploadImage.secure_url;
    }

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (imageUrl) updateData.proPic = imageUrl;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
