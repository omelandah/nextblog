import Link from 'next/link';
import { registerUser } from '@/services/user';
import { redirect } from 'next/navigation';
import { getAxiosServer } from '@/lib/axiosServer';
import { headers } from 'next/headers';
import { getTranslation } from '@/lib/getTranslation';

const Register = async () => {
  const header = await headers();
  const locale = header.get('x-locale') || 'en';
  const { t } = await getTranslation(locale, 'common');

  const handleRegister = async (formData: FormData) => {
    'use server';

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Optional: Password match check
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    const axios = await getAxiosServer();
    const res = await registerUser(axios, {
      username,
      email,
      password,
      confirmPassword,
    });

    if (res) {
      redirect('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        action={handleRegister}
        className="space-y-4 border rounded px-9 py-8 shadow"
      >
        <p className="text-3xl font-semibold text-center">
          {t('register.title')}
        </p>
        <br />
        <label htmlFor="username">{t('global.username')}</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder={`${t('input.placeholder.enter')} ${t('global.username').toLowerCase()}...`}
          className="border rounded px-3 py-2 w-full"
        />

        <label htmlFor="email">{t('global.email')}</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder={`${t('input.placeholder.enter')} ${t('global.email').toLowerCase()}...`}
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

        <label htmlFor="confirmPassword">{t('global.confirmPassword')}</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder={`${t('input.placeholder.enter')} ${t('global.confirmPassword').toLowerCase()}...`}
          className="border rounded px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          {t('button.register')}
        </button>

        <p className="text-sm text-center text-gray-600">
          {t('register.account.question')}{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            {t('register.loginHere')}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
