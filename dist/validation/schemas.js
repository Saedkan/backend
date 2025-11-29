import { z } from 'zod';
import { ValidationError } from '../graphql/errors/AppError.js';
export const registerSchema = z.object({
    username: z.string()
        .min(3, 'Username must be at least 3 characters')
        .max(30, 'Username cannot exceed 30 characters')
        .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
    email: z.string()
        .email('Please enter a valid email'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(100, 'Password is too long'),
    avatar: z.string().url('Avatar must be a valid URL').optional()
});
export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(1, 'Password is required')
});
// Валидатор
export const validateInput = (schema) => {
    return (input) => {
        try {
            return schema.parse(input);
        }
        catch (error) {
            if (error instanceof z.ZodError) {
                const message = error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
                throw new ValidationError(message);
            }
            throw error;
        }
    };
};
