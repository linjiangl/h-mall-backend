declare namespace Spec {
  export type Detail = {
    id?: number;
    shop_id?: number;
    name?: string;
    sorting?: number;
    status?: 0 | 1;
    created_time?: number;
    updated_time?: number;
    values?: SpecValue.Detail[];
  };

  export type Value = {
    id?: number;
    spec_id?: number;
    value?: string;
    sorting?: number;
    created_time?: number;
    updated_time?: number;
  };
}
