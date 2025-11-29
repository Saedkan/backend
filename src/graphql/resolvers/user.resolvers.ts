import { User } from '../../models/User.js';
import { generateToken, isAuthenticated, isAdmin } from '../../middleware/auth.js';
import { validateInput } from '../../validation/schemas.js';
import { registerSchema, loginSchema } from '../../validation/schemas.js';
import { AuthenticationError, ValidationError, NotFoundError } from '../../graphql/errors/AppError.js';
import type { AuthContext } from '../../middleware/auth.js';

export const userResolvers = {
  Query: {
    me: async (_: any, __: any, context: AuthContext) => {
      const user = isAuthenticated(context);
      return user;
    },

    users: async (_: any, __: any, context: AuthContext) => {
      isAdmin(context);
      return await User.find({ isActive: true });
    },

    searchUsers: async (_: any, { query }: { query: string }, context: AuthContext) => {
      isAuthenticated(context);
      
      const users = await User.find({
        $or: [
          { username: { $regex: query, $options: 'i' } },
          { email: { $regex: query, $options: 'i' } }
        ],
        isActive: true
      });
      
      return users;
    },

    user: async (_: any, { id }: { id: string }, context: AuthContext) => {
      isAuthenticated(context);
      
      const user = await User.findById(id);
      if (!user || !user.isActive) {
        throw new NotFoundError('User');
      }
      
      return user;
    },
  },

  Mutation: {
    register: async (_: any, { input }: any) => {
      const validatedInput = validateInput(registerSchema)(input);
      
      // Проверяем уникальность email и username
      const existingUser = await User.findOne({
        $or: [
          { email: validatedInput.email },
          { username: validatedInput.username }
        ]
      });

      if (existingUser) {
        throw new ValidationError('User with this email or username already exists');
      }

      const user = new User(validatedInput);
      await user.save();

      const token = generateToken(user._id.toString());

      return {
        token,
        user
      };
    },

    login: async (_: any, { input }: any) => {
      const validatedInput = validateInput(loginSchema)(input);

      const user = await User.findOne({ 
        email: validatedInput.email,
        isActive: true 
      });

      if (!user || !(await user.comparePassword(validatedInput.password))) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = generateToken(user._id.toString());

      return {
        token,
        user
      };
    },

    updateProfile: async (_: any, { input }: any, context: AuthContext) => {
      const user = isAuthenticated(context);
      
      const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { $set: input },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        throw new NotFoundError('User');
      }

      return updatedUser;
    },

    deactivateUser: async (_: any, __: any, context: AuthContext) => {
      const user = isAuthenticated(context);
      
      await User.findByIdAndUpdate(user._id, { isActive: false });
      
      return true;
    },

    changeUserRole: async (_: any, { userId, role }: any, context: AuthContext) => {
      isAdmin(context);
      
      const user = await User.findByIdAndUpdate(
        userId,
        { role },
        { new: true, runValidators: true }
      );

      if (!user) {
        throw new NotFoundError('User');
      }

      return user;
    },
  },

  User: {
    projectsLed: async (user: any) => {
      // Будет реализовано в project resolvers
      return [];
    },

    projectsMember: async (user: any) => {
      // Будет реализовано в project resolvers
      return [];
    },

    assignedTasks: async (user: any) => {
      // Будет реализовано в task resolvers
      return [];
    },

    comments: async (user: any) => {
      // Будет реализовано в comment resolvers
      return [];
    },
  },
};