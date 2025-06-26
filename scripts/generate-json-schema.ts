import { zodToJsonSchema } from 'zod-to-json-schema';
import { promptSchemas } from '../src/schemas';
import { writeFileSync } from 'fs';
import path from 'path';

const schema = zodToJsonSchema(promptSchemas.full, 'Prompt');
const outputPath = path.resolve(__dirname, '../prompt.schema.json');
writeFileSync(outputPath, JSON.stringify(schema, null, 2));
console.log('JSON Schema pro Prompt bylo vygenerováno do', outputPath); 