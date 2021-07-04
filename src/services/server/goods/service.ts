import { queryList, queryInfo, created, updated, deleted, http } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/goodsService/list', params);
}

export async function info(id: number) {
  return queryInfo('/goodsService/detail', id);
}

export async function create(data: Service.Detail) {
  return created('/goodsService/create', data);
}

export async function update(data: Service.Detail) {
  return updated('/goodsService/update', data);
}

export async function remove(id: number) {
  return deleted('/goodsService/delete', id);
}

export async function all() {
  return http('/goodsService/all');
}
