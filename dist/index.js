import './config/env.js';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectDB } from './config/database.js';
import { ultraMinimalTypeDefs } from './graphql/schema/ultra-minimal.js';
import { ultraMinimalResolvers } from './graphql/resolvers/ultra-minimal.js';
import { config } from './config/env.js';
const startServer = async () => {
    console.log(`🚀 Starting TaskFlow Backend in ${config.NODE_ENV} mode...`);
    await connectDB();
    const app = express();
    app.get('/health', (req, res) => {
        res.json({
            status: 'OK',
            environment: config.NODE_ENV,
            database: 'Connected',
            timestamp: new Date().toISOString()
        });
    });
    const server = new ApolloServer({
        typeDefs: ultraMinimalTypeDefs,
        resolvers: ultraMinimalResolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return {
                user: { _id: '1', username: 'test' },
                token
            };
        },
        introspection: true,
        playground: true,
    });
    await server.start();
    server.applyMiddleware({ app: app });
    app.listen(config.PORT, () => {
        console.log(`✅ Server running on http://localhost:${config.PORT}`);
        console.log(`🚀 GraphQL ready at http://localhost:${config.PORT}${server.graphqlPath}`);
    });
};
startServer().catch(console.error);
