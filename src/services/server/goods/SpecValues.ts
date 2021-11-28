import { http, queryPaginate, queryInfo, created, updated, deleted } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryPaginate('/specValue/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/specValue/info', id);
}

export async function create(data: Spec.Value) {
  return created('/specValue/create', data);
}

export async function update(data: Spec.Value) {
  return updated('/specValue/update', data);
}

export async function remove(id: number) {
  return deleted('/specValue/delete', id);
}

export async function listBySpecId(specId: number) {
  return http('/specValue/getListBySpecId', { spec_id: specId });
}
