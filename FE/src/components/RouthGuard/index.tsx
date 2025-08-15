'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';

const publicRoutes = ['/login', '/register'];

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    const isPublic = publicRoutes.includes(pathname);

    if (!currentUser && !isPublic) {
      // Not logged in but accessing a protected route
      router.replace('/login');
    }

    if (isPublic && currentUser) {
      // Logged in but going to login page
      router.replace('/blogs');
    }
  }, [currentUser, pathname, router]);

  return <>{children}</>;
}
