'use client';
import { FormEvent } from 'react';

interface SignInFormProps {
  username: string;
  password: string;
}

const Login = () => {
  const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget); // e.target is the form element
    const values = Object.fromEntries(formData.entries());

    console.log(values);
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
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
