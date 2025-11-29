import 'dotenv/config';
import { connectDB, disconnectDB } from '../config/database.js';
import { User } from '../models/User.js';
import { Project } from '../models/Project.js';
import { Task } from '../models/Task.js';
import { Tag } from '../models/Tag.js';
import { Comment } from '../models/Comment.js';
const seedDatabase = async () => {
    try {
        await connectDB();
        // Очистка базы данных
        await User.deleteMany({});
        await Project.deleteMany({});
        await Task.deleteMany({});
        await Tag.deleteMany({});
        await Comment.deleteMany({});
        console.log('🗑️ Database cleared');
        // Создание пользователей
        const adminUser = await User.create({
            username: 'admin',
            email: 'admin@taskflow.com',
            password: 'admin123',
            role: 'ADMIN'
        });
        const regularUser = await User.create({
            username: 'user1',
            email: 'user1@taskflow.com',
            password: 'user123'
        });
        const user2 = await User.create({
            username: 'user2',
            email: 'user2@taskflow.com',
            password: 'user123'
        });
        console.log('👥 Users created');
        // Создание проекта
        const project = await Project.create({
            title: 'Разработка TaskFlow',
            description: 'Разработка системы управления задачами с использованием MERN стека',
            status: 'ACTIVE',
            lead: adminUser._id,
            members: [adminUser._id, regularUser._id, user2._id]
        });
        console.log('📁 Project created');
        // Создание тегов
        const bugTag = await Tag.create({
            name: 'bug',
            color: '#ef4444',
            project: project._id
        });
        const featureTag = await Tag.create({
            name: 'feature',
            color: '#10b981',
            project: project._id
        });
        const urgentTag = await Tag.create({
            name: 'urgent',
            color: '#f59e0b',
            project: project._id
        });
        console.log('🏷️ Tags created');
        // Создание задач
        const task1 = await Task.create({
            title: 'Реализовать аутентификацию',
            description: 'Добавить JWT аутентификацию с регистрацией и входом',
            status: 'DONE',
            priority: 'HIGH',
            project: project._id,
            assignee: adminUser._id,
            tags: [featureTag._id]
        });
        const task2 = await Task.create({
            title: 'Исправить баг с датами',
            description: 'Задачи показывают неправильные даты в некоторых случаях',
            status: 'IN_PROGRESS',
            priority: 'MEDIUM',
            project: project._id,
            assignee: regularUser._id,
            tags: [bugTag._id, urgentTag._id]
        });
        const task3 = await Task.create({
            title: 'Добавить real-time уведомления',
            description: 'Реализовать WebSocket для обновлений в реальном времени',
            status: 'TODO',
            priority: 'HIGH',
            project: project._id,
            assignee: user2._id,
            tags: [featureTag._id]
        });
        console.log('📝 Tasks created');
        // Создание комментариев
        await Comment.create({
            content: 'Аутентификация работает отлично!',
            author: regularUser._id,
            task: task1._id
        });
        await Comment.create({
            content: 'Есть проблемы с часовыми поясами в датах',
            author: user2._id,
            task: task2._id
        });
        console.log('💬 Comments created');
        console.log('✅ Database seeded successfully!');
        console.log('\n📋 Test credentials:');
        console.log('Admin: admin@taskflow.com / admin123');
        console.log('User 1: user1@taskflow.com / user123');
        console.log('User 2: user2@taskflow.com / user123');
    }
    catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
    finally {
        await disconnectDB();
    }
};
seedDatabase();
