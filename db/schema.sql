-- MOVIA interest form (Join Us). Run with: npm run db:init:remote
CREATE TABLE IF NOT EXISTS interest (
  id                   TEXT PRIMARY KEY,
  created_at           TEXT NOT NULL,
  role                 TEXT NOT NULL CHECK (role IN ('driver', 'cpo', 'partner')),
  name                 TEXT NOT NULL,
  organization         TEXT,
  contact_method       TEXT NOT NULL,
  contact_value        TEXT NOT NULL,
  details              TEXT NOT NULL,          -- JSON of role-specific answers
  consent              INTEGER NOT NULL CHECK (consent = 1),
  consent_text_version TEXT NOT NULL,
  lang                 TEXT NOT NULL,
  status               TEXT NOT NULL DEFAULT 'new'  -- new | contacted | closed
);
CREATE INDEX IF NOT EXISTS idx_interest_created ON interest (created_at);
CREATE INDEX IF NOT EXISTS idx_interest_role ON interest (role, status);
