import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES } from '../data/menuData';
import { getMenuWithStock } from '../lib/stock';
import MenuItemCard from '../components/MenuItemCard';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menu, setMenu] = useState(() => getMenuWithStock());
  const active = searchParams.get('kategori') || 'semua';

  useEffect(() => {
    setMenu(getMenuWithStock());
  }, []);

  const filtered = useMemo(() => {
    if (active === 'semua') return menu;
    return menu.filter((item) => item.category === active);
  }, [menu, active]);

  function setCategory(catId) {
    if (catId === 'semua') {
      searchParams.delete('kategori');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ kategori: catId });
    }
  }

  return (
    <>
      <div className="page-head">
        <h1>Menu Violet Cave</h1>
        <p>Pilih menu favoritmu dan tambahkan ke keranjang</p>
      </div>

      <div className="tabs">
        <button className={'tab-btn' + (active === 'semua' ? ' active' : '')} onClick={() => setCategory('semua')}>Semua</button>
        {CATEGORIES.map((cat) => (
          <button key={cat.id} className={'tab-btn' + (active === cat.id ? ' active' : '')} onClick={() => setCategory(cat.id)}>
            {cat.icon} {cat.name}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="icon">🍽️</div>
          <h2>Belum ada menu</h2>
          <p>Coba pilih kategori lain.</p>
        </div>
      ) : (
        <div className="menu-grid">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
