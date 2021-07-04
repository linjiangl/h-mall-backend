import { queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/brand/list', params);
}

export async function info(id: number) {
  return queryInfo('/brand/detail', id);
}

export async function create(data: Brand.Detail) {
  return created('/brand/create', data);
}

export async function update(data: Brand.Detail) {
  return updated('/brand/update', data);
}

export async function remove(id: number) {
  return deleted('/brand/delete', id);
}
