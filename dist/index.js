import 'dotenv/config';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { connectDB } from './config/database.js';
import { typeDefs } from './graphql/schema/index.js';
import { resolvers } from './graphql/resolvers/index.js';
import { DateTimeScalar } from './graphql/scalars/DateTime.js';
const startServer = async () => {
    // Подключение к базе данных
    await connectDB();
    // Создание Express приложения с правильным типом
    const app = express();
    // Создание Apollo Server
    const server = new ApolloServer({
        typeDefs,
        resolvers: {
            ...resolvers,
            DateTime: DateTimeScalar,
        },
        context: ({ req }) => {
            const token = req.headers.authorization || '';
            return {
                user: null,
                token
            };
        },
    });
    await server.start();
    // Применяем middleware с правильным типом
    server.applyMiddleware({
        app: app // Временное решение для обхода типов
    });
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
};
startServer().catch(console.error);
