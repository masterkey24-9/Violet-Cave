import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { saveOrder, decrementStock } from '../lib/stock';
import { formatCurrency } from '../lib/utils';
import PaymentMethodModal from '../components/PaymentMethodModal';

const WHATSAPP_NUMBER = '6285274648882';

export default function OrderConfirmationPage() {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState('whatsapp');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  if (items.length === 0) {
    return (
      <div className="empty-state">
        <div className="icon">🧾</div>
        <h2>Tidak ada pesanan untuk dikonfirmasi</h2>
        <p>Tambahkan menu ke keranjang terlebih dahulu.</p>
        <Link to="/menu" className="btn btn-primary">Lihat Menu</Link>
      </div>
    );
  }

  const paymentLabel = { whatsapp: 'Pesan via WhatsApp', transfer: 'Transfer Bank', cod: 'Bayar di Tempat (COD)' }[payment];

  function buildWhatsAppMessage(order) {
    const lines = [
      `Halo Violet Cave, saya ingin memesan:`,
      ...order.items.map((i) => `- ${i.name} x${i.qty} = ${formatCurrency(i.price * i.qty)}`),
      ``,
      `Total: ${formatCurrency(order.total)}`,
      `Metode pembayaran: ${paymentLabel}`,
      `Nama: ${user?.name || '-'}`,
      `Alamat pengiriman: ${order.address || '-'}`,
      `No. Pesanan: ${order.id}`,
    ];
    return encodeURIComponent(lines.join('\n'));
  }

  function handleConfirm() {
    if (!address.trim()) {
      setError('Alamat pengiriman wajib diisi.');
      return;
    }
    setError('');

    const order = saveOrder({
      userId: user?.id,
      userName: user?.name,
      items: items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, price: i.price })),
      total,
      address,
      paymentMethod: payment,
    });

    decrementStock(items.map((i) => ({ id: i.id, qty: i.qty })));

    const waText = buildWhatsAppMessage(order);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`, '_blank');

    clearCart();
    navigate('/riwayat');
  }

  return (
    <div className="cart-layout">
      <div className="card-block">
        <h3 style={{ marginBottom: 14 }}>Detail Pesanan</h3>
        {items.map((item) => (
          <div className="cart-item-row" key={item.id}>
            <div className="cart-item-icon">
              {item.image ? <img src={item.image} alt="" /> : item.icon}
            </div>
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p className="unit">{item.qty} x {formatCurrency(item.price)}</p>
            </div>
            <div style={{ fontWeight: 700 }}>{formatCurrency(item.price * item.qty)}</div>
          </div>
        ))}

        {error && <div className="alert alert-error" style={{ marginTop: 16 }}>{error}</div>}

        <div className="field" style={{ marginTop: 18 }}>
          <label htmlFor="address">Alamat pengiriman</label>
          <input
            id="address"
            type="text"
            placeholder="Contoh: Kos Mawar, Jl. Melati No. 5"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>

      <div className="summary-card">
        <h3 style={{ marginBottom: 18 }}>Ringkasan</h3>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>{formatCurrency(total)}</span>
        </div>
        <div className="summary-row">
          <span>Pembayaran</span>
          <span>{paymentLabel}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>

        <button type="button" className="btn btn-outline btn-block" onClick={() => setShowModal(true)}>
          Ubah Metode Pembayaran
        </button>
        <button type="button" className="btn btn-primary btn-block" style={{ marginTop: 10 }} onClick={handleConfirm}>
          Pesan via WhatsApp
        </button>
      </div>

      {showModal && (
        <PaymentMethodModal value={payment} onSelect={setPayment} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
