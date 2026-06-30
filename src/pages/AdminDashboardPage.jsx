import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getOrders, updateOrderStatus } from '../lib/stock';
import { formatCurrency, formatDate } from '../lib/utils';

const STATUS_LABEL = { pending: 'Diproses', selesai: 'Selesai', batal: 'Dibatalkan' };

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState(() => getOrders());

  const totalRevenue = orders.filter((o) => o.status !== 'batal').reduce((s, o) => s + o.total, 0);
  const totalOrders = orders.length;
  const pendingCount = orders.filter((o) => o.status === 'pending').length;
  const customers = new Set(orders.map((o) => o.userId)).size;

  function handleStatusChange(id, status) {
    const updated = updateOrderStatus(id, status);
    setOrders(updated);
  }

  return (
    <AdminLayout>
      <div className="admin-topbar">
        <h1>Dashboard</h1>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total Pendapatan</div>
          <div className="value">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Pesanan</div>
          <div className="value">{totalOrders}</div>
        </div>
        <div className="stat-card">
          <div className="label">Pesanan Diproses</div>
          <div className="value">{pendingCount}</div>
        </div>
        <div className="stat-card">
          <div className="label">Pelanggan</div>
          <div className="value">{customers}</div>
        </div>
      </div>

      <h3 style={{ marginBottom: 14 }}>Pesanan Terbaru</h3>
      {orders.length === 0 ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Belum ada pesanan masuk.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>No. Pesanan</th>
              <th>Pelanggan</th>
              <th>Tanggal</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.slice(0, 12).map((order) => (
              <tr key={order.id}>
                <td>#{order.id.slice(-8)}</td>
                <td>{order.userName || '-'}</td>
                <td>{formatDate(order.createdAt)}</td>
                <td>{formatCurrency(order.total)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    style={{ border: '1px solid var(--color-border)', borderRadius: 8, padding: '4px 8px', fontSize: '0.82rem' }}
                  >
                    <option value="pending">Diproses</option>
                    <option value="selesai">Selesai</option>
                    <option value="batal">Dibatalkan</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
