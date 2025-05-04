import Partner from '../models/Partner.js'; // Remove duplicate import
import jwt from 'jsonwebtoken';

// Function to generate a JWT token
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d', // Token will expire in 1 day
    });
};


export const partnersignup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existing = await Partner.findOne({ email });
        if (existing) return res.status(400).json({ message: 'Email already exists' });


        const user = new Partner({ email, password });
        await user.save();
        const token = generateToken(user);

        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });

        res.status(201).json({ message: 'Signup successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const partnerlogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Partner.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = generateToken(user);

        // Set token in an HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'Strict',
            maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const partnerlogout = async (req, res) => {

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'Strict',
        path: '/',
    });

    // Send response indicating the user has logged out
    res.status(200).json({ message: 'Logged out successfully' });
};
