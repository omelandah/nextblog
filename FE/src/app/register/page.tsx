import Link from 'next/link';
import { registerUser } from '@/services/user';
import { redirect } from 'next/navigation';
import { getAxiosServer } from '@/lib/axiosServer';

const Register = async () => {
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
          Create an account here
        </p>
        <br />
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Enter username..."
          className="border rounded px-3 py-2 w-full"
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter email..."
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm password..."
          className="border rounded px-3 py-2 w-full"
        />

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
