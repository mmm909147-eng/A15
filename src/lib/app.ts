import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const configured = Boolean(url && key);
export const sb = createClient(url || 'http://localhost', key || 'missing');

export const card = "bg-white p-6 rounded-2xl shadow-lg";
export const inp = "w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black";
export const btn = "w-full rounded-xl bg-black py-2 text-sm font-semibold text-white transition hover:bg-gray-800";
export const notify = (msg: string) => alert(msg);

