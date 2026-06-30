import { MENU_ITEMS } from '../data/menuData';
import { readStorage, writeStorage, generateId } from './utils';

const STOCK_KEY = 'vc_stock';
const ORDERS_KEY = 'vc_orders';

export function getStockMap() {
  const existing = readStorage(STOCK_KEY, null);
  if (existing) return existing;
  const initial = {};
  MENU_ITEMS.forEach((item) => { initial[item.id] = item.stock; });
  writeStorage(STOCK_KEY, initial);
  return initial;
}

export function setStockFor(itemId, qty) {
  const map = getStockMap();
  map[itemId] = Math.max(0, qty);
  writeStorage(STOCK_KEY, map);
  return map;
}

export function decrementStock(items) {
  const map = getStockMap();
  items.forEach(({ id, qty }) => {
    map[id] = Math.max(0, (map[id] ?? 0) - qty);
  });
  writeStorage(STOCK_KEY, map);
  return map;
}

export function getMenuWithStock() {
  const map = getStockMap();
  return MENU_ITEMS.map((item) => ({ ...item, stock: map[item.id] ?? 0 }));
}

export function getOrders() {
  return readStorage(ORDERS_KEY, []);
}

export function saveOrder(order) {
  const orders = getOrders();
  const full = { id: generateId('order'), createdAt: new Date().toISOString(), status: 'pending', ...order };
  writeStorage(ORDERS_KEY, [full, ...orders]);
  return full;
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders();
  const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o));
  writeStorage(ORDERS_KEY, updated);
  return updated;
}

export function getOrdersForUser(userId) {
  return getOrders().filter((o) => o.userId === userId);
}
