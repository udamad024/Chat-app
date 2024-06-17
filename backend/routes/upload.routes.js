import express from "express";
import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
});

const s3 = new AWS.S3();
const router = express.Router();

router.post("/upload", async (req, res) => {
    const { fileName, fileType } = req.body;
  
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `profile-pictures/${fileName}`,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read',
    };
  
    try {
      const signedRequest = await s3.getSignedUrlPromise("putObject", s3Params);
      const url = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.amazonaws.com/profile-pictures/${fileName}`;
  
      res.json({
        url: signedRequest,
        key: url,
      });
    } catch (error) {
      console.error("Error generating signed URL", error);
      res.status(500).json({ error: "Error generating signed URL" });
    }
  });
  
  

export default router;
