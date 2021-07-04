declare namespace Refund {
  export type Detail = {
    id?: number;
    user_id?: number;
    shop_id?: number;
    order_id?: number;
    refund_sn?: string;
    order_sn?: string;
    order_status?: number;
    service_type?: string;
    express_status?: number;
    amount?: number;
    reason?: string;
    status?: number;
    applied_time?: number;
    edited_time?: number;
    canceled_time?: number;
    refused_time?: number;
    shipped_time?: number;
    received_time?: number;
    finished_time?: number;
    failed_time?: number;
    address?: string;
    proofs?: string;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Goods = {
    id?: number;
    refund_id?: number;
    order_id?: number;
    order_goods_id?: number;
    goods_id?: number;
    goods_sku_id?: number;
    amount?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Action = {
    id?: number;
    refund_id?: number;
    order_id?: number;
    user_id?: number;
    action_user_id?: number;
    refund_status?: number;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };
}
