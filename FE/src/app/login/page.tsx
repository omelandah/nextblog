import Link from 'next/link';
import { loginUser } from '@/services/user';
import { saveToken } from '@/utils/authToken';
import { redirect } from 'next/navigation';
import { getAxiosServer } from '@/lib/axiosServer';

async function handleSignIn(formData: FormData) {
  'use server';

  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  const axios = await getAxiosServer();

  const { data }: any = await loginUser(axios, { username, password });

  if (data) {
    // Save token in cookie instead of localStorage
    await saveToken(data.data.token);

    // redirect after login
    redirect('/');
  }

  // optionally return error state
}

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        action={handleSignIn}
        className="space-y-4 border rounded px-9 py-8"
      >
        <p className="text-3xl font-semibold text-center">Next Blog</p>
        <br />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter username..."
          className="border rounded px-3 py-2 w-full"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter password..."
          className="border rounded px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          Sign In
        </button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
