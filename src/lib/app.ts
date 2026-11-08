import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export const sb = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export const card = 'rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900';
export const inp = 'w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 text-sm dark:border-slate-600';
export const btn = 'rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-900 cursor-pointer';

export async function notify(orderId: string, kind: 'placed' | 'status') {
  const { data } = await sb.auth.getSession();
  await fetch('/api/notify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${data.session?.access_token}` },
    body: JSON.stringify({ orderId, kind }),
  }).catch(() => {});
}

export function useAuth() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!session) { setProfile(null); return; }
    sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle().then(({ data }) => setProfile(data));
  }, [session?.user.id]);
  return { session, profile };
}
