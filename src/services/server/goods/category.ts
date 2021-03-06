import { queryList, queryInfo, created, updated, deleted, http } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/category/list', params);
}

export async function info(id: number) {
  return queryInfo('/category/detail', id);
}

export async function create(data: Category.Detail) {
  return created('/category/create', data);
}

export async function update(data: Category.Detail) {
  return updated('/category/update', data);
}

export async function remove(id: number) {
  return deleted('/category/delete', id);
}

export async function parent() {
  return http('/category/parent');
}

export async function children() {
  return http('/category/children');
}
