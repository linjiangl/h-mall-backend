import { http, queryList, queryInfo, created, updated, deleted } from '@/utils/request';

export async function list(params: API.TableRequestParams) {
  return queryList('/message/paginate', params);
}

export async function announce(requestParams: API.TableRequestParams) {
  return list({
    ...requestParams,
    params: {
      ...requestParams.params,
      type: 'announce',
    },
  });
}

export async function remind(requestParams: API.TableRequestParams) {
  return list({
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
