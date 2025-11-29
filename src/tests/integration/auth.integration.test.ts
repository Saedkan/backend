import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { User } from '../../models/User.js';
import { userResolvers } from '../../graphql/resolvers/user.resolvers.js';

describe('Auth Integration Test', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe('User Registration and Login', () => {
    it('should register and login user successfully', async () => {
      // Test registration
      const registerInput = {
        username: 'integrationuser',
        email: 'integration@test.com',
        password: 'password123'
      };

      const registerResult = await userResolvers.Mutation.register(
        null, 
        { input: registerInput },
        { user: null }
      );

      expect(registerResult.user.email).toBe(registerInput.email);
      expect(registerResult.token).toBeDefined();

      // Test login
      const loginInput = {
        email: 'integration@test.com',
        password: 'password123'
      };

      const loginResult = await userResolvers.Mutation.login(
        null,
        { input: loginInput },
        { user: null }
      );

      expect(loginResult.user.email).toBe(loginInput.email);
      expect(loginResult.token).toBeDefined();
    });

    it('should fail login with wrong password', async () => {
      const user = await User.create({
        username: 'testuser',
        email: 'test@example.com',
        password: 'correctpassword'
      });

      const loginInput = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await expect(
        userResolvers.Mutation.login(null, { input: loginInput }, { user: null })
      ).rejects.toThrow('Invalid credentials');
    });
  });
});