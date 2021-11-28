import { http, queryPaginate, queryInfo, created, updated, deleted } from '@/utils/request';

export async function paginate(params: API.TableRequestParams) {
  return queryPaginate('/message/paginate', params);
}

export async function announce(requestParams: API.TableRequestParams) {
  return paginate({
    ...requestParams,
    params: {
      ...requestParams.params,
      type: 'announce',
    },
  });
}

export async function remind(requestParams: API.TableRequestParams) {
  return paginate({
    ...requestParams,
    params: {
      ...requestParams.params,
      type: 'remind',
    },
  });
}

export async function info(id: number) {
  return queryInfo('/message/info', id);
}

export async function create(data: Message.Detail) {
  return created('/message/create', data);
}

export async function update(data: Message.Detail) {
  return updated('/message/update', data);
}

export async function remove(id: number) {
  return deleted('/message/delete', id);
}

export async function updateText(data: Message.Text) {
  return http('/message/updateText', data);
}
