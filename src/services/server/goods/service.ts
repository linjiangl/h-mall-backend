import { queryList, queryInfo, created, updated, deleted, http } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryList('/goodsServiceTemplate/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/goodsServiceTemplate/info', id);
}

export async function create(data: Service.Detail) {
  return created('/goodsServiceTemplate/create', data);
}

export async function update(data: Service.Detail) {
  return updated('/goodsServiceTemplate/update', data);
}

export async function remove(id: number) {
  return deleted('/goodsServiceTemplate/delete', id);
}

export async function all() {
  return http('/goodsServiceTemplate/all');
}
