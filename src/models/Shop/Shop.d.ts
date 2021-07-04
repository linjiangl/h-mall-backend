declare namespace Shop {
  export type Statement = {
    id?: number;
    shop_id?: number;
    user_id?: number;
    amount?: number;
    type?: string;
    module?: string;
    module_id?: number;
    order_sn?: string;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };
}
