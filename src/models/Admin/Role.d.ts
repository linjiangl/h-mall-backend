declare namespace Role {
  export type Detail = {
    id?: number;
    parent_id?: number;
    name?: string;
    identifier?: string;
    is_super?: 0 | 1;
    is_system?: 0 | 1;
    status?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Admin = {
    id?: number;
    role_id?: number;
    admin_id?: number;
  };

  export type Menu = {
    id?: number;
    role_id?: number;
    menu_id?: number;
  };
}
