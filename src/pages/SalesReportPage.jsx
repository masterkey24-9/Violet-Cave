import { useMemo } from 'react';
import AdminLayout from '../components/AdminLayout';
import { getOrders } from '../lib/stock';
import { formatCurrency } from '../lib/utils';

export default function SalesReportPage() {
  const orders = getOrders().filter((o) => o.status !== 'batal');

  const byItem = useMemo(() => {
    const map = {};
    orders.forEach((order) => {
      order.items.forEach((i) => {
        if (!map[i.id]) map[i.id] = { name: i.name, qty: 0, revenue: 0 };
        map[i.id].qty += i.qty;
        map[i.id].revenue += i.qty * i.price;
      });
    });
    return Object.values(map).sort((a, b) => b.revenue - a.revenue);
  }, [orders]);

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length ? totalRevenue / orders.length : 0;

  return (
    <AdminLayout>
      <div className="admin-topbar">
        <h1>Laporan Penjualan</h1>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <div className="label">Total Pendapatan</div>
          <div className="value">{formatCurrency(totalRevenue)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Total Transaksi</div>
          <div className="value">{orders.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Rata-rata / Transaksi</div>
          <div className="value">{formatCurrency(avgOrder)}</div>
        </div>
        <div className="stat-card">
          <div className="label">Menu Terjual</div>
          <div className="value">{byItem.reduce((s, i) => s + i.qty, 0)}</div>
        </div>
      </div>

      <h3 style={{ marginBottom: 14 }}>Penjualan per Menu</h3>
      {byItem.length === 0 ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Belum ada data penjualan.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr>
              <th>Menu</th>
              <th>Terjual</th>
              <th>Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {byItem.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{formatCurrency(item.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}
