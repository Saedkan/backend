export class AppError extends Error {
    code;
    statusCode;
    isOperational;
    constructor(message, code = 'INTERNAL_ERROR', statusCode = 500, isOperational = true) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class AuthenticationError extends AppError {
    constructor(message = 'Authentication required') {
        super(message, 'AUTHENTICATION_ERROR', 401);
    }
}
export class AuthorizationError extends AppError {
    constructor(message = 'Access denied') {
        super(message, 'AUTHORIZATION_ERROR', 403);
    }
}
export class ValidationError extends AppError {
    constructor(message = 'Validation failed') {
        super(message, 'VALIDATION_ERROR', 400);
    }
}
export class NotFoundError extends AppError {
    constructor(resource = 'Resource') {
        super(`${resource} not found`, 'NOT_FOUND', 404);
    }
}
// Форматирование ошибок для GraphQL
export const formatError = (error) => {
    const originalError = error.originalError;
    if (originalError instanceof AppError) {
        return {
            message: originalError.message,
            code: originalError.code,
            statusCode: originalError.statusCode,
            path: error.path,
            locations: error.locations
        };
    }
    // Логируем неизвестные ошибки
    console.error('Unhandled error:', error);
    return {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
        statusCode: 500,
        path: error.path,
        locations: error.locations
    };
};
