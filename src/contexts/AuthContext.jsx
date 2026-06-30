import { createContext, useContext, useEffect, useState } from 'react';
import { readStorage, writeStorage, generateId } from '../lib/utils';

const AuthContext = createContext(null);

const USERS_KEY = 'vc_users';
const SESSION_KEY = 'vc_session';

const ADMIN_ACCOUNT = {
  id: 'admin',
  name: 'Admin Violet Cave',
  phone: 'admin',
  password: 'admin123',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = readStorage(SESSION_KEY, null);
    setUser(session);
    setLoading(false);
  }, []);

  function getUsers() {
    return readStorage(USERS_KEY, []);
  }

  function register({ name, phone, password }) {
    const users = getUsers();
    if (phone === ADMIN_ACCOUNT.phone || users.some((u) => u.phone === phone)) {
      return { ok: false, error: 'Nomor HP sudah terdaftar.' };
    }
    const newUser = { id: generateId('user'), name, phone, password, role: 'customer' };
    writeStorage(USERS_KEY, [...users, newUser]);
    const { password: _pw, ...safeUser } = newUser;
    writeStorage(SESSION_KEY, safeUser);
    setUser(safeUser);
    return { ok: true };
  }

  function login({ phone, password }) {
    if (phone === ADMIN_ACCOUNT.phone && password === ADMIN_ACCOUNT.password) {
      const { password: _pw, ...safeAdmin } = ADMIN_ACCOUNT;
      writeStorage(SESSION_KEY, safeAdmin);
      setUser(safeAdmin);
      return { ok: true };
    }
    const users = getUsers();
    const found = users.find((u) => u.phone === phone && u.password === password);
    if (!found) {
      return { ok: false, error: 'Nomor HP atau kata sandi salah.' };
    }
    const { password: _pw, ...safeUser } = found;
    writeStorage(SESSION_KEY, safeUser);
    setUser(safeUser);
    return { ok: true };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
