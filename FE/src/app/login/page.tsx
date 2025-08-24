import Link from 'next/link';
import { loginUser } from '@/services/user';
import { saveToken } from '@/utils/authToken';
import { redirect } from 'next/navigation';
import { getAxiosServer } from '@/lib/axiosServer';
import { headers } from 'next/headers';
import { getTranslation } from '@/lib/getTranslation';

async function handleSignIn(formData: FormData) {
  'use server';

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const axios = await getAxiosServer();

  const response = await loginUser(axios, {
    username,
    password,
  });
  const data = response?.data;

  if (data) {
    // Save token in cookie instead of localStorage
    await saveToken(data.data.token);

    // redirect after login
    redirect('/');
  }

  // optionally return error state
}

const Login = async () => {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        action={handleSignIn}
        className="space-y-4 border rounded px-9 py-8"
      >
        <p className="text-3xl font-semibold text-center">Next Blog</p>
        <br />
        <label htmlFor="username">{t('global.username')}</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder={`${t('input.placeholder.enter')} ${t('global.username').toLowerCase()}...`}
          className="border rounded px-3 py-2 w-full"
        />

        <label htmlFor="password">{t('global.password')}</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder={`${t('input.placeholder.enter')} ${t('global.password').toLowerCase()}...`}
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          {t('button.signin')}
        </button>

        <p className="text-sm text-center text-gray-600">
          {t('login.register.question')}{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            {t('login.registerHere')}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
