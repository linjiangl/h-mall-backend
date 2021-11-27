import { queryList, queryInfo, created, updated, http } from '@/utils/request';

export enum GoodsStatus {
  ON_SALES = 1,
  OFF_SALES = 0,
}

export enum GoodsTimerStatus {
  ON = 1,
  OFF = 0,
}

export async function list(params: API.TableRequestParams) {
  return queryList('/goods/paginate', params);
}

export async function info(id: number) {
  return queryInfo('/goods/info', id);
}

export async function create(data: Goods.Detail) {
  return created('/goods/create', data);
}

export async function update(data: Goods.Detail) {
  return updated('/goods/update', data);
}

export async function updateStatus(id: number, status: Goods.GoodsStatus) {
  return http('/goods/updateStatus', {
    id,
    status,
  });
}

export async function remove(selectIds: number[]) {
  return http('/goods/delete', {
    select_ids: selectIds.join(','),
  });
}

export async function recycle(selectIds: number[]) {
  return http('/goods/delete', {
    select_ids: selectIds.join(','),
  });
}
