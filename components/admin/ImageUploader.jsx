import { useState } from "react";

export default function ImageUploader({ value, onChange, password, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  async function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "events");

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: { "x-admin-password": password },
        body: formData,
      });
      const data = await res.json();
      setUploading(false);

      if (data.ok && data.publicUrl) {
        onChange(data.publicUrl);
        setPreview(data.publicUrl);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploading(false);
    }
  }

  return (
    <div className="adminField">
      <label>{label}</label>
      <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            disabled={uploading}
            style={{ width: "100%", cursor: uploading ? "not-allowed" : "pointer" }}
          />
          {uploading && <small style={{ color: "var(--green-mid)" }}>Upload en cours…</small>}
          {value && !uploading && (
            <small style={{ color: "var(--text-light)" }}>✓ Image définie</small>
          )}
        </div>
        {preview && (
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 4,
              overflow: "hidden",
              background: "var(--bg-light)",
            }}
          >
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
