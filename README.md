# MCP Prompts - Contracts

This package provides shared API contracts, JSON schemas, and type definitions for the entire MCP Prompts ecosystem.

## Purpose

- Single source of truth for all data structures and API contracts used by MCP servers, clients, and tools.
- Ensures type safety, validation, and interoperability across all implementations (TypeScript, Rust, Python, Android, etc.).

## Usage

- Import the package in your MCP-compatible project to access the latest schemas and types.
- All prompt data and API payloads should be validated against these schemas.

## Generating OpenAPI Specification

OpenAPI specification is generated automatically from Zod schemas in `src/schemas.ts`.

**To generate OpenAPI:**

```bash
npm install # install dependencies
npm run gen:openapi
```

The output file is `openapi.json` in the package root.

## Contributing

- Add new types and schemas to `src/interfaces.ts` and `src/schemas.ts`.
- After any schema change, run `npm run gen:openapi` and commit the updated `openapi.json`.
- If you add a new endpoint, extend the schemas and types as needed.

## Publishing to NPM

This package is published as `@sparesparrow/mcp-prompts-contracts`.

```bash
npm publish --access public
```

## CI/CD and Workflow

- Every commit to the main branch triggers CI to check types, schemas, and generate OpenAPI.
- Publishing to NPM is automated after successful CI.

## Next Steps

- Type generation for other languages (Rust, Kotlin, Python) will be based on OpenAPI using `openapi-generator`.
- See the meta-repository for strategic documents and further roadmap.
