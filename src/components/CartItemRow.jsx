import { formatCurrency } from '../lib/utils';
import { useCart } from '../contexts/CartContext';

export default function CartItemRow({ item }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="cart-item-row">
      <div className="cart-item-icon">
        {item.image ? (
          <img src={item.image} alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        ) : (
          item.icon
        )}
      </div>
      <div className="cart-item-info">
        <h4>{item.name}</h4>
        <p className="unit">{formatCurrency(item.price)} / porsi</p>
      </div>
      <div className="qty-stepper">
        <button type="button" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
        <span>{item.qty}</span>
        <button type="button" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
      </div>
      <div style={{ width: 96, textAlign: 'right', fontWeight: 700 }}>
        {formatCurrency(item.price * item.qty)}
      </div>
      <button type="button" className="btn btn-ghost btn-sm" aria-label="Hapus" onClick={() => removeItem(item.id)}>✕</button>
    </div>
  );
}
