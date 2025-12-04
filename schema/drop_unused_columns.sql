-- Drop unused columns: views, highlighted_code, highlighted_preview
-- SQLite doesn't support DROP COLUMN directly, need to recreate table

-- Create new table without the columns
CREATE TABLE pastes_new (
  id TEXT PRIMARY KEY,
  code TEXT NOT NULL,
  language TEXT,
  created INTEGER NOT NULL,
  expires INTEGER,
  filename TEXT
);

-- Copy data
INSERT INTO pastes_new (id, code, language, created, expires, filename)
SELECT id, code, language, created, expires, filename FROM pastes;

-- Drop old table
DROP TABLE pastes;

-- Rename new table
ALTER TABLE pastes_new RENAME TO pastes;

-- Recreate index
CREATE INDEX idx_created ON pastes(created DESC);
