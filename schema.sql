-- ═══════════════════════════════════════════════════════════════════════════
-- THE GREEN ROOM – Schéma Supabase
-- Exécutez ce script dans : Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Table : horaires ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS hours (
  id          SERIAL PRIMARY KEY,
  day         TEXT    NOT NULL,
  open        TEXT    NOT NULL DEFAULT '10:00',
  close       TEXT    NOT NULL DEFAULT '19:00',
  is_closed   BOOLEAN NOT NULL DEFAULT false,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- Données initiales
INSERT INTO hours (day, open, close, is_closed, sort_order) VALUES
  ('Lundi',    '10:00', '19:00', false, 1),
  ('Mardi',    '10:00', '19:00', false, 2),
  ('Mercredi', '10:00', '19:00', false, 3),
  ('Jeudi',    '10:00', '19:00', false, 4),
  ('Vendredi', '10:00', '20:00', false, 5),
  ('Samedi',   '10:00', '20:00', false, 6),
  ('Dimanche', '10:00', '18:00', false, 7);

-- ─── Table : événements ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS events (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT    NOT NULL,
  description TEXT,
  event_date  DATE    NOT NULL,
  event_time  TEXT,
  type        TEXT    NOT NULL DEFAULT 'Concert',
  featured    BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Table : marques ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT    NOT NULL,
  category    TEXT    NOT NULL DEFAULT 'Vêtements',
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ═══════════════════════════════════════════════════════════════════════════
-- Row Level Security (RLS)
-- ═══════════════════════════════════════════════════════════════════════════

-- Activer RLS sur toutes les tables
ALTER TABLE hours  ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

-- Lecture publique (clé anon)
CREATE POLICY "Public read hours"  ON hours  FOR SELECT USING (true);
CREATE POLICY "Public read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public read brands" ON brands FOR SELECT USING (true);

-- Écriture réservée au service_role (clé serveur uniquement, via API routes)
-- Les policies INSERT/UPDATE/DELETE ne sont pas nécessaires pour anon
-- car les mutations passent uniquement par les API routes avec service_role
-- qui bypass RLS par défaut.
