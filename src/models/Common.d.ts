declare namespace Common {
  export type Object = Record<string, unknown>;

  export type Error = {
    code?: number;
    error?: string;
  };

  export type Upload = {
    hash: string;
    path: string;
    full_path: string;
  };

  export type Boolean = 0 | 1;

  export type IValueEnum = Record<
    string,
    | React.ReactNode
    | {
        text: React.ReactNode;
        status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
      }
  >;
}
