import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footerLogo">The <span>Green</span> Room</div>
      <p>© {new Date().getFullYear()} The Green Room — Montalivet-les-Bains</p>
      <Link href="/admin" className="footerAdmin">Admin</Link>
    </footer>
  );
}
