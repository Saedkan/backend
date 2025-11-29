export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401);
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Access denied') {
    super(message, 'AUTHORIZATION_ERROR', 403);
  }
}

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed') {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 'NOT_FOUND', 404);
  }
}

// Форматирование ошибок для GraphQL
export const formatError = (error: any) => {
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