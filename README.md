# The Green Room – Site Next.js + Supabase

Site vitrine de **The Green Room**, boutique de vêtements et accessoires à Montalivet-les-Bains.  
L'admin peut gérer en temps réel les **horaires**, les **événements** et les **marques** depuis `/admin`.

---

## 🚀 Mise en place de A à Z

### Étape 1 — Créer le projet Supabase

1. Aller sur [supabase.com](https://supabase.com) → **Start your project**
2. Créer un compte (GitHub recommandé) → **New project**
3. Choisir un nom (ex: `the-green-room`), un mot de passe de DB, la région **West EU (Paris)**
4. Attendre 1-2 minutes que le projet démarre

### Étape 2 — Créer les tables

1. Dans le Dashboard Supabase → **SQL Editor** → **New query**
2. Copier-coller tout le contenu de `schema.sql`
3. Cliquer **Run** (▶)
4. Vérifier dans **Table Editor** que les tables `hours`, `events`, `brands` existent

### Étape 3 — Récupérer les clés API

Dans **Project Settings** → **API** :

| Variable | Où la trouver |
|----------|--------------|
| `NEXT_PUBLIC_SUPABASE_URL` | "Project URL" |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | "Project API keys" → `anon` `public` |
| `SUPABASE_SERVICE_ROLE_KEY` | "Project API keys" → `service_role` (⚠️ secret) |

### Étape 4 — Configurer les variables locales

```bash
# À la racine du projet
cp .env.local.example .env.local
```

Ouvrir `.env.local` et remplir :

```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefgh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

ADMIN_USERNAME=admin
ADMIN_PASSWORD=greenroom2025
```

> ⚠️ Ne jamais committer `.env.local` sur Git. Il est déjà dans `.gitignore`.

### Étape 5 — Lancer en local

```bash
npm install
npm run dev
```

- Site public → [http://localhost:3000](http://localhost:3000)  
- Admin → [http://localhost:3000/admin](http://localhost:3000/admin)

---

## 🌐 Déployer sur Vercel (recommandé)

1. Pousser le code sur **GitHub** (créer un repo, `git push`)
2. Aller sur [vercel.com](https://vercel.com) → **New Project** → importer le repo
3. Dans **Environment Variables**, ajouter les 5 variables de `.env.local`
4. Cliquer **Deploy** → le site est en ligne en 2 minutes ✅

À chaque `git push`, Vercel redéploie automatiquement.

---

## 🔑 Interface Admin

URL : `votre-site.vercel.app/admin`  
Lien discret "Admin" en bas de page (footer).

### Ce que l'admin peut faire

| Onglet | Actions |
|--------|---------|
| **Horaires** | Modifier l'heure d'ouverture/fermeture de chaque jour, cocher "Fermé" |
| **Événements** | Ajouter un concert/soirée/atelier avec date, heure, type et description. Mettre en avant ⭐. Supprimer. |
| **Marques** | Ajouter une marque avec catégorie et description courte. Supprimer. |

Toutes les modifications sont **instantanément visibles** sur le site public.

---

## 📁 Structure du projet

```
tgr/
├── schema.sql                        ← Script SQL à coller dans Supabase
├── .env.local.example                ← Template des variables d'environnement
│
├── lib/
│   ├── supabase.js                   ← Client public (lecture, côté client)
│   └── supabaseServer.js             ← Client admin (écriture, côté serveur uniquement)
│
├── app/
│   ├── layout.jsx                    ← Fonts + métadonnées SEO
│   ├── page.jsx                      ← Page d'accueil
│   ├── globals.css                   ← Tous les styles
│   │
│   ├── api/admin/
│   │   ├── login/route.js            ← POST – vérification identifiants
│   │   ├── hours/route.js            ← GET (public) + PUT (admin)
│   │   ├── events/route.js           ← GET + POST + PATCH + DELETE
│   │   └── brands/route.js           ← GET + POST + PATCH + DELETE
│   │
│   └── admin/
│       └── page.jsx                  ← Dashboard admin (login + 3 onglets)
│
└── components/
    ├── Navbar.jsx                    ← Navigation sticky + mobile
    ├── EventsBanner.jsx              ← Bandeau défilant avec les prochains événements
    ├── Hero.jsx                      ← Section principale plein écran
    ├── About.jsx                     ← Histoire de la boutique
    ├── Collections.jsx               ← Grille des collections
    ├── EventsSection.jsx             ← Agenda des événements (depuis Supabase)
    ├── BrandsSection.jsx             ← Marques en boutique (depuis Supabase)
    ├── Ambiance.jsx                  ← Esprit de la boutique
    ├── Contact.jsx                   ← Coordonnées + horaires (depuis Supabase)
    ├── Footer.jsx                    ← Pied de page + lien Admin
    └── FadeIn.jsx                    ← Animation scroll réutilisable
```

---

## 🔒 Sécurité

- La clé `service_role` (écriture Supabase) n'est **jamais** exposée côté client
- Toutes les mutations admin passent par des **API routes Next.js** côté serveur
- Ces routes vérifient le mot de passe admin via l'header `x-admin-password`
- La session admin est stockée en `sessionStorage` (effacée à la fermeture du navigateur)

---

## 🛠 Changer les identifiants admin

Modifier `.env.local` (local) ou les variables d'environnement Vercel :

```env
ADMIN_USERNAME=nouveau_nom
ADMIN_PASSWORD=nouveau_mot_de_passe_fort
```

Puis redéployer (`git push`).
