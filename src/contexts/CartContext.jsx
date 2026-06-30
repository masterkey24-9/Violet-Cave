import { createContext, useContext, useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../lib/utils';
import { getMenuWithStock } from '../lib/stock';

const CartContext = createContext(null);
const CART_KEY = 'vc_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage(CART_KEY, []));

  useEffect(() => {
    writeStorage(CART_KEY, items);
  }, [items]);

  function addItem(menuItem, qty = 1) {
    const menu = getMenuWithStock();
    const live = menu.find((m) => m.id === menuItem.id);
    const maxStock = live ? live.stock : 0;

    setItems((prev) => {
      const existing = prev.find((i) => i.id === menuItem.id);
      if (existing) {
        const nextQty = Math.min(existing.qty + qty, maxStock);
        return prev.map((i) => (i.id === menuItem.id ? { ...i, qty: nextQty } : i));
      }
      return [...prev, {
        id: menuItem.id,
        name: menuItem.name,
        price: menuItem.price,
        icon: menuItem.icon,
        image: menuItem.image,
        category: menuItem.category,
        qty: Math.min(qty, maxStock),
      }];
    });
  }

  function updateQty(id, qty) {
    setItems((prev) => {
      if (qty <= 0) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty } : i));
    });
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
