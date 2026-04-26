"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ImageUploader from "../../components/admin/ImageUploader";

// ─── helpers ──────────────────────────────────────────────────────────────────
function adminHeaders(password) {
  return { "Content-Type": "application/json", "x-admin-password": password };
}

const EVENT_TYPES = ["Concert", "Soirée", "Atelier", "Marché", "Autre"];
const BRAND_CATS  = ["Vêtements", "Accessoires", "Surf & Sport", "Enfants", "Bijoux", "Autre"];
const MONTHS = ["jan","fév","mar","avr","mai","juin","juil","août","sep","oct","nov","déc"];

function fmtDate(str) {
  const d = new Date(str + "T00:00:00");
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg }) {
  return (
    <div className="toast" style={{ opacity: msg ? 1 : 0 }}>
      {msg?.type === "error" ? "❌" : "✓"} {msg?.text}
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true); setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      sessionStorage.setItem("tgr_pass", pass);
      onLogin(pass);
    } else {
      setError(data.error || "Identifiants incorrects.");
    }
  }

  return (
    <div className="adminLoginPage">
      <div className="adminLoginBox">
        <h1>Espace Admin</h1>
        <p className="subtitle">Connectez-vous pour gérer le contenu du site.</p>
        <div className="formGroup">
          <label>Identifiant</label>
          <input type="text" placeholder="admin" value={user} onChange={e => setUser(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="username" />
        </div>
        <div className="formGroup">
          <label>Mot de passe</label>
          <input type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()} autoComplete="current-password" />
        </div>
        {error && <p className="errorMsg">{error}</p>}
        <button className="btnPrimary" onClick={handleLogin} disabled={loading}>
          {loading ? "Connexion…" : "Se connecter"}
        </button>
        <div style={{ marginTop: 20, textAlign: "center" }}>
          <Link href="/" style={{ fontSize: 13, color: "#8A8A80" }}>← Retour au site</Link>
        </div>
      </div>
    </div>
  );
}

// ─── HOURS TAB ────────────────────────────────────────────────────────────────
function HoursTab({ password, showToast }) {
  const [hours,   setHours]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);

  useEffect(() => {
    fetch("/api/admin/hours").then(r => r.json()).then(d => { setHours(d); setLoading(false); });
  }, []);

  function update(id, field, value) {
    setHours(h => h.map(row => row.id === id ? { ...row, [field]: value } : row));
  }

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/hours", {
      method: "PUT",
      headers: adminHeaders(password),
      body: JSON.stringify(hours),
    });
    const data = await res.json();
    setSaving(false);
    showToast(data.ok ? { text: "Horaires enregistrés !" } : { type: "error", text: data.error });
  }

  if (loading) return <div className="spinnerWrap"><div className="spinner" /></div>;

  return (
    <>
      <h2>Horaires</h2>
      <p className="adminSubtitle">Modifiez les horaires affichés sur le site.</p>
      <div className="adminCard">
        <h3>Planning de la semaine</h3>
        <div style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 1fr 1fr 1fr", gap: 10, marginBottom: 12 }}>
          <span />
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)" }}>Matin - Ouv.</span>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)" }}>Matin - Ferm.</span>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)" }}>Aprè-m - Ouv.</span>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)" }}>Aprè-m - Ferm.</span>
          <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-light)" }}>Fermé</span>
        </div>
        {hours.map(h => (
          <div key={h.id} style={{ display: "grid", gridTemplateColumns: "110px 1fr 1fr 1fr 1fr 1fr", gap: 10, marginBottom: 8, alignItems: "center" }}>
            <span style={{ fontSize: 14, fontWeight: 500, color: "var(--text-mid)" }}>{h.day}</span>
            <div className="adminField" style={{ margin: 0 }}>
              <input value={h.morning_open || ""} onChange={e => update(h.id, "morning_open", e.target.value)} disabled={h.is_closed} style={{ opacity: h.is_closed ? 0.4 : 1 }} placeholder="10:00" />
            </div>
            <div className="adminField" style={{ margin: 0 }}>
              <input value={h.morning_close || ""} onChange={e => update(h.id, "morning_close", e.target.value)} disabled={h.is_closed} style={{ opacity: h.is_closed ? 0.4 : 1 }} placeholder="13:00" />
            </div>
            <div className="adminField" style={{ margin: 0 }}>
              <input value={h.afternoon_open || ""} onChange={e => update(h.id, "afternoon_open", e.target.value)} disabled={h.is_closed} style={{ opacity: h.is_closed ? 0.4 : 1 }} placeholder="14:00" />
            </div>
            <div className="adminField" style={{ margin: 0 }}>
              <input value={h.afternoon_close || ""} onChange={e => update(h.id, "afternoon_close", e.target.value)} disabled={h.is_closed} style={{ opacity: h.is_closed ? 0.4 : 1 }} placeholder="19:00" />
            </div>
            <div className="checkboxRow">
              <input type="checkbox" id={`closed-${h.id}`} checked={h.is_closed} onChange={e => update(h.id, "is_closed", e.target.checked)} />
              <label htmlFor={`closed-${h.id}`}>Fermé</label>
            </div>
          </div>
        ))}
      </div>
      <button className="btnSave" onClick={save} disabled={saving}>{saving ? "Enregistrement…" : "Enregistrer les horaires"}</button>
    </>
  );
}

// ─── EVENTS TAB ───────────────────────────────────────────────────────────────
function EventsTab({ password, showToast }) {
  const [events,  setEvents]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({ title: "", event_date: "", event_time: "", type: "Concert", description: "", featured: false, image_url: "" });

  const reload = useCallback(() => {
    fetch("/api/admin/events").then(r => r.json()).then(d => { setEvents(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  useEffect(() => { reload(); }, [reload]);

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function addEvent() {
    if (!form.title || !form.event_date) return showToast({ type: "error", text: "Titre et date obligatoires." });
    setSaving(true);
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: adminHeaders(password),
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (data.id) {
      setForm({ title: "", event_date: "", event_time: "", type: "Concert", description: "", featured: false, image_url: "" });
      reload();
      showToast({ text: "Événement ajouté !" });
    } else {
      showToast({ type: "error", text: data.error });
    }
  }

  async function deleteEvent(id) {
    if (!confirm("Supprimer cet événement ?")) return;
    await fetch("/api/admin/events", { method: "DELETE", headers: adminHeaders(password), body: JSON.stringify({ id }) });
    reload();
    showToast({ text: "Événement supprimé." });
  }

  async function toggleFeatured(ev) {
    await fetch("/api/admin/events", { method: "PATCH", headers: adminHeaders(password), body: JSON.stringify({ id: ev.id, featured: !ev.featured }) });
    reload();
  }

  return (
    <>
      <h2>Événements</h2>
      <p className="adminSubtitle">Concerts, soirées, ateliers… gérez l&apos;agenda de la boutique.</p>

      {/* Add form */}
      <div className="adminCard">
        <h3>Ajouter un événement</h3>
        <div className="adminGrid2">
          <div className="adminField">
            <label>Titre *</label>
            <input value={form.title} onChange={e => setF("title", e.target.value)} placeholder="Concert acoustique" />
          </div>
          <div className="adminField">
            <label>Type</label>
            <select value={form.type} onChange={e => setF("type", e.target.value)}>
              {EVENT_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="adminField">
            <label>Date *</label>
            <input type="date" value={form.event_date} onChange={e => setF("event_date", e.target.value)} />
          </div>
          <div className="adminField">
            <label>Heure (optionnel)</label>
            <input type="time" value={form.event_time} onChange={e => setF("event_time", e.target.value)} />
          </div>
        </div>
        <div className="adminField">
          <label>Description (optionnel)</label>
          <textarea value={form.description} onChange={e => setF("description", e.target.value)} placeholder="Un concert en plein air devant la boutique…" rows={3} />
        </div>
        <ImageUploader value={form.image_url} onChange={v => setF("image_url", v)} password={password} label="Image de l'événement (optionnel)" />
        <div className="checkboxRow" style={{ marginBottom: 20 }}>
          <input type="checkbox" id="featured" checked={form.featured} onChange={e => setF("featured", e.target.checked)} />
          <label htmlFor="featured">Mettre en avant (bordure colorée sur la carte)</label>
        </div>
        <button className="btnAdd" onClick={addEvent} disabled={saving}>{saving ? "Ajout…" : "+ Ajouter l'événement"}</button>
      </div>

      {/* List */}
      <div className="adminCard">
        <h3>Événements à venir ({events.length})</h3>
        {loading ? (
          <div className="spinnerWrap"><div className="spinner" /></div>
        ) : events.length === 0 ? (
          <p style={{ color: "var(--text-light)", fontSize: 14 }}>Aucun événement pour le moment.</p>
        ) : (
          <div className="itemList">
            {events.map(ev => (
              <div className="itemRow" key={ev.id}>
                <div className="itemRowInfo">
                  <strong>{ev.title}</strong>
                  <span>{ev.type} · {fmtDate(ev.event_date)}{ev.event_time ? ` à ${ev.event_time}` : ""}{ev.featured ? " · ⭐ mis en avant" : ""}{ev.image_url ? " · 📷" : ""}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => toggleFeatured(ev)}
                    style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 13, color: ev.featured ? "var(--coral)" : "var(--text-light)" }}
                    title={ev.featured ? "Retirer la mise en avant" : "Mettre en avant"}
                  >⭐</button>
                  <button className="btnRemove" onClick={() => deleteEvent(ev.id)} title="Supprimer">×</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── BRANDS TAB ───────────────────────────────────────────────────────────────
function BrandsTab({ password, showToast }) {
  const [brands,  setBrands]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({ name: "", category: "Vêtements", description: "", image_url: "", featured: false });

  const reload = useCallback(() => {
    fetch("/api/admin/brands").then(r => r.json()).then(d => { setBrands(Array.isArray(d) ? d : []); setLoading(false); });
  }, []);

  useEffect(() => { reload(); }, [reload]);

  function setF(k, v) { setForm(f => ({ ...f, [k]: v })); }

  async function addBrand() {
    if (!form.name) return showToast({ type: "error", text: "Le nom de la marque est obligatoire." });
    setSaving(true);
    const res = await fetch("/api/admin/brands", {
      method: "POST",
      headers: adminHeaders(password),
      body: JSON.stringify({ ...form, sort_order: brands.length }),
    });
    const data = await res.json();
    setSaving(false);
    if (data.id) {
      setForm({ name: "", category: "Vêtements", description: "", image_url: "", featured: false });
      reload();
      showToast({ text: "Marque ajoutée !" });
    } else {
      showToast({ type: "error", text: data.error });
    }
  }

  async function deleteBrand(id) {
    if (!confirm("Supprimer cette marque ?")) return;
    await fetch("/api/admin/brands", { method: "DELETE", headers: adminHeaders(password), body: JSON.stringify({ id }) });
    reload();
    showToast({ text: "Marque supprimée." });
  }

  async function toggleFeatured(brand) {
    await fetch("/api/admin/brands", { method: "PATCH", headers: adminHeaders(password), body: JSON.stringify({ id: brand.id, featured: !brand.featured }) });
    reload();
  }

  return (
    <>
      <h2>Marques</h2>
      <p className="adminSubtitle">Gérez les marques proposées dans la boutique.</p>

      <div className="adminCard">
        <h3>Ajouter une marque</h3>
        <div className="adminGrid2">
          <div className="adminField">
            <label>Nom *</label>
            <input value={form.name} onChange={e => setF("name", e.target.value)} placeholder="Quiksilver" />
          </div>
          <div className="adminField">
            <label>Catégorie</label>
            <select value={form.category} onChange={e => setF("category", e.target.value)}>
              {BRAND_CATS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="adminField">
          <label>Description courte (optionnel)</label>
          <input value={form.description} onChange={e => setF("description", e.target.value)} placeholder="Surf & beachwear" />
        </div>
        <ImageUploader value={form.image_url} onChange={v => setF("image_url", v)} password={password} label="Logo/Image de la marque (optionnel)" />
        <div className="checkboxRow" style={{ marginBottom: 20 }}>
          <input type="checkbox" id="brandFeatured" checked={form.featured} onChange={e => setF("featured", e.target.checked)} />
          <label htmlFor="brandFeatured">Afficher dans la mosaïque (mise en avant)</label>
        </div>
        <button className="btnAdd" onClick={addBrand} disabled={saving}>{saving ? "Ajout…" : "+ Ajouter la marque"}</button>
      </div>

      <div className="adminCard">
        <h3>Marques en boutique ({brands.length})</h3>
        {loading ? (
          <div className="spinnerWrap"><div className="spinner" /></div>
        ) : brands.length === 0 ? (
          <p style={{ color: "var(--text-light)", fontSize: 14 }}>Aucune marque ajoutée.</p>
        ) : (
          <div className="itemList">
            {brands.map(b => (
              <div className="itemRow" key={b.id}>
                <div className="itemRowInfo">
                  <strong>{b.name}</strong>
                  <span>{b.category}{b.description ? ` · ${b.description}` : ""}{b.featured ? " · ⭐ visible" : ""}{b.image_url ? " · 📷" : ""}</span>
                </div>
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  <button
                    onClick={() => toggleFeatured(b)}
                    style={{ background: "none", border: "1px solid #ddd", borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontSize: 13, color: b.featured ? "var(--coral)" : "var(--text-light)" }}
                    title={b.featured ? "Masquer de la mosaïque" : "Afficher dans la mosaïque"}
                  >⭐</button>
                  <button className="btnRemove" onClick={() => deleteBrand(b.id)}>×</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const TABS = [
  {
    id: "hours", label: "Horaires",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  },
  {
    id: "events", label: "Événements",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  },
  {
    id: "brands", label: "Marques",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><circle cx="7" cy="7" r="1.5"/></svg>,
  },
];

function Dashboard({ password, onLogout }) {
  const [tab,     setTab]     = useState("hours");
  const [toast,   setToast]   = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="adminLayout">
      <aside className="adminSidebar">
        <div className="sidebarLogo">
          The <span>Green</span> Room
          <small>Administration</small>
        </div>
        <nav className="sidebarNav">
          {TABS.map(t => (
            <button key={t.id} className={`sidebarBtn ${tab === t.id ? "active" : ""}`} onClick={() => setTab(t.id)}>
              {t.icon}{t.label}
            </button>
          ))}
        </nav>
        <div className="sidebarFooter">
          <button className="btnLogout" onClick={onLogout}>Déconnexion</button>
          <Link href="/">← Voir le site</Link>
        </div>
      </aside>

      <main className="adminMain">
        {tab === "hours"  && <HoursTab  password={password} showToast={showToast} />}
        {tab === "events" && <EventsTab password={password} showToast={showToast} />}
        {tab === "brands" && <BrandsTab password={password} showToast={showToast} />}
      </main>

      <Toast msg={toast} />
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("tgr_pass");
    if (saved) setPassword(saved);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("tgr_pass");
    setPassword(null);
  }

  if (!password) return <LoginScreen onLogin={setPassword} />;
  return <Dashboard password={password} onLogout={handleLogout} />;
}
