import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const { user, logout, isAdmin } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link to="/" className="brand">
          <span className="brand-mark">VC</span>
          <span className="brand-text">
            <span className="brand-title">Violet Cave</span>
            <span className="brand-sub">Warung Makan</span>
          </span>
        </Link>

        <nav className="nav-actions">
          <NavLink to="/" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Home</NavLink>
          {user && !isAdmin && (
            <NavLink to="/menu" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Menu</NavLink>
          )}
          {user && !isAdmin && (
            <NavLink to="/riwayat" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Riwayat</NavLink>
          )}
          {isAdmin && (
            <NavLink to="/admin" className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>Dashboard</NavLink>
          )}

          {user && !isAdmin && (
            <Link to="/keranjang" className="cart-badge-wrap nav-link" aria-label="Keranjang">
              🛒
              {count > 0 && <span className="cart-badge">{count}</span>}
            </Link>
          )}

          {!user && (
            <>
              <Link to="/masuk" className="nav-link">Masuk</Link>
              <Link to="/daftar" className="btn btn-primary btn-sm">Daftar</Link>
            </>
          )}

          {user && (
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Keluar</button>
          )}
        </nav>
      </div>
    </header>
  );
}
