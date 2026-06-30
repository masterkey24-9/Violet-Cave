import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import StockManagementPage from './pages/StockManagementPage';
import SalesReportPage from './pages/SalesReportPage';

function NotFoundPage() {
  return (
    <div className="empty-state">
      <div className="icon">🔎</div>
      <h2>Halaman tidak ditemukan</h2>
      <p>Periksa kembali alamat yang kamu tuju.</p>
    </div>
  );
}

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-shell">
      <ScrollToTop />
      {!isAdminRoute && <Header />}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/masuk" element={<LoginPage />} />
          <Route path="/daftar" element={<RegisterPage />} />

          <Route path="/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
          <Route path="/keranjang" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="/riwayat" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />

          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/stok" element={<AdminRoute><StockManagementPage /></AdminRoute>} />
          <Route path="/admin/laporan" element={<AdminRoute><SalesReportPage /></AdminRoute>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
