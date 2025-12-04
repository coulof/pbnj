-- Add columns for pre-rendered highlighted HTML
ALTER TABLE pastes ADD COLUMN highlighted_code TEXT;
ALTER TABLE pastes ADD COLUMN highlighted_preview TEXT;
