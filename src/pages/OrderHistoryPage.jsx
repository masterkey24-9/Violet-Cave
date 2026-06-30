import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getOrdersForUser } from '../lib/stock';
import { formatCurrency, formatDate } from '../lib/utils';

const STATUS_LABEL = { pending: 'Diproses', selesai: 'Selesai', batal: 'Dibatalkan' };

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const orders = getOrdersForUser(user.id);

  if (orders.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">📋</div>
        <h2>Belum ada riwayat pesanan</h2>
        <p>Pesanan yang kamu buat akan muncul di sini.</p>
        <Link to="/menu" className="btn btn-primary">Mulai Pesan</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '36px 24px 64px' }}>
      <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: 24 }}>Riwayat Pesanan</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {orders.map((order) => (
          <div key={order.id} className="card-block">
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
              <div>
                <strong>#{order.id.slice(-8)}</strong>
                <p style={{ color: 'var(--color-ink-soft)', fontSize: '0.85rem' }}>{formatDate(order.createdAt)}</p>
              </div>
              <span className={'status-pill ' + (order.status || 'pending')}>{STATUS_LABEL[order.status] || 'Diproses'}</span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {order.items.map((i) => (
                <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>{i.name} x{i.qty}</span>
                  <span>{formatCurrency(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--color-border)', fontWeight: 700 }}>
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
