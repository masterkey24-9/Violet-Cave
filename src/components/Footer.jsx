export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <h4>Violet Cave</h4>
          <p>Warung makan dengan berbagai pilihan menu ayam, nasi, mie, dan minuman segar.</p>
          <div className="social-row">
            <a className="social-icon" href="#" aria-label="Instagram">📷</a>
            <a className="social-icon" href="#" aria-label="Facebook">📘</a>
          </div>
        </div>
        <div>
          <h4>Kontak</h4>
          <ul className="footer-list">
            <li>📞 0852-7464-8882<br />0812-6689-1640</li>
            <li>📍 Lokasi warung kami</li>
            <li>🕒 Buka setiap hari, 07:30 – 15:00</li>
          </ul>
        </div>
        <div>
          <h4>Pengiriman</h4>
          <div className="footer-note">
            Gratis ongkir untuk pesanan ke kos-kosan atau pesanan dalam jumlah banyak.
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Violet Cave. All rights reserved.</span>
        <span style={{ display: 'flex', gap: 18 }}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
