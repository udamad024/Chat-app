import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";
import multer from 'multer';

// Setup multer for handling multipart/form-data
const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.post("/signup", upload.single('profilePic'), signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;