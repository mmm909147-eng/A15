import { createClient } from '@supabase/supabase-js';

const esc = (s: any) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const send = (to: string, subject: string, html: string) =>
  fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: process.env.MAIL_FROM, to, subject, html }),
  });

export async function POST(req: Request) {
  const token = (req.headers.get('authorization') ?? '').replace('Bearer ', '');
  const sb = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!, {
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data: u } = await sb.auth.getUser(token);
  if (!u.user) return new Response('unauthorized', { status: 401 });

  const { orderId, kind } = await req.json();
  const { data: o } = await sb.from('orders').select('*').eq('id', orderId).maybeSingle(); // RLS: owner or admin
  if (!o) return new Response('not found', { status: 404 });
  const { data: me } = await sb.from('profiles').select('is_admin').eq('id', u.user.id).single();
  if (kind === 'status' && !me?.is_admin) return new Response('forbidden', { status: 403 });

  const c = o.customer;
  const lines = o.items.map((i: any) => `<li>${esc(i.qty)} × ${esc(i.name)} ($${esc(i.price)})</li>`).join('');
  const body = `<p>Order #${esc(o.id.slice(0, 8))}</p><ul>${lines}</ul><p>Total: $${esc(o.total)}</p>`;

  if (kind === 'placed') {
    await send(c.email, 'We received your Visor order', `<p>Hi ${esc(c.first_name)}, thanks for your order.</p>${body}`);
    await send(process.env.ADMIN_EMAIL!, `New order ${o.id.slice(0, 8)}`,
      `${body}<p>${esc(c.first_name)} ${esc(c.last_name)} · ${esc(c.phone)} · ${esc(c.city)}</p>`);
  } else {
    await send(c.email, `Your Visor order is ${o.status}`, `<p>Status: <b>${esc(o.status)}</b></p>${body}`);
  }
  return new Response('ok');
}
