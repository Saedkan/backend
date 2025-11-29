import jwt from 'jsonwebtoken';
import { User, type IUser } from '../models/User.js';
import type { Request } from 'express';

export interface AuthContext {
  user: IUser | null;
  token: string | null;
}

export const authenticate = async (req: Request): Promise<AuthContext> => {
  const token = req.headers.authorization?.replace('Bearer ', '') || null;
  
  if (!token) {
    return { user: null, token: null };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const user = await User.findById(decoded.userId);
    
    return { user, token };
  } catch (error) {
    return { user: null, token: null };
  }
};

export const isAuthenticated = (context: AuthContext): IUser => {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
};

export const isAdmin = (context: AuthContext): IUser => {
  const user = isAuthenticated(context);
  
  if (user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
};

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId }, 
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};