'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
];

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    Cookies.set('NEXT_LOCALE', lng, { expires: 365 }); // save for 1 year
    router.refresh(); // reload server components → middleware runs again
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className="px-3 py-1 border rounded"
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
