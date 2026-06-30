import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import CartItemRow from '../components/CartItemRow';
import { formatCurrency } from '../lib/utils';

export default function CartPage() {
  const { items, total, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🛒</div>
        <h2>Keranjang masih kosong</h2>
        <p>Yuk pilih menu favoritmu dulu sebelum checkout.</p>
        <Link to="/menu" className="btn btn-primary">Lihat Menu</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div className="card-block">
        <h3 style={{ marginBottom: 14 }}>Keranjang ({count} item)</h3>
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </div>

      <div className="summary-card">
        <h3 style={{ marginBottom: 18 }}>Ringkasan Pesanan</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="summary-row">
          <span>Ongkos kirim</span>
          <span>Dihitung saat checkout</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <button className="btn btn-primary btn-block" onClick={() => navigate('/checkout')}>
          Lanjut ke Checkout
        </button>
        <Link to="/menu" className="btn btn-outline btn-block" style={{ marginTop: 10 }}>
          Tambah Menu Lain
        </Link>
      </div>
    </div>
  );
}
