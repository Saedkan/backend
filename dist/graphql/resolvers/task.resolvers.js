export const taskResolvers = {
    Query: {
        tasks: () => [],
        task: () => null,
        myTasks: () => [],
        overdueTasks: () => [],
        searchTasks: () => [],
    },
    Mutation: {
        createTask: () => null,
        updateTask: () => null,
        deleteTask: () => false,
        restoreTask: () => null,
        assignTask: () => null,
        unassignTask: () => null,
        changeTaskStatus: () => null,
        changeTaskPriority: () => null,
        addTagToTask: () => null,
        removeTagFromTask: () => null,
    },
    Subscription: {
        taskUpdated: {
            subscribe: () => ({
                [Symbol.asyncIterator]: () => ({
                    next: () => Promise.resolve({ value: {}, done: false })
                })
            })
        }
    },
    Task: {
        isOverdue: () => false,
        commentCount: () => 0,
    },
};
