'use client';

import { Menu } from '@headlessui/react';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export default function PostsLayout({ children }: Props) {
  const { currentUser, clearUser } = useAuthStore();

  const handleSignOut = () => {
    clearUser();
  };

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
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-2 focus:outline-none">
              {/* <Image
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              /> */}
              <span className="font-medium text-blue-600">
                {currentUser?.username}
              </span>
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg focus:outline-none">
              <Menu.Item disabled>
                {() => (
                  <span
                    className={`w-full text-gray-300 text-left px-4 py-2 text-sm`}
                  >
                    {currentUser?.email}
                  </span>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }: { active: boolean }) => (
                  <button
                    onClick={handleSignOut}
                    className={`w-full text-gray-600 text-left px-4 py-2 text-sm ${
                      active ? 'bg-gray-100 text-black' : ''
                    }`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
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
