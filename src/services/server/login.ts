import { http } from '@/utils/request';
import { request } from 'umi';

export async function login(params: API.LoginParams) {
  return http('/login', params);
}

export async function logout() {
  return Promise.resolve({ data: 'success' });
}

export async function getFakeCaptcha(
  params: {
    // query
    /** 手机号 */
    phone?: string;
  },
  options?: Record<string, any>,
) {
  return request<API.FakeCaptcha>('/api/login/captcha', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
