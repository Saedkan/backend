import { DateTimeScalar } from '../scalars/DateTime.js';

export const ultraMinimalResolvers = {
  DateTime: DateTimeScalar,
  
  Query: {
    hello: () => '🚀 TaskFlow GraphQL API is working!',
    me: () => ({ _id: '1', username: 'test', email: 'test@test.com' }),
    users: () => [],
    projects: () => [],
    tasks: () => [],
  },
  
  Mutation: {
    register: () => ({ token: 'test', user: { _id: '1', username: 'test' } }),
    login: () => ({ token: 'test', user: { _id: '1', username: 'test' } }),
  }
  
  // Убираем все резолверы для типов и subscription временно
};