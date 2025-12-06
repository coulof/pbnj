-- Migration: Add sessions table for web authentication
-- Run with: npx wrangler d1 execute pbnj-db --remote --file=schema/migrations/002_add_sessions.sql

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  created INTEGER NOT NULL,
  expires INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);
