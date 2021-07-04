import { request, requestQueryParams } from '@/utils/request';

export async function exportExcel(
  url: string,
  requestParams: API.TableRequestParams,
  method: string = 'GET',
) {
  const params: API.RequestParams = requestQueryParams(requestParams);
  return request(url, {
    method,
    params,
    responseType: 'blob',
  });
}
