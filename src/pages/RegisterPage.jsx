import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (form.password.length < 6) {
      setError('Kata sandi minimal 6 karakter.');
      return;
    }
    const result = register(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate('/menu');
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <h1>Daftar Akun</h1>
        <p className="sub">Buat akun untuk mulai memesan di Violet Cave</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Nama lengkap</label>
            <input id="name" type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div className="field">
            <label htmlFor="phone">Nomor HP</label>
            <input id="phone" type="text" placeholder="08xxxxxxxxxx" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          </div>
          <div className="field">
            <label htmlFor="password">Kata sandi</label>
            <input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <div className="field">
            <label htmlFor="confirm">Konfirmasi kata sandi</label>
            <input id="confirm" type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Daftar</button>
        </form>

        <p className="auth-foot">Sudah punya akun? <Link to="/masuk">Masuk di sini</Link></p>
      </div>
    </div>
  );
}
