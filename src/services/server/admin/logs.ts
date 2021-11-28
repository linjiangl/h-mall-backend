import { queryList, http } from '@/utils/request';

export enum LogType {
  Login = 'login',
  Action = 'action',
}

export async function paginate(params: API.TableRequestParams, type: LogType) {
  let url = '/adminLogin/paginate';
  if (type == LogType.Action) {
    url = '/adminAction/paginate';
  }
  return queryList(url, params);
}

export async function remove(selectIds: number[], type: LogType) {
  let url = '/adminLogin/delete';
  if (type == LogType.Action) {
    url = '/adminAction/delete';
  }
  return http(url, {
    select_ids: selectIds.join(','),
  });
}
