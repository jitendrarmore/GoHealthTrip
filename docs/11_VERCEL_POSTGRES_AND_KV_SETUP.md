# Vercel Deployment, Database & Caching Architecture Guide

## 1. Architecture Overview on Vercel

```mermaid
flowchart TD
    subgraph VercelEdge["Vercel Global Edge Network"]
        CDN["Vercel Edge Network / WAF (Fast Global Routing)"]
        APP["Next.js 15 Fullstack App (SSR / RSC / API Routes)"]
    end

    subgraph DataStorage["Vercel Integrated Data Layer"]
        POSTGRES[("PostgreSQL 16 (Vercel Postgres / Neon / Supabase)\n- Pooled Connection: DATABASE_URL\n- Direct Connection: DIRECT_URL")]
        KV[("Distributed Redis Cache (Vercel KV / Upstash)\n- KV_REST_API_URL / UPSTASH_REDIS_REST_URL\n- KV_REST_API_TOKEN / UPSTASH_REDIS_REST_TOKEN")]
        BLOB[("Encrypted Medical Vault (Vercel Blob / S3)\n- Time-limited Pre-Signed URLs")]
    end

    CDN --> APP
    APP --> POSTGRES
    APP --> KV
    APP --> BLOB
```

---

## 2. Environment Variables for Vercel

In your **Vercel Project Settings** → **Environment Variables**, add:

| Variable Name | Description | Example / Format |
|---|---|---|
| `DATABASE_URL` | Pooled PostgreSQL Connection String (Transaction Pooler) | `postgres://default:...@ep-pooler.ap-south-1.postgres.vercel-storage.com/verceldb?sslmode=require&pgbouncer=true` |
| `DIRECT_URL` | Direct PostgreSQL Connection String (For Prisma Migrations) | `postgres://default:...@ep-direct.ap-south-1.postgres.vercel-storage.com/verceldb?sslmode=require` |
| `KV_REST_API_URL` | Upstash / Vercel KV REST API Endpoint | `https://prompt-possum-12345.upstash.io` |
| `KV_REST_API_TOKEN` | Upstash / Vercel KV Authentication Token | `AXY4ASQg...` |
| `NEXTAUTH_SECRET` | 32-byte Cryptographic Session Secret | `ght_prod_secret_session_key_32_bytes` |
| `NEXTAUTH_URL` | Production Subdomain URL | `https://gohealthtrip.vercel.app` |
| `NODE_ENV` | Production Environment | `production` |

---

## 3. One-Click Database Provisioning Steps in Vercel

1. **Connect Vercel Postgres**:
   - Go to your Vercel Dashboard → **Storage** tab.
   - Click **Create Database** → Select **Postgres (Serverless)**.
   - Choose region **`ap-south-1` (Mumbai, India)** or closest to your target users.
   - Link the database to the `GoHealthTrip` project.
   - *Vercel automatically injects `DATABASE_URL` and `POSTGRES_PRISMA_URL`!*

2. **Connect Vercel KV (Redis Caching)**:
   - In the **Storage** tab, click **Create Database** → Select **KV (Redis)**.
   - Link to `GoHealthTrip`.
   - *Vercel automatically injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`!*

3. **Initialize Database Schema & Seeds**:
   - Once connected, run the migration & demo seed from your terminal:
   ```bash
   # Push schema to Vercel Postgres
   npx prisma db push

   # Seed demo hospitals, doctors, and cases
   npx prisma db seed
   ```

---

## 4. Multi-Tier Caching Strategy Implemented

- **Hospital & Treatment Catalogs (`catalogs:hospitals:all`, `catalogs:treatments:all`)**:
  - Cached in Redis for **3600 seconds (1 hour)** with automatic cache-aside fallback.
- **Distributed Idempotency Locks (`idempotency_lock:<key>`)**:
  - Redis distributed locks with **15-second auto-expiry** preventing double-charge payments or race conditions on hospital appointment bookings.
- **State Transition Invalidation**:
  - Updating a patient case immediately evicts `case:<id>` cache to ensure real-time consistency.
