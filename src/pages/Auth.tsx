import { useState, type FormEvent } from 'react';
import { sb, inp, btn } from '../lib/app';

const FIELDS = [
  ['first_name', 'First name'], ['last_name', 'Last name'], ['phone', 'Phone number', 'tel'],
  ['email', 'Email', 'email'], ['password', 'Password', 'password'], ['id_number', 'ID number'],
  ['country', 'Country'], ['city', 'City'], ['district', 'District'],
  ['street', 'Street'], ['building', 'Building / apartment'], ['postal_code', 'Postal code'],
];

export function Auth({ mode }: { mode: 'login' | 'register' }) {
  const [v, setV] = useState<any>({});
  const [msg, setMsg] = useState('');
  const fields = mode === 'login' ? FIELDS.filter((f) => ['email', 'password'].includes(f[0])) : FIELDS;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'login') {
      const { error } = await sb.auth.signInWithPassword({ email: v.email, password: v.password });
      if (error) setMsg(error.message); else location.hash = 'shop';
      return;
    }
    const { email, password, ...meta } = v;
    const { error } = await sb.auth.signUp({ email, password, options: { data: meta } });
    setMsg(error ? error.message : 'Account created. Confirm your email, then sign in.');
  };

  return (
    <form onSubmit={submit} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mx-auto my-10 grid max-w-xl gap-3 sm:grid-cols-2">
      <h2 className="text-xl font-bold sm:col-span-2">{mode === 'login' ? 'Sign in' : 'Create your account'}</h2>
      {fields.map(([k, label, type]) => (
        <label key={k} className="text-xs font-semibold uppercase">
          {label}
          <input required type={type ?? 'text'} minLength={k === 'password' ? 8 : undefined} className={`${inp} mt-1 normal-case`}
            value={v[k] ?? ''} onChange={(e) => setV({ ...v, [k]: e.target.value })} />
        </label>
      ))}
      <button className={`${btn} sm:col-span-2`}>{mode === 'login' ? 'Sign in' : 'Register'}</button>
      {msg && <p className="text-sm sm:col-span-2">{msg}</p>}
    </form>
  );
}
