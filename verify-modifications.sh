#!/bin/bash
# Vérification des fichiers modifiés pour The Green Room

echo "🔍 Vérification des modifications..."
echo ""

files=(
  "app/admin/page.jsx"
  "components/Collections.jsx"
  "components/EventsSection.jsx"
  "components/Contact.jsx"
  "schema.sql"
  "MIGRATION_SCRIPT.sql"
  "MODIFICATIONS_GUIDE.md"
  "CHANGELIST.md"
  "INSTRUCTIONS_FINALES.md"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    size=$(du -h "$file" | cut -f1)
    echo "✅ $file ($size)"
  else
    echo "❌ $file (MANQUANT)"
  fi
done

echo ""
echo "📊 Résumé:"
echo "- Admin page.jsx: Horaires matin/après-midi + images + étoile marques"
echo "- Collections.jsx: Affichage marques featured + voir plus"
echo "- EventsSection.jsx: Images pour événements"
echo "- Contact.jsx: Horaires matin/après-midi"
echo "- schema.sql: Schéma mis à jour"
echo ""
echo "🚀 Prochaines étapes:"
echo "1. Exécuter MIGRATION_SCRIPT.sql dans Supabase"
echo "2. Relancer l'app: npm run dev"
echo "3. Consulter INSTRUCTIONS_FINALES.md"
echo ""
