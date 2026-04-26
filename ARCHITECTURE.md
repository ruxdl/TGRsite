# 🏗️ ARCHITECTURE DES MODIFICATIONS

## Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                    THE GREEN ROOM v2.0                       │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                      SUPABASE (Backend)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  hours (Table)                events (Table)                │
│  ├── id                        ├── id                       │
│  ├── day                        ├── title                   │
│  ├── morning_open ✨            ├── event_date             │
│  ├── morning_close ✨           ├── type                   │
│  ├── afternoon_open ✨          ├── description            │
│  ├── afternoon_close ✨         ├── featured               │
│  ├── is_closed                  └── image_url ✨           │
│  └── sort_order                                             │
│                                 brands (Table)              │
│                                 ├── id                      │
│                                 ├── name                    │
│                                 ├── category                │
│                                 ├── description             │
│                                 ├── image_url ✨            │
│                                 ├── featured ✨             │
│                                 ├── sort_order              │
│                                 └── created_at              │
│                                                               │
│  ✨ = Nouvelles colonnes                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
           ↑                    ↓ API Routes
           │              /api/admin/hours
           │              /api/admin/events
           │              /api/admin/brands
           │
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Frontend (Client)                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Page Admin (app/admin/page.jsx)                            │
│  ├─ HoursTab ✨                                             │
│  │  ├─ Input: morning_open, morning_close                 │
│  │  ├─ Input: afternoon_open, afternoon_close             │
│  │  └─ Save → PUT /api/admin/hours                        │
│  │                                                           │
│  ├─ EventsTab ✨                                           │
│  │  ├─ Input: image_url                                   │
│  │  ├─ Toggle: featured (⭐ button)                       │
│  │  └─ Save → POST/PATCH /api/admin/events               │
│  │                                                           │
│  └─ BrandsTab ✨                                           │
│     ├─ Input: image_url                                   │
│     ├─ Toggle: featured (⭐ button)                       │
│     └─ Save → POST/PATCH /api/admin/brands               │
│                                                               │
│  Public Site (app/page.jsx)                                 │
│  ├─ Collections ✨                                          │
│  │  ├─ GET /api/admin/brands                              │
│  │  ├─ Filter: featured = true                            │
│  │  ├─ Display: Marques featured en mosaïque             │
│  │  └─ Button: "Voir les X autres" → Affiche autres      │
│  │                                                           │
│  ├─ EventsSection ✨                                       │
│  │  ├─ GET /api/admin/events                              │
│  │  ├─ Display: background-image = image_url             │
│  │  └─ Filter: featured pour bordure colorée             │
│  │                                                           │
│  └─ Contact                                                │
│     ├─ GET /api/admin/hours                               │
│     ├─ Format: "10:00-13:00 / 14:00-19:00"              │
│     └─ Display: Horaires matin/après-midi                │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Flux de Données

### Horaires
```
Admin: Input horaires
  ↓ (4 champs par jour)
Save → PUT /api/admin/hours
  ↓
Supabase: UPDATE hours
  ↓
GET /api/admin/hours
  ↓
Contact.jsx: Affiche "10:00-13:00 / 14:00-19:00"
  ↓
Utilisateur voit horaires matin/après-midi sur site
```

### Événements
```
Admin: Input événement + image_url + featured
  ↓
Save → POST /api/admin/events
  ↓
Supabase: INSERT events (avec image_url, featured)
  ↓
GET /api/admin/events
  ↓
EventsSection.jsx
  ├─ Style background: url(image_url)
  └─ Class eventFeatured si featured=true
  ↓
Utilisateur voit événement avec image en background
```

### Marques
```
Admin: Input marque + image_url + checkbox featured
  ↓
Save → POST /api/admin/brands
  ↓
Supabase: INSERT brands (avec image_url, featured)
  ↓
Collections.jsx
  ├─ Filter: featured=true → Affiche en mosaïque
  ├─ Filter: featured=false → Regroupe "Voir plus"
  └─ Button: "Voir les X autres" ← Toggle affichage
  ↓
Utilisateur voit marques featured + bouton voir plus
```

---

## Component Tree

```
page.jsx
├── Navbar
├── Hero
├── EventsBanner
├── About
├── Collections ✨
│   ├── Brand Card (featured)
│   │   └── Image + Name + Category
│   ├── Button: "Voir plus"
│   └── Brand Card (autres) [hidden by default]
│       └── Image + Name + Category
│
├── EventsSection ✨
│   └── Event Card
│       ├── Background Image
│       ├── Date Badge
│       ├── Type Pill
│       └── Title + Description
│
├── Contact ✨
│   └── Hours Card
│       ├── Monday: 10:00-13:00 / 14:00-19:00
│       ├── Tuesday: 10:00-13:00 / 14:00-19:00
│       └── ...
│
└── Footer
```

---

## État du State Management

```
HoursTab
├── hours: Array
│   └── { id, day, morning_open, morning_close, 
│          afternoon_open, afternoon_close, is_closed }
└── loading, saving

EventsTab
├── events: Array
│   └── { id, title, event_date, event_time, type,
│          description, featured, image_url }
└── form, loading, saving

BrandsTab
├── brands: Array
│   └── { id, name, category, description,
│          image_url, featured, sort_order }
└── form, loading, saving

Collections (client)
├── brands: Array (du même schéma)
├── loading
└── showAll: Boolean (toggle "voir plus")
```

---

## API Endpoints (Inchangés)

```
GET  /api/admin/hours        → Lit les horaires
PUT  /api/admin/hours        → Met à jour horaires

GET  /api/admin/events       → Lit événements
POST /api/admin/events       → Crée événement
PATCH /api/admin/events      → Met à jour événement
DELETE /api/admin/events     → Supprime événement

GET  /api/admin/brands       → Lit marques
POST /api/admin/brands       → Crée marque
PATCH /api/admin/brands      → Met à jour marque
DELETE /api/admin/brands     → Supprime marque

Les APIs fonctionnent automatiquement avec les nouveaux champs!
```

---

## Validation des Données

```
Horaires
├── morning_open: TEXT (format: "10:00")
├── morning_close: TEXT (format: "13:00")
├── afternoon_open: TEXT (format: "14:00")
└── afternoon_close: TEXT (format: "19:00")

Événements
├── title: TEXT (requis)
├── event_date: DATE (requis)
├── image_url: TEXT (optionnel, doit commencer par https://)
└── featured: BOOLEAN (défaut: false)

Marques
├── name: TEXT (requis)
├── image_url: TEXT (optionnel, doit commencer par https://)
└── featured: BOOLEAN (défaut: false)
```

---

## Dépendances (Aucune nouvelle)

```
Existantes:
✅ @supabase/supabase-js
✅ react
✅ next
✅ react-dom

Aucune nouvelle dépendance ajoutée!
```

---

## Performance

```
Impact Performance: MINIMAL ✅

Images
├─ Lazy loading via background-image
├─ CSS background-size: cover
└─ Optimisation automatique du navigateur

Requêtes DB
├─ Mêmes endpoints qu'avant
├─ Colonnes additionnelles très légères
└─ Index existants toujours actifs

Taille du Bundle
├─ +0 KB (pas de new libs)
├─ Légère augmentation du JS React
└─ Compensée par optimisation du bundler
```

---

## Sécurité

```
✅ Authentification admin conservée
✅ RLS Supabase inchangé
✅ Validation URLs images client-side
✅ CORS configuré
✅ Service role bypass conservé
```

---

## Scalabilité Future

```
Prêt pour:
├─ Plus de marques (pagination facile à ajouter)
├─ Upload direct d'images (remplacer URLs)
├─ Analytics (featured vs non-featured)
├─ A/B testing (différents arrangements)
└─ Multi-language (colonnes i18n)
```

---

**Architecture clean, moderne et maintenable** ✨
