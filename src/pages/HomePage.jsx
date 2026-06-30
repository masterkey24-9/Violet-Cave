import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES } from '../data/menuData';

const STEPS = [
  { n: '1', cls: 'n1', title: 'Daftar & Pilih Menu', desc: 'Buat akun dengan mudah, lalu jelajahi berbagai kategori menu favorit Anda' },
  { n: '2', cls: 'n2', title: 'Pesan via WhatsApp', desc: 'Checkout mudah. Kirim pesanan langsung ke WhatsApp kami atau transfer bank' },
  { n: '3', cls: 'n3', title: 'Gratis ongkir', desc: 'Nikmati kemudahan gratis ongkir khusus untuk pesanan kos atau jumlah banyak' },
];

export default function HomePage() {
  const { user, isAdmin } = useAuth();
  const loggedIn = !!user && !isAdmin;

  return (
    <>
      <section className="hero">
        <h1>Selamat datang<br />di <span>Violet Cave</span></h1>
        <p>Nikmati berbagai pilihan menu ayam, nasi, mie, dan minuman segar dengan harga terjangkau. {loggedIn ? 'Yuk mulai pesan menu favoritmu.' : 'Daftar sekarang untuk mulai memesan.'}</p>
        <div className="hero-actions">
          {loggedIn ? (
            <Link to="/menu" className="btn btn-primary">🍽️ Lihat Menu</Link>
          ) : (
            <>
              <Link to="/daftar" className="btn btn-primary">👤 Daftar Sekarang</Link>
              <Link to="/masuk" className="btn btn-outline">→ Masuk untuk Melanjutkan</Link>
            </>
          )}
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Pilih kategori favorit</h2>
          <p>Jelajahi berbagai pilihan menu kami yang lezat</p>
        </div>
        <div className="grid-categories">
          {CATEGORIES.map((cat) => (
            <div className="cat-card" key={cat.id}>
              <div className="cat-icon" style={{ background: cat.tint }}>{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              {loggedIn ? (
                <Link to={`/menu?kategori=${cat.id}`} className="cat-link">Lihat menu →</Link>
              ) : (
                <Link to="/masuk" className="cat-link">Login untuk melihat →</Link>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="section section-soft">
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.n}>
              <div className={'step-num ' + s.cls}>{s.n}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
