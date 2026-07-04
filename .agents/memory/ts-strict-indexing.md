---
name: TypeScript Strict Object Indexing
description: TS7053 pattern fix — use typed unions + Record<K,V> for const object lookups
---

## Rule
When indexing a const object with a value from data (e.g. `levelVariant[lang.level]`), TypeScript TS7053 fires if the key type is `string`. Fix: define the key as a union type, annotate the data array entries as `as UnionType`, and type the lookup object as `Record<UnionType, string>`.

**Why:** TypeScript cannot narrow a generic `string` to a specific union, so indexing a const object with it fails.

**How to apply:**
```ts
type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced";
const levelVariant: Record<DifficultyLevel, string> = { ... };
const items = [{ level: "Beginner" as DifficultyLevel, ... }];
// Now levelVariant[item.level] is safe
```
