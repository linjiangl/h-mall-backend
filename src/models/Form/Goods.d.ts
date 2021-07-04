declare namespace Form {
  type Goods = Goods.Detail & {
    category_ids?: React.Key[];
    timer?: Goods.Timer & {
      extend?: {
        on_time?: moment;
        off_time?: moment;
      };
    };
  };
}
