import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const configured = Boolean(url && key);
export const sb = createClient(url || 'http://localhost', key || 'missing');

export const card = "bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100";
export const inp = "w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition";
export const btn = "w-full rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-gray-800 active:scale-[0.98]";
export const notify = (msg: string) => alert(msg);
export const useAuth = () => ({ user: null });
