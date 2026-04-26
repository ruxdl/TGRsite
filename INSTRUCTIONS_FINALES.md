# 🚀 INSTRUCTIONS FINALES - The Green Room

## ✅ Tout est Prêt!

Toutes les modifications ont été effectuées. Voici ce qu'il faut faire maintenant:

---

## 📋 ÉTAPE 1: Mettre à Jour la Base de Données Supabase

**⚠️ CRITIQUE - À faire en premier!**

1. Ouvrez [Supabase Dashboard](https://supabase.com)
2. Allez dans votre projet
3. Cliquez sur **SQL Editor** → **New Query**
4. Copiez-collez ce code:

```sql
-- Modifier la table 'hours' pour ajouter horaires matin/après-midi
ALTER TABLE hours 
ADD COLUMN morning_open TEXT DEFAULT '10:00',
ADD COLUMN morning_close TEXT DEFAULT '13:00',
ADD COLUMN afternoon_open TEXT DEFAULT '14:00',
ADD COLUMN afternoon_close TEXT DEFAULT '19:00';

-- Ajouter colonne image aux événements
ALTER TABLE events 
ADD COLUMN image_url TEXT;

-- Ajouter colonnes image et featured aux marques
ALTER TABLE brands 
ADD COLUMN image_url TEXT,
ADD COLUMN featured BOOLEAN DEFAULT false;
```

5. Cliquez sur **▶️ Run** (bouton vert en haut à droite)
6. Attendez que la requête se termine ✅

**Résultat attendu:** "Successfully executed"

---

## 🖥️ ÉTAPE 2: Vérifier le Code Local

Le code a déjà été mis à jour. Les fichiers suivants ont été modifiés:

✅ `app/admin/page.jsx` - Interface admin complète
✅ `components/Collections.jsx` - Marques avec "voir plus"
✅ `components/EventsSection.jsx` - Images pour événements
✅ `components/Contact.jsx` - Horaires matin/après-midi
✅ `schema.sql` - Schéma de base de données

---

## 🧪 ÉTAPE 3: Tester Localement

1. Dans votre terminal, à la racine du projet:

```bash
npm run dev
```

2. Ouvrez [http://localhost:3000/admin](http://localhost:3000/admin) dans votre navigateur

3. Connectez-vous avec vos identifiants admin

4. Vérifiez que vous voyez:
   - ✅ Tab "Horaires" avec 4 colonnes par jour
   - ✅ Tab "Événements" avec champ "URL Image"
   - ✅ Tab "Marques" avec champ "URL Image" et checkbox "Afficher dans la mosaïque"

5. Cliquez sur l'onglet "Marques" et vérifiez:
   - Vous voyez un bouton ⭐ à côté de chaque marque
   - Vous pouvez cocher "Afficher dans la mosaïque"

---

## ➕ ÉTAPE 4: Ajouter vos Données

### Horaires
1. Cliquez sur **Horaires**
2. Pour lundi par exemple:
   - Matin - Ouv.: **10:00**
   - Matin - Ferm.: **13:00**
   - Aprè-m - Ouv.: **14:00**
   - Aprè-m - Ferm.: **19:00**
3. Cliquez **Enregistrer les horaires**

### Événement Exemple
1. Cliquez sur **Événements**
2. Remplissez:
   - Titre: "Concert Jazz" *
   - Type: Concert
   - Date: 2025-05-15 *
   - Heure: 20:00
   - Description: Concert en direct
   - **URL Image**: https://example.com/jazz.jpg
   - ✓ Mettre en avant (si vous voulez)
3. Cliquez **+ Ajouter l'événement**

### Marque Exemple
1. Cliquez sur **Marques**
2. Remplissez:
   - Nom: "Rip Curl" *
   - Catégorie: Surf & Sport
   - Description: Vêtements de surf
   - **URL Image**: https://example.com/ripcurl.jpg
   - ✓ Afficher dans la mosaïque (pour que ça s'affiche sur le site)
3. Cliquez **+ Ajouter la marque**

---

## 👀 ÉTAPE 5: Voir le Résultat sur le Site

1. Allez à [http://localhost:3000](http://localhost:3000)

2. Vérifiez:
   - **Horaires** (footer/contact): "Lundi 10:00 - 13:00 / 14:00 - 19:00"
   - **Marques** (section Collections): Seules les marques avec ⭐ cochée s'affichent
   - **Bouton "Voir plus"**: S'affiche si vous avez d'autres marques non affichées
   - **Événements** (section Agenda): Les images s'affichent si présentes

---

## 📸 Où Trouver des URLs d'Images?

Option 1: **ImgBB** (gratuit, sans inscription requise)
- Allez à https://imgbb.com
- Uploadez votre image
- Copiez le lien sous "Direct link" ou "Hotlink"
- Collez dans le champ "URL Image"

Option 2: **Votre propre hébergeur**
- Si vous avez un serveur, mettez l'image là-bas
- Copiez l'URL complète (https://...)

**Important:** L'URL doit commencer par `https://`

---

## ⚙️ Commandes Utiles

```bash
# Démarrer le serveur dev
npm run dev

# Build pour production
npm run build

# Démarrer après un build
npm run start
```

---

## 🔗 Schéma des Modifications

```
┌─────────────────────────────────────────┐
│         SCHEMA.SQL (Supabase)            │
├─────────────────────────────────────────┤
│ hours                                    │
│  - morning_open, morning_close (NEW)    │
│  - afternoon_open, afternoon_close (NEW)│
│                                          │
│ events                                   │
│  - image_url (NEW)                      │
│  - featured (existing)                  │
│                                          │
│ brands                                   │
│  - image_url (NEW)                      │
│  - featured (NEW)                       │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    ADMIN PAGE (app/admin/page.jsx)      │
├─────────────────────────────────────────┤
│ HoursTab: 4 champs par jour             │
│ EventsTab: + image_url field            │
│ BrandsTab: + image_url + featured ⭐   │
└─────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────┐
│    SITE (components/)                   │
├─────────────────────────────────────────┤
│ Collections: Affiche featured           │
│             + "Voir plus" button        │
│                                          │
│ EventsSection: Images en background    │
│                                          │
│ Contact: Horaires matin/après-midi     │
└─────────────────────────────────────────┘
```

---

## ❓ Questions Fréquentes

**Q: Les images ne s'affichent pas?**
A: Vérifiez que:
- L'URL commence par https://
- L'URL est publiquement accessible (testez dans un navigateur incognito)

**Q: Les marques n'apparaissent pas?**
A: Vérifiez que:
- Vous avez coché la checkbox "Afficher dans la mosaïque" (⭐)
- La marque a été créée avec succès (vérifiez la liste)

**Q: Les horaires affichent encore l'ancien format?**
A: Vérifiez que:
- Vous avez exécuté la migration Supabase
- Vous avez actualisé la page (Ctrl+R ou Cmd+R)

**Q: Comment revenir à l'ancien format d'horaires?**
A: Vous pouvez facilement modifier le format dans `components/Contact.jsx`

---

## 📞 Prochaines Étapes

1. ✅ **Exécuter la migration Supabase** (URGENT)
2. ✅ **Tester localement** avec `npm run dev`
3. ✅ **Ajouter vos données** via l'interface admin
4. ✅ **Vérifier le site** pour voir le résultat
5. 🚀 **Déployer** quand tout est prêt

---

## ✨ Vous Êtes Prêt!

C'est tout ce qu'il y a à faire. Le système est:
- ✅ Flexible
- ✅ Facile à gérer
- ✅ Scalable
- ✅ Beau

Enjoy! 🎉
