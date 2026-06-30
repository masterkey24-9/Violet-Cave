import { useState } from 'react';

export default function StockEditModal({ item, onClose, onSave }) {
  const [value, setValue] = useState(item.stock);

  function handleSubmit(e) {
    e.preventDefault();
    onSave(item.id, Math.max(0, Number(value) || 0));
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Ubah Stok — {item.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="stock-value">Jumlah stok</label>
            <input
              id="stock-value"
              type="number"
              min="0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-outline btn-block" onClick={onClose}>Batal</button>
            <button type="submit" className="btn btn-primary btn-block">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}
