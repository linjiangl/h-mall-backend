import { queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/parameterOptions/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/parameterOptions/info', id);
}

export async function create(data: Parameter.Options) {
  return created('/parameterOptions/create', data);
}

export async function update(data: Parameter.Options) {
  return updated('/parameterOptions/update', data);
}

export async function remove(id: number) {
  return deleted('/parameterOptions/delete', id);
}
