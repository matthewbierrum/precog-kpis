import { neon } from "@neondatabase/serverless"

// Neon serverless client — works on Vercel Edge and Node.js serverless functions.
// DATABASE_URL is provisioned in Vercel env vars; use .env.local for local dev.
export const sql = neon(process.env.DATABASE_URL!)
