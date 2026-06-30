import { useState } from 'react';
import { formatCurrency } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

export default function MenuItemCard({ item }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const isOut = item.stock <= 0;
  const isLow = item.stock > 0 && item.stock <= 5;

  function handleAdd() {
    if (isOut) return;
    addItem(item, qty);
    setQty(1);
  }

  return (
    <div className="menu-card">
      <div className="menu-card-media">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'flex'; }}
          />
        ) : null}
        <span className="media-fallback" style={{ display: item.image ? 'none' : 'flex' }}>{item.icon}</span>
      </div>
      <div className="menu-card-body">
        <h3>{item.name}</h3>
        <p className="desc">{item.desc}</p>
        <div className="menu-card-foot">
          <span className="price">{formatCurrency(item.price)}</span>
          <span className={'stock-tag ' + (isOut ? 'out' : isLow ? 'low' : 'ok')}>
            {isOut ? 'Stok habis' : isLow ? `Sisa ${item.stock}` : 'Tersedia'}
          </span>
        </div>

        {!isOut && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 6 }}>
            <div className="qty-stepper">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1}>−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => Math.min(item.stock, q + 1))} disabled={qty >= item.stock}>+</button>
            </div>
            <button type="button" className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={handleAdd}>
              Tambah
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
