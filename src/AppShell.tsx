import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import App from './App';
import { Auth } from './pages/Auth';
import { Shop } from './pages/Shop';
import { Admin } from './pages/Admin';
import { sb, useAuth } from './lib/app';

export default function AppShell() {
  const auth = useAuth();
  const [dark, setDark] = useState(() => localStorage.getItem('visor-theme') === 'dark');
  const [route, setRoute] = useState(location.hash.slice(1) || 'home');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('visor-theme', dark ? 'dark' : 'light');
  }, [dark]);
  useEffect(() => {
    const h = () => setRoute(location.hash.slice(1) || 'home');
    addEventListener('hashchange', h);
    return () => removeEventListener('hashchange', h);
  }, []);

  const link = 'text-sm font-medium hover:underline';
  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-2 dark:border-slate-800">
        <div className="flex gap-4">
          <a className={link} href="#home">Home</a>
          <a className={link} href="#shop">Shop</a>
          {auth.profile?.is_admin && <a className={link} href="#admin">Admin</a>}
        </div>
        <div className="flex items-center gap-3">
          {auth.session ? (
            <button className={link} onClick={() => sb.auth.signOut()}>Sign out</button>
          ) : (
            <>
              <a className={link} href="#login">Sign in</a>
              <a className={link} href="#register">Register</a>
            </>
          )}
          <button aria-label="Toggle day/night mode" onClick={() => setDark(!dark)}
            className="rounded-full border border-slate-300 p-2 dark:border-slate-600 cursor-pointer">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {route === 'home' && <App />}
      {route === 'shop' && <Shop auth={auth} />}
      {route === 'login' && <Auth mode="login" />}
      {route === 'register' && <Auth mode="register" />}
      {route === 'admin' && <Admin auth={auth} />}
    </div>
  );
}
