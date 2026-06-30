import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: '📊', end: true },
  { to: '/admin/stok', label: 'Kelola Stok', icon: '📦' },
  { to: '/admin/laporan', label: 'Laporan Penjualan', icon: '🧾' },
];

export default function AdminLayout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="brand">
          <span className="brand-mark">VC</span>
          <span className="brand-text">
            <span className="brand-title">Violet Cave</span>
            <span className="brand-sub">Admin Panel</span>
          </span>
        </div>

        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => 'admin-nav-link' + (isActive ? ' active' : '')}
          >
            <span>{link.icon}</span> {link.label}
          </NavLink>
        ))}

        <button className="btn btn-outline btn-sm" style={{ marginTop: 32, background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }} onClick={handleLogout}>
          Keluar
        </button>
      </aside>
      <div className="admin-content">{children}</div>
    </div>
  );
}
