import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import AppShell from './AppShell.tsx';
import {LanguageProvider} from './i18n.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  </StrictMode>,
);
