# MCP Prompts Contracts - TODO

## Úkoly pro migraci a vývoj

### Fáze 1: Základní nastavení
- [x] Vytvořit package.json s potřebnými závislostmi
- [x] Nastavit TypeScript konfiguraci
- [x] Přidat Zod jako závislost pro schémata
- [x] Vytvořit build skripty

### Fáze 2: API Definice
- [x] Převést všechny typy na Zod schémata
- [x] Vytvořit OpenAPI specifikaci z Zod schémat
- [ ] Přidat validaci pro všechny API endpointy (dle Zod schémat)
- [ ] Vytvořit TypeScript typy z Zod schémat (automatizace)
- [ ] Přidat testy, které ověří, že schémata odpovídají reálným datům z katalogu

### Fáze 3: CI/CD Pipeline
- [ ] Nastavit GitHub Actions pro lint, test a build
- [ ] Přidat automatickou validaci schémat proti příkladům
- [ ] Konfigurovat automatické publikování NPM balíčku
- [ ] Přidat repository_dispatch event na meta-repo při release

### Fáze 4: Dokumentace
- [ ] Vytvořit API dokumentaci (včetně OpenAPI)
- [ ] Přidat příklady použití
- [ ] Vytvořit migrační průvodce pro existující implementace

### Fáze 5: Testování
- [ ] Vytvořit unit testy pro schémata
- [ ] Přidat integrační testy s ostatními repozitáři
- [ ] Otestovat kompatibilitu s existujícími implementacemi 