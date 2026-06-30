import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ phone: '', password: '' });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const result = login(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const redirectTo = location.state?.from;
    navigate(redirectTo && redirectTo !== '/masuk' ? redirectTo : '/menu');
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Masuk</h1>
        <p className="sub">Masuk untuk mulai memesan menu favoritmu</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="phone">Nomor HP</label>
            <input
              id="phone"
              type="text"
              placeholder="08xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password">Kata sandi</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Masuk</button>
        </form>

        <p className="auth-foot">Belum punya akun? <Link to="/daftar">Daftar di sini</Link></p>
        <p className="auth-foot" style={{ fontSize: '0.78rem' }}>Login admin: HP <strong>admin</strong>, sandi <strong>admin123</strong></p>
      </div>
    </div>
  );
}
