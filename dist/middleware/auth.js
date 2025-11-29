import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
export const authenticate = async (req) => {
    const token = req.headers.authorization?.replace('Bearer ', '') || null;
    if (!token) {
        return { user: null, token: null };
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        return { user, token };
    }
    catch (error) {
        return { user: null, token: null };
    }
};
export const isAuthenticated = (context) => {
    if (!context.user) {
        throw new Error('Authentication required');
    }
    return context.user;
};
export const isAdmin = (context) => {
    const user = isAuthenticated(context);
    if (user.role !== 'ADMIN') {
        throw new Error('Admin access required');
    }
    return user;
};
export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};
