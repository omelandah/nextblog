// lib/auth.ts (runs on server)
import { cookies } from 'next/headers';
import { decodeToken, TOKEN_KEY } from '@/utils/authToken';
import { User } from '@/models/user';

export async function getServerAuthUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_KEY)?.value;

  if (!token) return null;

  const decoded = decodeToken(token);
  if (!decoded) return null;

  return {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    isAdmin: decoded.isAdmin,
  };
}
