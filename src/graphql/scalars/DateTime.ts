import { GraphQLScalarType, Kind } from 'graphql';

export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date and time custom scalar type',
  
  serialize(value: unknown): string {
    // Convert Date to ISO string
    if (value instanceof Date) {
      return value.toISOString();
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value).toISOString();
    }
    
    throw new Error('DateTime cannot represent non-date value');
  },
  
  parseValue(value: unknown): Date {
    // Convert incoming value to Date
    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }
    
    throw new Error('DateTime cannot represent non-date value');
  },
  
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    
    throw new Error('DateTime cannot represent non-date value');
  },
});