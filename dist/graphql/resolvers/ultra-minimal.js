import { DateTimeScalar } from '../scalars/DateTime.js';
export const ultraMinimalResolvers = {
    DateTime: DateTimeScalar,
    Query: {
        hello: () => '🚀 TaskFlow GraphQL API is working!',
        me: () => ({
            _id: '1',
            username: 'testuser',
            email: 'test@taskflow.com',
            role: 'USER',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }),
        users: () => [
            {
                _id: '1',
                username: 'admin',
                email: 'admin@taskflow.com',
                role: 'ADMIN',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        projects: () => [
            {
                _id: '1',
                title: 'Test Project',
                description: 'Test project description',
                status: 'ACTIVE',
                lead: {
                    _id: '1',
                    username: 'admin',
                    email: 'admin@taskflow.com',
                    role: 'ADMIN',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                members: [],
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        tasks: () => [
            {
                _id: '1',
                title: 'Test Task',
                description: 'Test task description',
                status: 'TODO',
                priority: 'MEDIUM',
                project: {
                    _id: '1',
                    title: 'Test Project',
                    description: 'Test project description',
                    status: 'ACTIVE',
                    isDeleted: false,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                assignee: {
                    _id: '1',
                    username: 'admin',
                    email: 'admin@taskflow.com',
                    role: 'ADMIN',
                    isActive: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                tags: [],
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
    },
    Mutation: {
        register: (_, { input }) => ({
            token: 'test-jwt-token-12345',
            user: {
                _id: '2',
                username: input.username,
                email: input.email,
                role: 'USER',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }),
        login: () => ({
            token: 'test-jwt-token-12345',
            user: {
                _id: '1',
                username: 'testuser',
                email: 'test@taskflow.com',
                role: 'USER',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }),
    },
    // Простые резолверы для типов
    User: {
        projectsLed: () => [],
        projectsMember: () => [],
        assignedTasks: () => [],
        comments: () => [],
    },
    Project: {
        tasks: () => [],
        tags: () => [],
        taskCount: () => 0,
        memberCount: () => 1,
    },
    Task: {
        isOverdue: () => false,
        commentCount: () => 0,
    }
};
