declare namespace Message {
  export type Detail = {
    id?: number;
    sender_id?: number;
    receiver_id?: number;
    text_id?: number;
    type?: string;
    module?: string;
    module_id?: number;
    module_url?: string;
    status?: number;
    created_time?: number;
    updated_time?: number;
    is_force_push?: number;
    to?: User.Detail;
    text?: Text;
  };

  export type Text = {
    id?: number;
    title?: string;
    content?: string;
  };

  export type Receiver = {
    id?: number;
    user_id?: number;
    message_id?: number;
    status?: number;
    created_time?: number;
    updated_time?: number;
  };

  export type Subscription = {
    user_id?: number;
    setting?: string;
    created_time?: number;
    updated_time?: number;
  };
}
