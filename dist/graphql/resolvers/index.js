import { DateTimeScalar } from '../scalars/DateTime.js';
export const resolvers = {
    DateTime: DateTimeScalar,
    Query: {
        hello: () => '🚀 TaskFlow GraphQL API is working!',
        // Временные заглушки для всех Query
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
                lead: { _id: '1', username: 'admin' },
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
                project: { _id: '1', title: 'Test Project' },
                assignee: { _id: '1', username: 'admin' },
                tags: [],
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ],
        // Остальные Query
        searchUsers: () => [],
        user: () => null,
        project: () => null,
        myProjects: () => [],
        task: () => null,
        myTasks: () => ({ tasks: [], pagination: { page: 1, limit: 10, total: 0, pages: 0 } }),
        overdueTasks: () => [],
        searchTasks: () => [],
        tags: () => [],
        tag: () => null,
        comments: () => [],
        comment: () => null,
    },
    Mutation: {
        // Временные заглушки для всех Mutation
        register: () => ({
            token: 'test-jwt-token',
            user: {
                _id: '1',
                username: 'newuser',
                email: 'new@taskflow.com',
                role: 'USER',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        }),
        login: () => ({
            token: 'test-jwt-token',
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
        updateProfile: () => ({
            _id: '1',
            username: 'updateduser',
            email: 'updated@taskflow.com',
            role: 'USER',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }),
        deactivateUser: () => true,
        changeUserRole: () => null,
        createProject: () => null,
        updateProject: () => null,
        deleteProject: () => true,
        restoreProject: () => null,
        addProjectMember: () => null,
        removeProjectMember: () => null,
        leaveProject: () => true,
        createTask: () => null,
        updateTask: () => null,
        deleteTask: () => true,
        restoreTask: () => null,
        assignTask: () => null,
        unassignTask: () => null,
        changeTaskStatus: () => null,
        changeTaskPriority: () => null,
        addTagToTask: () => null,
        removeTagFromTask: () => null,
        createTag: () => null,
        updateTag: () => null,
        deleteTag: () => true,
        addComment: () => null,
        updateComment: () => null,
        deleteComment: () => true,
        restoreComment: () => null,
    },
    Subscription: {
        // Временные заглушки для Subscription
        projectUpdated: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => ({
                    next: () => Promise.resolve({ value: { action: 'CREATED', project: {} }, done: false })
                })
            })
        },
        taskUpdated: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => ({
                    next: () => Promise.resolve({ value: { action: 'CREATED', task: {} }, done: false })
                })
            })
        },
        commentAdded: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => ({
                    next: () => Promise.resolve({ value: {}, done: false })
                })
            })
        }
    },
    // ✅ РЕЗОЛВЕРЫ ДЛЯ ТИПОВ
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
    },
    Tag: {
        tasks: () => [],
        taskCount: () => 0,
    },
    // ✅ ДОБАВЛЯЕМ РЕЗОЛВЕР ДЛЯ COMMENT (это было пропущено)
    Comment: {
    // Пустой объект, так как у Comment нет дополнительных полей для резолвинга
    }
};
