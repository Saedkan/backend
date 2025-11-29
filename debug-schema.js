import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Debugging GraphQL Schema...\n');

// Проверим dist папку
console.log('📁 Checking dist folder:');
try {
  const files = readFileSync(resolve(__dirname, 'dist/graphql/schema/index.js'), 'utf8');
  console.log('✅ dist/graphql/schema/index.js exists');
  
  // Ищем Query в скомпилированном файле
  if (files.includes('hello')) {
    console.log('✅ "hello" found in compiled schema');
  } else {
    console.log('❌ "hello" NOT found in compiled schema');
  }
  
  console.log('\n📄 First 500 chars of compiled schema:');
  console.log(files.substring(0, 500));
} catch (error) {
  console.log('❌ dist/graphql/schema/index.js not found');
}

console.log('\n📁 Checking src folder:');
try {
  const srcFiles = readFileSync(resolve(__dirname, 'src/graphql/schema/index.ts'), 'utf8');
  console.log('✅ src/graphql/schema/index.ts exists');
  
  if (srcFiles.includes('hello')) {
    console.log('✅ "hello" found in source schema');
  } else {
    console.log('❌ "hello" NOT found in source schema');
  }
} catch (error) {
  console.log('❌ src/graphql/schema/index.ts not found');
}

console.log('\n📁 Checking resolvers:');
try {
  const resolvers = readFileSync(resolve(__dirname, 'dist/graphql/resolvers/index.js'), 'utf8');
  console.log('✅ dist/graphql/resolvers/index.js exists');
  
  if (resolvers.includes('hello')) {
    console.log('✅ "hello" found in resolvers');
  } else {
    console.log('❌ "hello" NOT found in resolvers');
  }
} catch (error) {
  console.log('❌ dist/graphql/resolvers/index.js not found');
}