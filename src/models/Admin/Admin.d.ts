declare namespace Admin {
  export type Detail = {
    id?: number;
    username?: string;
    real_name?: string;
    mobile?: string;
    avatar?: string;
    email?: string;
    status?: 0 | 1;
    lasted_login_time?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type ActionRequest = {
    method: string;
    url: string;
    data: any;
  };

  export type Action = {
    id?: number;
    admin_id?: number;
    username?: string;
    client_ip?: string;
    module?: string;
    action?: string;
    status?: number;
    remark?: ActionRequest;
    created_time?: number;
    updated_time?: number;
  };

  export type Login = {
    id?: number;
    admin_id?: number;
    username?: string;
    client_ip?: string;
    user_agent?: string;
    status?: number;
    created_time?: number;
    updated_time?: number;
  };
}
