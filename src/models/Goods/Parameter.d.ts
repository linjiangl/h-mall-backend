declare namespace Parameter {
  export type Detail = {
    id?: number;
    shop_id?: number;
    name?: string;
    created_time?: number;
    updated_time?: number;
  };

  export type OptionsType = 0 | 1 | 2;

  export type Options = {
    id?: number;
    parameter_id?: number;
    option?: string;
    values?: React.Key[];
    type?: OptionsType;
    sorting?: number;
    created_time?: number;
    updated_time?: number;
  };
}
