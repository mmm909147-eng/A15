import { useEffect, useState } from 'react';
import { sb, notify, card, btn } from '../lib/app';

export function Shop({ auth }: { auth: any }) {
  const [items, setItems] = useState<any[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [msg, setMsg] = useState('');
  useEffect(() => {
    sb.from('products').select('*').eq('active', true).order('created_at').then((r) => setItems(r.data ?? []));
  }, [msg]);

  const total = items.reduce((s, p) => s + (cart[p.id] ?? 0) * p.price, 0);
  const checkout = async () => {
    if (!auth.session) { location.hash = 'login'; return; }
    const payload = Object.entries(cart).filter(([, q]) => q > 0).map(([id, qty]) => ({ id, qty }));
    const { data, error } = await sb.rpc('place_order', { p_items: payload });
    if (error) { setMsg(error.message); return; }
    notify(data, 'placed');
    setCart({});
    setMsg('Order placed. Check your email.');
  };

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <div key={p.id} className={card}>
            {p.image_url && <img src={p.image_url} alt={p.name} className="mb-3 h-40 w-full rounded-xl object-cover" />}
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm opacity-70">{p.description}</p>
            <div className="mt-3 flex items-center justify-between">
              <span className="font-extrabold">${p.price}</span>
              {p.stock > 0 ? (
                <input type="number" min={0} max={p.stock} value={cart[p.id] ?? 0} aria-label={`Quantity of ${p.name}`}
                  onChange={(e) => setCart({ ...cart, [p.id]: Math.min(p.stock, +e.target.value) })}
                  className="w-16 rounded-lg border border-slate-300 bg-transparent px-2 py-1 dark:border-slate-600" />
              ) : <span className="text-sm text-red-500">Out of stock</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <strong>Total: ${total.toFixed(2)}</strong>
        <button className={btn} disabled={!total} onClick={checkout}>Place order</button>
      </div>
      {msg && <p className="mt-3 text-sm">{msg}</p>}
    </div>
  );
}
