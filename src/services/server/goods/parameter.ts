import { queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryList('/parameter/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/parameter/info', id);
}

export async function create(data: Parameter.Detail) {
  return created('/parameter/create', data);
}

export async function update(data: Parameter.Detail) {
  return updated('/parameter/update', data);
}

export async function remove(id: number) {
  return deleted('/parameter/delete', id);
}
