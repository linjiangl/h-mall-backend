declare namespace User {
  export type Detail = {
    id?: number;
    username?: string;
    nickname?: string;
    mobile?: string;
    avatar?: string;
    sex?: 1 | 2 | 3;
    email?: string;
    status?: 1 | 2;
    is_system?: 0 | 1;
    lasted_login_time?: number;
    mobile_verified_time?: number;
    avatar_updated_time?: number;
    username_updated_time?: number;
    created_time?: number;
    updated_time?: number;
    wallet?: Wallet;
  };

  export type Wallet = {
    user_id: number;
    balance: number;
    integral: number;
    freeze_balance: number;
    freeze_integral: number;
  };

  export type VipCard = {
    id?: number;
    user_id?: number;
    serial_no?: string;
    grade?: number;
    total_exp?: number;
    current_exp?: number;
    real_name?: string;
    mobile?: string;
    id_card?: string;
    password?: string;
    status?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Address = {
    id?: number;
    user_id?: number;
    name?: string;
    mobile?: string;
    province_id?: number;
    province?: string;
    city_id?: number;
    city?: string;
    district_id?: number;
    district?: string;
    street_id?: number;
    street?: string;
    address?: string;
    zip_code?: string;
    is_default?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Favorite = {
    id?: number;
    user_id?: number;
    module?: string;
    module_id?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type History = {
    id?: number;
    user_id?: number;
    goods_id?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Invoice = {
    id?: number;
    user_id?: number;
    open_type?: number;
    type?: number;
    title?: string;
    taxpayer_no?: string;
    register_address?: string;
    register_phone?: string;
    bank_name?: string;
    bank_account?: string;
    content_type?: string;
    email?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Statement = {
    id?: number;
    user_id?: number;
    type?: string;
    amount?: number;
    integral?: number;
    description?: string;
    module?: string;
    module_id?: number;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };
}
