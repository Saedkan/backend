import './config/env.js';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectDB } from './config/database.js';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import { config } from './config/env.js';

const startServer = async () => {
  console.log(`🚀 Starting TaskFlow Backend in ${config.NODE_ENV} mode...`);

  // Подключение к базе данных
  await connectDB();

  // Создание Express приложения
  const app = express();

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK',
      environment: config.NODE_ENV,
      database: 'Connected',
      timestamp: new Date().toISOString()
    });
  });

  // Создание Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization || '';
      return { 
        user: { _id: '1', username: 'test' }, // временный пользователь
        token 
      };
    },
    introspection: true,
    playground: true,
  });
  
  await server.start();
  
  server.applyMiddleware({ app: app as any });

  app.listen(config.PORT, () => {
    console.log(`✅ Server running on http://localhost:${config.PORT}`);
    console.log(`🚀 GraphQL ready at http://localhost:${config.PORT}${server.graphqlPath}`);
    console.log(`📊 Health check: http://localhost:${config.PORT}/health`);
  });
};

startServer().catch(console.error);