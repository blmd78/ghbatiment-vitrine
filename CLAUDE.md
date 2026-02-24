# CLAUDE.md

## Overview

Stack : Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Prisma, PostgreSQL.
Parle en français.

## Environment

- Node 24.x LTS
- pnpm comme package manager
- PostgreSQL 18
- Prisma 7.x
- Next.js 16.x

## Commands

```bash
pnpm dev          # Serveur de dev
pnpm build        # Build production
pnpm lint         # ESLint
pnpm format       # Prettier
pnpm test         # Tests
pnpm db:push      # Push schema Prisma
pnpm db:studio    # Prisma Studio
```

## Code Style

- TypeScript strict, jamais `any`
- Functional components uniquement
- `type` pour props/unions, `interface` pour objets extensibles
- kebab-case pour dossiers, PascalCase pour composants
- Composant > 150 lignes = à découper

## Data Fetching

- **Queries** : Server Components via `/src/lib/services/` (jamais Prisma direct dans les pages)
- **Mutations** : API Routes REST (`/src/app/api/`)
- **Client-side** : SWR uniquement si polling/temps réel nécessaire

## API Routes Pattern

```ts
// src/app/api/[resource]/route.ts
export async function POST(request: Request) {
  const data = await request.json()
  const validated = schema.parse(data)
  const result = await prisma.resource.create({ data: validated })
  return Response.json(result, { status: 201 })
}
```

## Prisma

- Toujours `include`/`select` pour éviter over-fetching
- Soft delete avec `deletedAt: DateTime?`
- Pagination cursor-based pour grandes listes

## UI

- shadcn/ui uniquement, pas d'autre lib UI
- Tailwind mobile-first
- Skeleton pour loading content, Spinner pour actions

## Forms

- React Hook Form + Zod
- Validation client ET serveur
- Soumission vers API REST

## Error Handling

```ts
// API Route
if (error instanceof z.ZodError) {
  return Response.json({ error: error.errors }, { status: 400 })
}
return Response.json({ error: 'Erreur serveur' }, { status: 500 })

// Client
toast.error('Une erreur est survenue')
console.error(error) // Pour monitoring
```

## File Structure

```
/src
  /app
    /api                    # API Routes
    /(pages)                # Routes principales
    layout.tsx
    page.tsx
  /features
    /[feature]
      /FeatureTemplate.tsx  # Template de composition
      /components/          # Composants spécifiques
      /hooks/               # Hooks spécifiques (si besoin)
  /components
    /ui                     # shadcn uniquement
    /shared                 # Composants réutilisables
    /layout                 # Sidebar, navigation
    /providers              # ThemeProvider, etc.
  /lib
    /services               # Data access layer (1 fichier par entité)
    /schemas                # Schémas Zod + types inférés
    /hooks                  # Hooks globaux
    /stores                 # Zustand stores (si besoin)
    /types                  # Types custom
    /utils                  # Helpers globaux
    constants.ts            # Constantes UI (options selects, etc.)
    utils.ts                # Helpers (cn, formatDate, etc.)
    config.ts               # Config app
    prisma.ts               # Client Prisma
  /generated
    /prisma                 # Client Prisma généré (Prisma 7)
/prisma
  schema.prisma             # Schéma Prisma
  /migrations               # Migrations
  seed.ts                   # Seed data
```

## Page Pattern

Pages légères : service + template uniquement.

```tsx
// src/app/(pages)/drones/page.tsx
import { getDrones } from '@/lib/services/drone'
import { DronesTemplate } from '@/features/drones/DronesTemplate'

export default async function DronesPage() {
  const drones = await getDrones()
  return <DronesTemplate drones={drones} />
}
```

```tsx
// src/features/drones/DronesTemplate.tsx
'use client'

export function DronesTemplate({ drones }: Props) {
  // Logique UI, handlers
  return (
    <div>
      <Header />
      <DroneList drones={drones} />
    </div>
  )
}
```

## Services Pattern

Data access layer : 1 fichier par entité, toutes les opérations dedans.

```ts
// src/lib/services/drone.ts
import { prisma } from '@/lib/prisma'

export async function getDrones() {
  return prisma.drone.findMany({
    select: { id: true, name: true, status: true },
    orderBy: { createdAt: 'desc' },
  })
}

export async function getDroneById(id: string) {
  return prisma.drone.findUnique({ where: { id } })
}

export async function createDrone(data: CreateDroneInput) {
  return prisma.drone.create({ data })
}
```

## Schemas Pattern

Schémas Zod partagés (API + front) avec types inférés.

```ts
// src/lib/schemas/drone.ts
import { z } from 'zod'

// Schéma formulaire (client + serveur)
export const droneFormSchema = z.object({
  name: z.string().min(2, 'Nom requis'),
  status: z.enum(['ACTIVE', 'INACTIVE', 'MAINTENANCE']),
})

// Schéma création API (étend le formulaire)
export const createDroneSchema = droneFormSchema.extend({
  id: z.string().uuid(),
})

// Types inférés (pas de duplication)
export type DroneFormData = z.infer<typeof droneFormSchema>
export type CreateDroneInput = z.infer<typeof createDroneSchema>
```

Usage côté form :

```tsx
import { droneFormSchema, type DroneFormData } from '@/lib/schemas/drone'
const form = useForm<DroneFormData>({ resolver: zodResolver(droneFormSchema) })
```

Usage côté API :

```ts
import { createDroneSchema } from '@/lib/schemas/drone'
const validated = createDroneSchema.parse(data)
```

## Conventions

- Imports : externes → `@/` alias → relatifs
- Dates : UTC en DB, `date-fns` pour format
- Toujours accolades pour conditionnels
- Préfère petits diffs, un fichier à la fois
