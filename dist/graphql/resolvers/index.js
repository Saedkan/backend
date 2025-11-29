import { userResolvers } from './user.resolvers.js';
import { projectResolvers } from './project.resolvers.js';
import { taskResolvers } from './task.resolvers.js';
import { tagResolvers } from './tag.resolvers.js';
import { commentResolvers } from './comment.resolvers.js';
export const resolvers = {
    Query: {
        hello: () => 'TaskFlow GraphQL API is working!',
        ...userResolvers.Query,
        ...projectResolvers.Query,
        ...taskResolvers.Query,
        ...tagResolvers.Query,
        ...commentResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...projectResolvers.Mutation,
        ...taskResolvers.Mutation,
        ...tagResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
    Subscription: {
        ...taskResolvers.Subscription,
        ...projectResolvers.Subscription,
        ...commentResolvers.Subscription,
    },
    User: userResolvers.User,
    Project: projectResolvers.Project,
    Task: taskResolvers.Task,
    Tag: tagResolvers.Tag,
    Comment: commentResolvers.Comment,
};
