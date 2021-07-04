declare namespace Order {
  export type Detail = {
    id?: number;
    shop_id?: number;
    buyer_id?: number;
    order_sn?: string;
    payment_method?: string;
    payment_no?: string;
    goods_amount?: number;
    total_amount?: number;
    express_amount?: number;
    discount_amount?: number;
    consignee?: string;
    mobile?: string;
    city?: string;
    district?: string;
    street?: string;
    address?: string;
    zip_code?: string;
    is_dispatched?: number;
    is_comment?: number;
    is_additional?: number;
    is_credited?: number;
    payment_time?: number;
    dispatched_time?: number;
    confirmed_time?: number;
    canceled_time?: number;
    comment_time?: number;
    additional_comment_time?: number;
    status?: number;
    buyer_message?: string;
    seller_message?: string;
    refund_type?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Goods = {
    id?: number;
    order_id?: number;
    goods_id?: number;
    goods_sku_id?: number;
    goods_name?: string;
    goods_sku_name?: string;
    quantity?: number;
    total_amount?: number;
    discount_amount?: number;
    refund_id?: number;
    refund_goods_id?: number;
    refund_status?: number;
    refund_type?: string;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Invoice = {
    id?: number;
    shop_id?: number;
    user_id?: number;
    order_id?: number;
    order_sn?: string;
    open_type?: number;
    type?: number;
    title?: string;
    text_id?: number;
    taxpayer_no?: string;
    status?: number;
    invoice_url?: string;
    refused_reason?: string;
    invoice?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Express = {
    id?: number;
    order_id?: number;
    refund_id?: number;
    express_id?: number;
    express_name?: string;
    express_no?: string;
    text_id?: number;
    remark?: string;
    created_time?: number;
    updated_time?: number;
  };
}
