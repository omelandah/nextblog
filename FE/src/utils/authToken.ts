import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'accessToken';

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
export function saveToken(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

/**
 * Get token from localStorage
 */
export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove token from localStorage
 */
export function removeToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(TOKEN_KEY);
  }
}

export function decodeToken(token: string): TokenPayload | null {
  try {
    console.log(
      '🚀 ~ decodeToken ~ jwtDecode<TokenPayload>(token):',
      jwtDecode<TokenPayload>(token)
    );
    return jwtDecode<TokenPayload>(token);
  } catch (err) {
    console.error('Invalid token', err);
    return null;
  }
}
