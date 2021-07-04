import { http } from '@/utils/request';

export type LoginParamsType = {
  username: string;
  password: string;
  mobile: string;
  captcha: string;
  type: string;
};

export async function fakeAccountLogin(params: LoginParamsType) {
  return http('/login', params);
}

export async function getFakeCaptcha() {
  return Promise.resolve(true);
}

export async function outLogin() {
  return Promise.resolve({ data: 'success' });
}
