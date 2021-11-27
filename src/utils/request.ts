import { request } from 'umi';
import { dateToUnix, getAuthorizeToken } from '@/utils/utils';
import { getApiPrefix } from '@/utils/config';
import { isObject } from 'lodash';

/**
 * 参数处理
 * @param queryParams 请求参数
 * @param dateRange 日期范围字段
 */
export const requestQueryParams = (
  queryParams: API.TableRequestParams,
  dateRange: string[],
): API.RequestParams => {
  let params: API.RequestParams = {};

  Object.keys(queryParams.params).forEach((key) => {
    if (key === 'current') {
      params.page = queryParams.params[key];
    } else if (key === 'pageSize') {
      params.limit = queryParams.params[key];
    } else if (dateRange.length > 0) {
      dateRange.forEach((item) => {
        if (key === item) {
          const tmpDate: string[] = queryParams.params[key];
          if (tmpDate && tmpDate.length === 2) {
            params[key] = [
              dateToUnix(`${tmpDate[0].substr(0, 10)} 00:00:00`),
              dateToUnix(`${tmpDate[1].substr(0, 10)} 23:59:59`),
            ];
          }
        } else {
          params[key] = queryParams.params[key];
        }
      });
    } else {
      params[key] = queryParams.params[key];
    }
  });

  if (JSON.stringify(queryParams.sort) !== '{}') {
    params = Object.assign(params, { sorter: queryParams.sort });
  }

  if (JSON.stringify(queryParams.filter) !== '{}' && isObject(queryParams.filter)) {
    Object.keys(queryParams.filter).forEach((key) => {
      if (queryParams.filter && queryParams.filter[key] !== null) {
        params[key] = queryParams.filter[key];
      }
    });
  }
  return params;
};

/**
 * 请求参数对象中,属性是数组的数据处理
 * @param key 属性值
 * @param requestParams
 */
export const requestPropertyToArray = (
  key: string,
  requestParams: Record<string, React.Key[]>,
): Common.Object => {
  const params: Record<string, React.Key[]> = requestParams;
  const name: string = `${key}[]`;
  params[name] = params[key];
  delete params[key];
  return params;
};

export async function http(url: string, data: Common.Object = {}) {
  return request(getApiPrefix() + url, {
    method: 'POST',
    data,
    headers: {
      Authorization: getAuthorizeToken(),
    },
  })
    .then((res) => {
      return Promise.resolve(res.data);
    })
    .catch((err) => {
      return Promise.reject(err.data);
    });
}

export async function queryList(
  url: string,
  tableRequestParams: API.TableRequestParams,
  dateRange: string[] = ['created_time'],
) {
  const params: API.RequestParams = requestQueryParams(tableRequestParams, dateRange);
  return http(url, params);
}

export async function queryInfo(url: string, id: number, params: Common.Object = {}) {
  return http(url, {
    id,
    ...params,
  });
}

export async function created(url: string, data: Common.Object) {
  return http(url, data);
}

export async function updated(url: string, data: Common.Object) {
  return http(url, data);
}

export async function deleted(url: string, id: number) {
  return http(url, {
    id,
  });
}

export { request };
