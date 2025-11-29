import { userResolvers } from '../../graphql/resolvers/user.resolvers.js';
import { User } from '../../models/User.js';
import { AuthenticationError, ValidationError } from 'apollo-server-express';
// Mock models
jest.mock('../../models/User');
describe('userResolvers', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe('Query.me', () => {
        it('should return current user when authenticated', async () => {
            const mockUser = {
                _id: 'user123',
                username: 'testuser',
                email: 'test@example.com'
            };
            const result = await userResolvers.Query.me(null, null, { user: mockUser });
            expect(result).toEqual(mockUser);
        });
        it('should throw error when not authenticated', async () => {
            await expect(userResolvers.Query.me(null, null, { user: null })).rejects.toThrow(AuthenticationError);
        });
    });
    describe('Mutation.register', () => {
        it('should create new user with valid input', async () => {
            const mockInput = {
                username: 'newuser',
                email: 'new@example.com',
                password: 'password123'
            };
            const mockUser = {
                _id: 'newuser123',
                ...mockInput
            };
            User.findOne.mockResolvedValue(null);
            User.prototype.save.mockResolvedValue(mockUser);
            const result = await userResolvers.Mutation.register(null, { input: mockInput });
            expect(result.user).toEqual(mockUser);
            expect(result.token).toBeDefined();
        });
        it('should throw error for duplicate email', async () => {
            const mockInput = {
                username: 'newuser',
                email: 'existing@example.com',
                password: 'password123'
            };
            User.findOne.mockResolvedValue({ email: mockInput.email });
            await expect(userResolvers.Mutation.register(null, { input: mockInput })).rejects.toThrow(ValidationError);
        });
    });
});
