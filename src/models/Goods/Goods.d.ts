declare namespace Goods {
  export type GoodsType = 'general' | 'virtual';
  export type GoodsStatus = 0 | 1;

  export type Detail = {
    id?: number;
    shop_id?: number;
    user_id?: number;
    category_id?: number;
    brand_id?: number;
    sku_id?: number;
    name?: string;
    sale_price?: number;
    market_price?: number;
    cost_price?: number;
    achieve_price?: number;
    stock?: number;
    stock_alarm?: number;
    introduction?: string;
    keywords?: string;
    type?: GoodsType;
    clicks?: number;
    sales?: number;
    virtual_sales?: number;
    status?: GoodsStatus;
    recommend_way?: number;
    is_on_sale?: number;
    is_consume_discount?: number;
    is_free_shipping?: number;
    buy_max?: number;
    buy_min?: number;
    refund_type?: string;
    images?: string;
    video_url?: string;
    created_time?: number;
    updated_time?: number;
    deleted_time?: number;
    attribute?: Attribute;
    timer?: Timer;
  };

  export type Attribute = {
    id?: number;
    goods_id?: number;
    is_spec_open?: Common.Boolean;
    unit?: string;
    weight?: number;
    volume?: number;
    service_ids?: number[];
    parameter?: string;
    content?: content;
    created_time?: number;
    updated_time?: number;
  };

  export type Timer = {
    id?: number;
    goods_id?: number;
    on?: Common.Boolean;
    off?: Common.Boolean;
    on_time?: number;
    off_time?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Parameter = {
    id?: number;
    goods_id?: number;
    option?: string;
    value?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type Sku = {
    id?: number;
    shop_id?: number;
    goods_id?: number;
    sku_name?: string;
    sku_no?: string;
    sale_price?: number;
    market_price?: number;
    cost_price?: number;
    stock?: number;
    stock_alarm?: number;
    clicks?: number;
    sales?: number;
    virtual_sales?: number;
    weight?: number;
    volume?: number;
    is_default?: Common.Boolean;
    image?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type SkuSpecValue = {
    id?: number;
    goods_sku_id?: number;
    spec_value_id?: number;
  };
}
