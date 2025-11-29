import { typeDefs } from './dist/graphql/schema/index.js';
import { resolvers } from './dist/graphql/resolvers/index.js';

console.log('🔍 Checking exports...\n');

console.log('📋 typeDefs:', typeof typeDefs);
console.log('📋 resolvers:', typeof resolvers);

// Проверим структуру резолверов
console.log('\n🔍 Resolvers structure:');
console.log('Query keys:', Object.keys(resolvers.Query || {}));
console.log('Mutation keys:', Object.keys(resolvers.Mutation || {}));

// Проверим есть ли hello в Query
if (resolvers.Query && resolvers.Query.hello) {
  console.log('✅ Query.hello exists in resolvers');
} else {
  console.log('❌ Query.hello NOT found in resolvers');
}

// Проверим тип typeDefs
console.log('\n🔍 Schema type:', typeof typeDefs);
if (typeDefs && typeDefs.definitions) {
  const queryType = typeDefs.definitions.find(def => def.name && def.name.value === 'Query');
  if (queryType) {
    const helloField = queryType.fields.find(field => field.name.value === 'hello');
    if (helloField) {
      console.log('✅ hello field found in Query type');
    } else {
      console.log('❌ hello field NOT found in Query type');
      console.log('Available Query fields:', queryType.fields.map(f => f.name.value));
    }
  } else {
    console.log('❌ Query type not found in schema');
  }
}