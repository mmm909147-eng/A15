import { useEffect, useState } from 'react';
import { sb, notify, card, inp, btn } from '../lib/app';

const useRows = (table: string) => {
  const [rows, setRows] = useState<any[]>([]);
  const load = async () => setRows((await sb.from(table).select('*').order('created_at', { ascending: false })).data ?? []);
  useEffect(() => { load(); }, []);
  return [rows, load] as const;
};
const fail = (e: any) => { if (e) alert(e.message); return !!e; };

function Products() {
  const [rows, load] = useRows('products');
  const [f, setF] = useState<any>({ active: true });
  const save = async () => {
    const { id, created_at, ...rest } = f;
    const body = { ...rest, price: +rest.price, stock: +(rest.stock ?? 0) };
    const r = id ? await sb.from('products').update(body).eq('id', id) : await sb.from('products').insert(body);
    if (fail(r.error)) return;
    setF({ active: true }); load();
  };
  const upload = async (file: File) => {
    const path = `${Date.now()}-${file.name.replace(/[^\w.]/g, '_')}`;
    if (fail((await sb.storage.from('media').upload(path, file)).error)) return;
    setF({ ...f, image_url: sb.storage.from('media').getPublicUrl(path).data.publicUrl });
  };
  const setStock = async (p: any, stock: number) => { fail((await sb.from('products').update({ stock }).eq('id', p.id)).error); load(); };
  return (
    <div className="grid gap-4">
      <div className={`${card} grid gap-2 sm:grid-cols-2`}>
        <input className={inp} placeholder="Name" value={f.name ?? ''} onChange={(e) => setF({ ...f, name: e.target.value })} />
        <input className={inp} placeholder="Price" type="number" value={f.price ?? ''} onChange={(e) => setF({ ...f, price: e.target.value })} />
        <input className={inp} placeholder="Stock" type="number" value={f.stock ?? ''} onChange={(e) => setF({ ...f, stock: e.target.value })} />
        <input className={inp} type="file" accept="image/*,video/*" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
        <textarea className={`${inp} sm:col-span-2`} placeholder="Description" value={f.description ?? ''} onChange={(e) => setF({ ...f, description: e.target.value })} />
        <label className="text-sm"><input type="checkbox" checked={!!f.active} onChange={(e) => setF({ ...f, active: e.target.checked })} /> Visible in shop</label>
        <button className={btn} onClick={save}>{f.id ? 'Save changes' : 'Add product'}</button>
      </div>
      {rows.map((p) => (
        <div key={p.id} className={`${card} flex flex-wrap items-center gap-3`}>
          {p.image_url && <img src={p.image_url} alt="" className="h-12 w-12 rounded-lg object-cover" />}
          <div className="min-w-40 flex-1"><b>{p.name}</b> · ${p.price}{!p.active && ' (hidden)'}</div>
          <label className={`text-sm ${p.stock < 5 ? 'font-bold text-red-500' : ''}`}>Stock
            <input type="number" className="ms-2 w-20 rounded border border-slate-300 bg-transparent px-2 py-1 dark:border-slate-600"
              defaultValue={p.stock} onBlur={(e) => +e.target.value !== p.stock && setStock(p, +e.target.value)} />
          </label>
          <button className={btn} onClick={() => setF(p)}>Edit</button>
          <button className={btn} onClick={async () => { if (confirm('Delete this product?')) { fail((await sb.from('products').delete().eq('id', p.id)).error); load(); } }}>Delete</button>
        </div>
      ))}
    </div>
  );
}

function Orders() {
  const [rows, load] = useRows('orders');
  const [open, setOpen] = useState('');
  const set = async (id: string, st: string) => {
    if (fail((await sb.rpc('set_order_status', { p_id: id, p_status: st })).error)) return;
    await notify(id, 'status'); load();
  };
  return (
    <div className="grid gap-3">
      {rows.map((o) => (
        <div key={o.id} className={card}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button className="font-bold underline" onClick={() => setOpen(open === o.id ? '' : o.id)}>#{o.id.slice(0, 8)} · {o.customer.first_name} {o.customer.last_name}</button>
            <span>${o.total} · {new Date(o.created_at).toLocaleDateString()}</span>
            <select className={`${inp} w-auto`} value={o.status} disabled={o.status === 'canceled'} onChange={(e) => set(o.id, e.target.value)}>
              <option value="processing">Processing</option><option value="shipped">Shipped</option><option value="canceled">Canceled</option>
            </select>
          </div>
          {open === o.id && (
            <div className="mt-3 grid gap-1 text-sm">
              {o.items.map((i: any) => <div key={i.id}>{i.qty} × {i.name} (${i.price})</div>)}
              <hr className="my-2 opacity-20" />
              {Object.entries(o.customer).filter(([k]) => k !== 'id' && k !== 'created_at').map(([k, v]) => <div key={k}><b>{k.replace('_', ' ')}:</b> {String(v ?? '')}</div>)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Users({ me }: { me: string }) {
  const [rows, load] = useRows('profiles');
  return (
    <div className="grid gap-3">
      {rows.map((u) => (
        <div key={u.id} className={`${card} flex flex-wrap items-center justify-between gap-2 text-sm`}>
          <div><b>{u.first_name} {u.last_name}</b> · {u.email} · {u.phone}<br />ID {u.id_number} · {[u.country, u.city, u.district, u.street, u.building, u.postal_code].filter(Boolean).join(', ')}</div>
          <label><input type="checkbox" checked={u.is_admin} disabled={u.id === me}
            onChange={async () => { fail((await sb.from('profiles').update({ is_admin: !u.is_admin }).eq('id', u.id)).error); load(); }} /> Admin</label>
        </div>
      ))}
    </div>
  );
}

function Analytics() {
  const [o] = useRows('orders');
  const ok = o.filter((x) => x.status !== 'canceled');
  const sum = (a: any[]) => a.reduce((s, x) => s + +x.total, 0);
  const days = [...Array(7)].map((_, i) => {
    const d = new Date(Date.now() - (6 - i) * 864e5).toISOString().slice(0, 10);
    return { d: d.slice(5), v: sum(ok.filter((x) => x.created_at.startsWith(d))) };
  });
  const max = Math.max(1, ...days.map((x) => x.v));
  const top: Record<string, number> = {};
  ok.forEach((x) => x.items.forEach((i: any) => { top[i.name] = (top[i.name] ?? 0) + i.qty; }));
  return (
    <div className="grid gap-4">
      <div className="grid gap-3 sm:grid-cols-4">
        {[['Revenue', `$${sum(ok).toFixed(2)}`], ['Orders', ok.length], ['Avg. order', `$${ok.length ? (sum(ok) / ok.length).toFixed(2) : 0}`],
          ['Canceled', o.length - ok.length]].map(([k, v]) => <div key={k} className={card}><div className="text-xs uppercase opacity-60">{k}</div><div className="text-2xl font-extrabold">{v}</div></div>)}
      </div>
      <div className={`${card} flex h-48 items-end gap-2`}>
        {days.map((x) => (
          <div key={x.d} className="flex flex-1 flex-col items-center justify-end gap-1 text-xs">
            <span>${x.v.toFixed(0)}</span>
            <div className="w-full rounded-t bg-slate-900 dark:bg-white" style={{ height: `${(x.v / max) * 100}px` }} />
            <span>{x.d}</span>
          </div>
        ))}
      </div>
      <div className={card}><b>Top products</b>
        {Object.entries(top).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([n, q]) => <div key={n} className="text-sm">{n}: {q} sold</div>)}
      </div>
    </div>
  );
}

function Finance() {
  const [rows, load] = useRows('financial_logs');
  const [e, setE] = useState({ amount: '', note: '' });
  const net = rows.reduce((s, x) => s + +x.amount, 0);
  return (
    <div className="grid gap-3">
      <div className={`${card} flex flex-wrap gap-2`}>
        <input className={`${inp} w-32`} type="number" placeholder="Expense" value={e.amount} onChange={(x) => setE({ ...e, amount: x.target.value })} />
        <input className={`${inp} flex-1`} placeholder="Note" value={e.note} onChange={(x) => setE({ ...e, note: x.target.value })} />
        <button className={btn} onClick={async () => { if (fail((await sb.from('financial_logs').insert({ kind: 'expense', amount: -Math.abs(+e.amount), note: e.note })).error)) return; setE({ amount: '', note: '' }); load(); }}>Log expense</button>
      </div>
      <b>Net: ${net.toFixed(2)}</b>
      {rows.map((x) => <div key={x.id} className={`${card} flex justify-between text-sm`}><span>{new Date(x.created_at).toLocaleString()} · {x.kind} · {x.note}</span><b className={x.amount < 0 ? 'text-red-500' : ''}>{x.amount}</b></div>)}
    </div>
  );
}

const TABS = { Products: Products, Orders: Orders, Users: Users, Analytics: Analytics, Finance: Finance };

export function Admin({ auth }: { auth: any }) {
  const [tab, setTab] = useState<keyof typeof TABS>('Products');
  if (!auth.profile?.is_admin) return <p className="p-8">Admins only.</p>;
  const Tab: any = TABS[tab];
  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(TABS).map((t) => (
          <button key={t} onClick={() => setTab(t as any)} className={`rounded-full px-4 py-1.5 text-sm font-semibold cursor-pointer ${tab === t ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' : 'border border-slate-300 dark:border-slate-600'}`}>{t}</button>
        ))}
      </div>
      <Tab me={auth.session.user.id} />
    </div>
  );
    }
