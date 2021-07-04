import { queryList, queryInfo, created, updated } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/admin/list', params);
}

export async function info(id: number) {
  return queryInfo('/admin/detail', id);
}

export async function create(data: Admin.Detail) {
  return created('/admin/create', data);
}

export async function update(data: Admin.Detail) {
  return updated('/admin/update', data);
}
