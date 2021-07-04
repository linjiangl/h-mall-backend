declare namespace Payment {
  export type Detail = {
    id?: number;
    user_id?: number;
    order_ids?: string;
    business_no?: string;
    payment_method?: string;
    trade_no?: string;
    amount?: number;
    status?: number;
    remark?: string;
    finished_time?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Refund = {
    id?: number;
    user_id?: number;
    order_id?: number;
    refund_id?: number;
    payment_business_no?: string;
    business_no?: string;
    refund_method?: string;
    trade_no?: string;
    amount?: number;
    status?: number;
    remark?: string;
    finished_time?: number;
    created_time?: number;
    updated_time?: number;
  };
}
