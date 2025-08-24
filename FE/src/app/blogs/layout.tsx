// app/posts/layout.tsx (Server Component)
import Link from 'next/link';
import { removeToken } from '@/utils/authToken'; // server helper
import { getServerAuthUser } from '@/lib/auth'; // decode user from token (server util)
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getTranslation } from '@/lib/getTranslation';

interface Props {
  children: React.ReactNode;
}

async function handleSignOut() {
  'use server';

  await removeToken(); // clear cookie
  redirect('/login');
}

export default async function PostsLayout({ children }: Props) {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  // 🔑 Get token from cookies (server side)
  const currentUser = await getServerAuthUser();

  return (
    <div className="h-screen flex flex-col overflow-auto">
      {/* Navbar */}
      <header className="bg-white border-b shadow-sm fixed w-full">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo / Title */}
          <div className="text-xl font-bold text-blue-600">
            <Link href="/">Next Blog</Link>
          </div>

          {/* User menu */}
          {currentUser && (
            <details className="relative">
              <summary className="text-blue-500 cursor-pointer flex items-center gap-2">
                {currentUser.username}
              </summary>
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg">
                <div className="w-full text-gray-300 text-left px-4 py-2 text-sm">
                  {currentUser.email}
                </div>
                <form action={handleSignOut}>
                  <button
                    type="submit"
                    className="w-full text-gray-600 text-left px-4 py-2 text-sm hover:bg-gray-100 hover:text-black cursor-pointer"
                  >
                    {t('global.signout')}
                  </button>
                </form>
              </div>
            </details>
          )}
        </div>
      </header>

      {/* Page content */}
      <main
        className="flex-1 max-w-6xl mx-auto w-full px-4 py-6 mt-13"
        style={{ height: 'calc(100vh - 52px)' }}
      >
        {children}
      </main>
    </div>
  );
}
