'use client';
import { FormEvent } from 'react';
import Link from 'next/link';
import { loginUser } from '@/services/user';
import { useAuthStore } from '@/store/useAuthStore';

interface SignInFormProps {
  username: string;
  password: string;
}

const Login = () => {
  const { setCurrentUser } = useAuthStore();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // e.target is the form element
    const values = Object.fromEntries(
      formData.entries()
    ) as unknown as SignInFormProps;

    const res = await loginUser(values);
    if (res) {
      setCurrentUser({
        id: res.user._id,
        username: res.user.username,
        email: res.user.email,
        isAdmin: res.user.isAdmin,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form
        method="POST"
        onSubmit={handleSignIn}
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
