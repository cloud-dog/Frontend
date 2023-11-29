import axios from 'axios';
import SessionStorage from '@/constants/SessionStorage';

const accessToken = SessionStorage.getItem('accessToken');

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
});
