declare namespace Category {
  export type Detail = {
    id?: number;
    parent_id?: number;
    name?: string;
    icon?: string;
    cover?: string;
    sorting?: number;
    status?: number;
    created_time?: number;
    updated_time?: number;
    parent?: Detail;
    children?: Detail[];
  };

  export type Spec = {
    id?: number;
    category_id?: number;
    spec_id?: number;
  };
}
