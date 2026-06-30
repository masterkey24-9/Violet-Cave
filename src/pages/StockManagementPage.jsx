import { useMemo, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import StockEditModal from '../components/StockEditModal';
import { getMenuWithStock, setStockFor } from '../lib/stock';
import { formatCurrency } from '../lib/utils';

export default function StockManagementPage() {
  const [menu, setMenu] = useState(() => getMenuWithStock());
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(
    () => menu.filter((item) => item.name.toLowerCase().includes(query.toLowerCase())),
    [menu, query]
  );

  function handleSave(itemId, qty) {
    setStockFor(itemId, qty);
    setMenu(getMenuWithStock());
  }

  return (
    <AdminLayout>
      <div className="admin-topbar">
        <h1>Kelola Stok</h1>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Cari menu..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Menu</th>
            <th>Kategori</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((item) => {
            const isOut = item.stock <= 0;
            const isLow = item.stock > 0 && item.stock <= 5;
            return (
              <tr key={item.id}>
                <td>{item.icon} {item.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{item.category}</td>
                <td>{formatCurrency(item.price)}</td>
                <td>{item.stock}</td>
                <td>
                  <span className={'stock-tag ' + (isOut ? 'out' : isLow ? 'low' : 'ok')}>
                    {isOut ? 'Habis' : isLow ? 'Menipis' : 'Aman'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => setEditing(item)}>Ubah Stok</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {editing && (
        <StockEditModal item={editing} onClose={() => setEditing(null)} onSave={handleSave} />
      )}
    </AdminLayout>
  );
}
