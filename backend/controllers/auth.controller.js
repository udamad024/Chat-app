import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN // Add session token here
});

const s3 = new AWS.S3(); // Add S3 client

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profilePicUrl = ""; // Initialize profile pic URL

    if (req.file) {
      const uniqueKey = `${username}-${Date.now()}-${req.file.originalname.replace(/\s+/g, '-')}`;
      const params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: uniqueKey, // Use the unique key
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
        ACL: 'public-read', // Make the uploaded file publicly readable
      };

      try {
        const uploadResult = await s3.upload(params).promise();
        profilePicUrl = uploadResult.Location; // URL of the uploaded file
        console.log("Profile picture uploaded to S3:", profilePicUrl);
      } catch (err) {
        console.log("Error uploading to S3", err.message);
        return res.status(500).json({ error: "Error uploading profile picture" });
      }
    } else {
      console.log("No profile picture file provided");
    }

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrl, // Assign S3 URL to profile pic field
    });

    // Save the user including the profile pic URL
    await newUser.save();

    // Log the new user details
    console.log("New User Created:", newUser);

    // Generate JWT token here
    generateTokenAndSetCookie(newUser._id, res);

    // Respond with user details including profile pic URL
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      username: newUser.username,
      profilePic: newUser.profilePic, // Include profile pic URL in response
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};