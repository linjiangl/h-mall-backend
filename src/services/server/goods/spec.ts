import { queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/spec/list', params);
}

export async function info(id: number) {
  return queryInfo('/spec/detail', id);
}

export async function create(data: Spec.Detail) {
  return created('/spec/create', data);
}

export async function update(data: Spec.Detail) {
  return updated('/spec/update', data);
}

export async function remove(id: number) {
  return deleted('/spec/delete', id);
}
