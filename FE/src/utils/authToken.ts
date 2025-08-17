import { cookies } from 'next/headers';
import { jwtDecode } from 'jwt-decode';

export const TOKEN_KEY = 'accessToken';

export interface TokenPayload {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  exp: number; // optional expiry
}

/**
 * Save token to localStorage
 */
export async function saveToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(TOKEN_KEY, token, {
    httpOnly: true, // protect from client-side JS
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });
}

/**
 * Get token from localStorage
 */
export async function getToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_KEY)?.value ?? null;
}

/**
 * Remove token from localStorage
 */
export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_KEY);
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}
