// Skript pro generování OpenAPI specifikace ze Zod schémat
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { promptSchemas } from '../src/schemas';
import { writeFileSync } from 'fs';
import path from 'path';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

// Registrace pouze objektových schémat
registry.register('CreatePrompt', promptSchemas.create);
registry.register('UpdatePrompt', promptSchemas.update);
registry.register('DeletePrompt', promptSchemas.delete);
registry.register('FullPrompt', promptSchemas.full);
registry.register('GetPrompt', promptSchemas.get);
registry.register('ListPrompts', promptSchemas.list);
registry.register('ApplyTemplate', promptSchemas.applyTemplate);
// Pole a union typy neregistruji

const generator = new OpenApiGeneratorV3(registry.definitions);

const openApiDoc = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'MCP Prompts API',
    version: '1.0.0',
    description: 'OpenAPI specifikace generovaná ze Zod schémat',
  },
  servers: [{ url: '/' }],
});

const outputPath = path.resolve(__dirname, '../openapi.json');
writeFileSync(outputPath, JSON.stringify(openApiDoc, null, 2));
console.log('OpenAPI specifikace byla vygenerována do', outputPath); 