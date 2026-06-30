const METHODS = [
  { id: 'whatsapp', label: 'Pesan via WhatsApp', desc: 'Kirim detail pesanan langsung ke WhatsApp warung' },
  { id: 'transfer', label: 'Transfer Bank', desc: 'Transfer manual, konfirmasi via WhatsApp' },
  { id: 'cod', label: 'Bayar di Tempat (COD)', desc: 'Bayar tunai saat pesanan diantar/diambil' },
];

export default function PaymentMethodModal({ value, onSelect, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Pilih Metode Pembayaran</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {METHODS.map((m) => (
            <label
              key={m.id}
              style={{
                display: 'flex', gap: 10, alignItems: 'flex-start', border: '1px solid var(--color-border)',
                borderRadius: 12, padding: '12px 14px', cursor: 'pointer',
                background: value === m.id ? 'var(--color-red-tint)' : '#fff',
                borderColor: value === m.id ? 'var(--color-red)' : 'var(--color-border)',
              }}
            >
              <input type="radio" name="payment" checked={value === m.id} onChange={() => onSelect(m.id)} style={{ marginTop: 3 }} />
              <span>
                <strong style={{ display: 'block', fontSize: '0.92rem' }}>{m.label}</strong>
                <span style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>{m.desc}</span>
              </span>
            </label>
          ))}
        </div>
        <div className="modal-actions">
          <button type="button" className="btn btn-primary btn-block" onClick={onClose}>Selesai</button>
        </div>
      </div>
    </div>
  );
}
