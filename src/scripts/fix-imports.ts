import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

function addJsExtensions(dir) {
  const files = readdirSync(dir);
  
  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);
    
    if (stat.isDirectory()) {
      addJsExtensions(fullPath);
    } else if (extname(file) === '.js') {
      let content = readFileSync(fullPath, 'utf8');
      
      // Добавляем .js к относительным импортам
      content = content.replace(
        /from\s+['"](\.\.?\/[^'"]*)['"]/g,
        (match, importPath) => {
          if (!importPath.endsWith('.js') && !importPath.startsWith('@')) {
            return `from '${importPath}.js'`;
          }
          return match;
        }
      );
      
      writeFileSync(fullPath, content);
      console.log(`Fixed imports in: ${fullPath}`);
    }
  }
}

addJsExtensions('./dist');
console.log('✅ All imports fixed!');