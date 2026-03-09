const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    try {
        const { firstName, lastName, organization, email, password } = req.body;

        // Basic validation
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ error: "Please provide all required fields (firstName, lastName, email, password)." });
        }

        // Strong password regex (minimum 8 chars, at least one letter and one number)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ error: "Password must be at least 8 characters long and contain both letters and numbers." });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists with this email." });
        }

        // Hashing is handled by the pre('save') hook in the User model!
        const user = await User.create({
            firstName,
            lastName,
            organization,
            email,
            password
        });

        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.__v;

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: userObj
        });

    } catch (err) {
        console.error("Registration Error:", err);
        res.status(500).json({ error: "An error occurred during registration.", stack: err.stack, msg: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password." });
        }

        // check user exists
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        if (!user.isActive) {
            return res.status(403).json({ error: "This account has been deactivated." });
        }

        // compare password using the model method we created
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // generate token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // remove password before returning to frontend
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.__v;

        res.json({
            success: true,
            message: "Login successful",
            token,
            user: userObj
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "An error occurred during login." });
    }
};