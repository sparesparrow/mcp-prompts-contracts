// Skript pro generování OpenAPI specifikace ze Zod schémat
import { zodToOpenAPI } from 'zod-to-openapi';
import { promptSchemas } from '../src/schemas';
import { writeFileSync } from 'fs';
import path from 'path';

// Definice všech endpointů a schémat (zjednodušený příklad)
const openApiDoc = zodToOpenAPI({
  createPrompt: promptSchemas.create,
  updatePrompt: promptSchemas.update,
  deletePrompt: promptSchemas.delete,
  getPrompt: promptSchemas.get,
  listPrompts: promptSchemas.list,
  fullPrompt: promptSchemas.full,
  applyTemplate: promptSchemas.applyTemplate,
  bulkCreate: promptSchemas.bulkCreate,
  bulkDelete: promptSchemas.bulkDelete,
}, {
  title: 'MCP Prompts API',
  version: '1.0.0',
  description: 'OpenAPI specifikace generovaná ze Zod schémat',
});

const outputPath = path.resolve(__dirname, '../openapi.json');
writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2));
console.log('OpenAPI specifikace byla vygenerována do', outputPath); 