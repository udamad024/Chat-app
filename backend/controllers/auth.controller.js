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

const sns = new AWS.SNS();
const s3 = new AWS.S3(); // Add S3 client

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender, profilePicFile } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let profilePicUrl = ""; // Initialize profile pic URL

    if (profilePicFile) {
      // Upload profile pic to S3
      const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `profile-pictures/${username}-${Date.now()}.png`, // Adjust key format as needed
        Body: profilePicFile.data,
        ContentType: profilePicFile.mimetype
      };

      const s3UploadResult = await s3.upload(uploadParams).promise();

      profilePicUrl = s3UploadResult.Location; // Get the uploaded file URL
    }

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: profilePicUrl, // Assign profile pic URL
    });

    // Save the user including the profile pic URL
    await newUser.save();

    // Generate JWT token here
    generateTokenAndSetCookie(newUser._id, res);

    // Publish a message to the SNS topic
    const message = `New user registered: ${username} (${email})`;
    const params = {
      Message: message,
      TopicArn: process.env.AWS_SNS_TOPIC_ARN,
    };

    sns.publish(params, (err, data) => {
      if (err) {
        console.error("Error publishing message to SNS topic", err);
      } else {
        console.log("Message published to SNS topic", data);
      }
    });

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
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!user || !isPasswordCorrect) {
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
