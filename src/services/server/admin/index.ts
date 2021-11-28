import { queryPaginate, queryInfo, created, updated } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryPaginate('/admin/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/admin/info', id);
}

export async function create(data: Admin.Detail) {
  return created('/admin/create', data);
}

export async function update(data: Admin.Detail) {
  return updated('/admin/update', data);
}
