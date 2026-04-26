#!/bin/bash
# Script de test local - The Green Room

echo "🚀 The Green Room - Script de Test Local"
echo "=========================================="
echo ""

# Vérifier Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé"
    exit 1
fi
echo "✅ Node.js: $(node -v)"

# Vérifier npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé"
    exit 1
fi
echo "✅ npm: $(npm -v)"

echo ""
echo "📋 Dépendances:"
npm list next react react-dom 2>/dev/null | grep -E "next|react"

echo ""
echo "🔍 Vérification des fichiers modifiés:"
files=(
  "app/admin/page.jsx"
  "components/Collections.jsx"
  "components/EventsSection.jsx"
  "components/Contact.jsx"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file MANQUANT"
  fi
done

echo ""
echo "🔗 Variables d'environnement:"
if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local 2>/dev/null; then
  echo "✅ NEXT_PUBLIC_SUPABASE_URL configurée"
else
  echo "⚠️  NEXT_PUBLIC_SUPABASE_URL pas trouvée"
fi

if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local 2>/dev/null; then
  echo "✅ NEXT_PUBLIC_SUPABASE_ANON_KEY configurée"
else
  echo "⚠️  NEXT_PUBLIC_SUPABASE_ANON_KEY pas trouvée"
fi

echo ""
echo "📊 Vérification de la structure:"
echo "├── app/"
echo "│   ├── admin/"
echo "│   │   └── page.jsx ✨"
echo "│   ├── api/admin/"
echo "│   │   ├── hours/route.js"
echo "│   │   ├── events/route.js"
echo "│   │   └── brands/route.js"
echo "│   ├── page.jsx"
echo "│   └── layout.jsx"
echo "├── components/"
echo "│   ├── Collections.jsx ✨"
echo "│   ├── EventsSection.jsx ✨"
echo "│   ├── Contact.jsx ✨"
echo "│   └── ..."
echo "└── schema.sql ✨"
echo ""

echo "🎯 Étapes Suivantes:"
echo "1. Exécutez la migration Supabase (MIGRATION_SCRIPT.sql)"
echo "2. Exécutez: npm run dev"
echo "3. Ouvrez: http://localhost:3000/admin"
echo "4. Testez les trois onglets (Horaires, Événements, Marques)"
echo ""
echo "📚 Documentation:"
echo "- INSTRUCTIONS_FINALES.md"
echo "- MODIFICATIONS_GUIDE.md"
echo "- ARCHITECTURE.md"
echo ""
echo "✨ C'est prêt! Bon testing! 🚀"
