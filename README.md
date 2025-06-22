# MCP Prompts Contracts

Tento repozitář obsahuje sdílené API definice a datové struktury pro ekosystém MCP Prompts. Slouží jako centrální zdroj pravdy pro všechny implementace MCP Prompts serverů.

## Účel

- **API Definice**: Definuje rozhraní a schémata pro MCP Prompts API
- **Datové Struktury**: Obsahuje TypeScript typy a Zod schémata
- **Sdílené Kontrakty**: Zajišťuje kompatibilitu mezi různými implementacemi

## Struktura

```
src/
├── interfaces.ts    # TypeScript rozhraní a typy
└── schemas.ts       # Zod schémata pro validaci
```

## Použití

Tento balíček je závislostí pro všechny implementace MCP Prompts:
- mcp-prompts-ts (TypeScript)
- mcp-prompts-rs (Rust)
- mcp-prompts-pg (PostgreSQL)
- mcp-prompts-aidl (Android)

## Instalace

```bash
npm install @sparesparrow/mcp-prompts-contracts
```

## Vývoj

```bash
npm install
npm run build
npm test
```
