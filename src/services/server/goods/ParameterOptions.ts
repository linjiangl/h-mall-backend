import {
  queryList,
  queryInfo,
  created,
  updated,
  deleted,
  requestPropertyToArray,
} from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/parameterOptions/list', params);
}

export async function info(id: number) {
  return queryInfo('/parameterOptions/detail', id);
}

export async function create(data: Parameter.Options) {
  return created('/parameterOptions/create', requestPropertyToArray('values', data));
}

export async function update(data: Parameter.Options) {
  return updated('/parameterOptions/update', requestPropertyToArray('values', data));
}

export async function remove(id: number) {
  return deleted('/parameterOptions/delete', id);
}
