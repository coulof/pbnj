-- Add private paste support
-- Run this with: wrangler d1 execute pbnj-db --remote --file=./schema/add_private_columns.sql

ALTER TABLE pastes ADD COLUMN is_private INTEGER DEFAULT 0;
ALTER TABLE pastes ADD COLUMN secret_key TEXT;
