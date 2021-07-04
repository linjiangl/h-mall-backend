declare namespace API {
  export type CurrentUser = {
    avatar?: string;
    id?: number;
    access?: 'user' | 'guest' | 'admin';
    username?: string;
    real_name?: string;
    lasted_login_time?: number;
    unreadCount: number;
  };

  export type LoginStateType = {
    status?: 'ok' | 'error';
    type?: string;
  };

  export type NoticeIconData = {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  };

  export type TableListData<T> = {
    current_page: number;
    per_page: number;
    last_page: number;
    total: number;
    data: T[];
  };

  export type TableRequestParams = {
    params: {
      pageSize?: number;
      current?: number;
      [key?: string]: any;
    };
    sort?: Record<string, 'descend' | 'ascend' | null>;
    filter?: Record<string, React.ReactText[]>;
  };

  export type RequestParams = {
    page?: number;
    limit?: number;
    status?: string;
    name?: string;
    title?: string;
    sorter?: string;
  };
}
