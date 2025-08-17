import axios from 'axios';
import { cookies } from 'next/headers';

export async function getAxiosServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  const axiosServer = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return axiosServer;
}
