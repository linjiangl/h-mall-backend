import { http } from '@/utils/request';

export type LoginParams = {
  username?: string;
  password?: string;
  mobile?: string;
  captcha?: string;
  autoLogin?: boolean;
  type?: string;
};

export async function login(params: LoginParams) {
  return http('/login', params);
}

export async function logout() {
  return Promise.resolve({ data: 'success' });
}

export async function captcha() {
  return Promise.resolve(true);
}
