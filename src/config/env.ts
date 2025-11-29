import dotenv from 'dotenv';

dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 4000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/blog-backend',
  JWT_SECRET: process.env.JWT_SECRET || 'fallback-secret-key-change-in-production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

// Проверяем обязательные переменные
export const validateEnv = () => {
  const required = ['MONGO_URI', 'JWT_SECRET'];
  
  for (const key of required) {
    if (!process.env[key]) {
      console.warn(`⚠️  Warning: ${key} is not set in environment variables`);
    }
  }
};