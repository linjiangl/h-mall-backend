import { queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryList('/spec/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/spec/info', id);
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
