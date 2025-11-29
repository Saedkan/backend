import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Добавьте загрузку .env
dotenv.config();

export const connectDB = async () => {
    try {
        // Добавьте проверку MONGO_URI
        const mongoUri = process.env.MONGO_URI;
        
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }

        const conn = await mongoose.connect(mongoUri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1);
    }
};

export const disconnectDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('✅ MongoDB disconnected');
    } catch (error) {
        console.error('❌ Error disconnecting from database:', error);
        // process.exit(1); // Уберите это - не нужно завершать процесс при ошибке отключения
    }
};
