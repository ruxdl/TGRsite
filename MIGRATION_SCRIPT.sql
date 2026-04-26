-- ═══════════════════════════════════════════════════════════════════════════
-- SCRIPT DE MIGRATION - Exécutez dans Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Migrer la table hours : créer nouvelles colonnes et copier les données
ALTER TABLE hours 
ADD COLUMN morning_open TEXT DEFAULT '10:00',
ADD COLUMN morning_close TEXT DEFAULT '13:00',
ADD COLUMN afternoon_open TEXT DEFAULT '14:00',
ADD COLUMN afternoon_close TEXT DEFAULT '19:00';

-- Copier les anciennes données open/close vers morning/afternoon (optionnel)
-- UPDATE hours SET morning_open = open, morning_close = close, afternoon_open = '14:00', afternoon_close = close WHERE morning_open IS NULL;

-- Une fois confirmé, vous pouvez supprimer les anciennes colonnes:
-- ALTER TABLE hours DROP COLUMN open;
-- ALTER TABLE hours DROP COLUMN close;

-- 2. Ajouter colonne image_url à events
ALTER TABLE events 
ADD COLUMN image_url TEXT;

-- 3. Ajouter colonnes image_url et featured à brands
ALTER TABLE brands 
ADD COLUMN image_url TEXT,
ADD COLUMN featured BOOLEAN DEFAULT false;

-- Voilà ! La migration est complète.
