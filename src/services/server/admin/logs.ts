import { queryList, http } from '@/utils/request';

export enum LogType {
  Login = 'login',
  Action = 'action',
}

export async function list(params: API.TableRequestParams, type: LogType) {
  let url = '/adminLogin/list';
  if (type == LogType.Action) {
    url = '/adminAction/list';
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
