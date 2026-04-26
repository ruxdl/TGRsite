# 📝 Guide des Modifications - The Green Room

## ✅ Modifications Effectuées

### 1. **Horaires avec Matin et Après-Midi**
- **Fichiers modifiés**: `schema.sql`, `app/admin/page.jsx`, `components/Contact.jsx`
- Les horaires sont maintenant divisés en **matin** (ouverture/fermeture) et **après-midi** (ouverture/fermeture)
- Sur l'admin: 4 champs pour chaque jour au lieu de 2
- Sur le site: affichage au format "10:00 - 13:00 / 14:00 - 19:00"

### 2. **Ajout de Photos pour Événements et Marques**
- **Nouveau champ**: `image_url` dans les tables `events` et `brands`
- Admin: Champ URL pour ajouter l'image d'un événement ou d'une marque
- Événements: Les images s'affichent en arrière-plan de la carte
- Indicateur "📷" dans la liste admin pour voir quelles marques/événements ont une image

### 3. **Système d'Étoile pour les Marques**
- **Nouveau champ**: `featured` (booléen) dans la table `brands`
- Admin: Bouton ⭐ pour mettre en avant une marque
- Site: **Seulement les marques avec `featured = true` s'affichent dans la mosaïque**
- Les autres marques sont accessibles via un bouton "Voir les X autres marques"

### 4. **Affichage Amélioré des Marques**
- Les marques sont séparées en deux groupes:
  - **Marques mises en avant** (featured): affichées d'abord
  - **Autres marques**: accessibles via un bouton "Voir plus"
- Le site affiche dynamiquement le nombre de marques supplémentaires

---

## 🚀 Étapes d'Installation

### Étape 1: Mettre à jour la Base de Données

⚠️ **IMPORTANT**: Exécutez le script de migration dans Supabase:

1. Allez à [Supabase Dashboard](https://supabase.com)
2. Ouvrez **SQL Editor** → **New Query**
3. Copiez le contenu de `MIGRATION_SCRIPT.sql`
4. Exécutez le script

```sql
-- Ajouter les nouvelles colonnes à 'hours'
ALTER TABLE hours 
ADD COLUMN morning_open TEXT DEFAULT '10:00',
ADD COLUMN morning_close TEXT DEFAULT '13:00',
ADD COLUMN afternoon_open TEXT DEFAULT '14:00',
ADD COLUMN afternoon_close TEXT DEFAULT '19:00';

-- Ajouter image_url à 'events'
ALTER TABLE events 
ADD COLUMN image_url TEXT;

-- Ajouter image_url et featured à 'brands'
ALTER TABLE brands 
ADD COLUMN image_url TEXT,
ADD COLUMN featured BOOLEAN DEFAULT false;
```

### Étape 2: Mettre à Jour le Code Local

Les fichiers ont déjà été modifiés:
- ✅ `app/admin/page.jsx` - Interface admin mise à jour
- ✅ `components/Collections.jsx` - Affichage marques avec "Voir plus"
- ✅ `components/EventsSection.jsx` - Images événements
- ✅ `components/Contact.jsx` - Horaires matin/après-midi
- ✅ `schema.sql` - Schéma de base de données

### Étape 3: Tester Localement

```bash
npm run dev
```

Visitez `http://localhost:3000/admin` pour vérifier que:
- ✅ Les horaires affichent 4 champs (matin ouv/ferm, aprè-m ouv/ferm)
- ✅ Les événements ont un champ "URL Image"
- ✅ Les marques ont un champ "URL Image" + checkbox "Afficher dans la mosaïque"
- ✅ Le bouton ⭐ permet de basculer les marques en vedette

---

## 📋 Guide Utilisation Admin

### Horaires
1. Aller à l'onglet **Horaires**
2. Pour chaque jour:
   - Définir **Matin - Ouv.** (ex: 10:00)
   - Définir **Matin - Ferm.** (ex: 13:00)
   - Définir **Aprè-m - Ouv.** (ex: 14:00)
   - Définir **Aprè-m - Ferm.** (ex: 19:00)
   - Cocher "Fermé" si le jour est fermé
3. Cliquer **Enregistrer les horaires**

### Événements
1. Aller à l'onglet **Événements**
2. Remplir le formulaire:
   - Titre * (obligatoire)
   - Type (Concert, Soirée, etc.)
   - Date * (obligatoire)
   - Heure (optionnel)
   - Description (optionnel)
   - **URL Image** (optionnel) - URL complète de l'image (ex: https://example.com/image.jpg)
   - Checkbox "Mettre en avant" pour la bordure colorée
3. Cliquer **+ Ajouter l'événement**
4. Dans la liste: cliquer ⭐ pour mettre en avant, "📷" indique une image

### Marques
1. Aller à l'onglet **Marques**
2. Remplir le formulaire:
   - Nom * (obligatoire)
   - Catégorie (Vêtements, Accessoires, etc.)
   - Description courte (optionnel)
   - **URL Image** (optionnel) - URL complète de l'image
   - **Checkbox "Afficher dans la mosaïque"** - ⭐ pour que la marque s'affiche sur le site
3. Cliquer **+ Ajouter la marque**
4. Dans la liste: cliquer ⭐ pour toggler l'affichage sur le site

---

## 🎨 Sur le Site

### Horaires (Contact)
Affichage: "Lundi 10:00 - 13:00 / 14:00 - 19:00"

### Marques (Collections)
- Les marques **featured** (⭐ cochée) s'affichent dans la mosaïque
- Un bouton **"Voir les X autres marques"** apparaît si des marques ne sont pas featured
- Cliquer sur le bouton pour voir/masquer les autres marques

### Événements (Agenda)
- L'image (si présente) s'affiche en arrière-plan de la carte
- Les autres éléments (date, titre, description) s'affichent par-dessus

---

## 🔧 Ajout d'Images

### Format accepté
- **URL complète**: https://domain.com/image.jpg
- **Formats**: JPG, PNG, GIF, WebP
- **Recommandations**:
  - Marques: 300×300 px pour une mosaïque
  - Événements: 600×400 px pour un bon rendu en background

### Où trouver les URLs?
1. Uploader l'image sur un CDN/hébergeur (ex: Cloudinary, ImgBB, Amazon S3, etc.)
2. Copier l'URL publique
3. Coller dans le champ "URL Image" de l'admin

---

## ⚙️ Notes Techniques

- Les colonnes **anciennement nommées** `open` et `close` dans `hours` peuvent être conservées pour compatibilité ou supprimées via migration supplémentaire
- Les APIs existantes supportent automatiquement les nouveaux champs
- Le système `featured` pour marques fonctionne comme celui des événements
- Les horaires affichent un format de rupture (matin/après-midi) pour améliorer la lisibilité

---

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez que le script de migration a bien été exécuté
2. Vérifiez que les images utilisent des URLs complètes (https://...)
3. Vérifiez que les URLs d'images sont accessibles publiquement
