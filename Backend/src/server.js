import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

app.use(cors())
app.use(express.json());

// User Signup
app.post("/api/signup", async (req, res) => {
    console.log(`post received from server`);
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            // data: { name, email, passwordHash: hashedPassword, educationBoard: board, schoolYear: year }
            data: {name, email, passwordHash: hashedPassword}
        });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ message: "Error signing up", error: error.message });
    }
});

// User Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
