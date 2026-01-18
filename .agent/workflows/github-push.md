---
description: Pushne změny na GitHub (myliproduct-tech/appforman)
---

# GitHub Push Workflow

Tento workflow použiju, když řekneš "push na github", "nahraj to na github", nebo podobně.

## Kroky:

// turbo
1. Přidej všechny změny do stage
```
git add .
```

// turbo
2. Vytvoř commit s popisem změn
```
git commit -m "Update: [popis změn]"
```

// turbo
3. Pushni na GitHub
```
git push origin main
```

## Poznámky:
- Commit message by měla stručně popisovat, co bylo změněno
- Pokud jsou specifické změny (např. "Přidán zvuk notifikace"), použij konkrétnější popis
- Vždy zkontroluj, že jsou všechny důležité soubory přidané
