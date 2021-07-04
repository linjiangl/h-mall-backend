declare namespace Common {
  export type Error = {
    code?: number;
    error?: string;
  };

  export type Upload = {
    hash: string;
    path: string;
    full_path: string;
  };

  export type IValueEnum = {
    [key: string]:
      | React.ReactNode
      | {
          text: React.ReactNode;
          status: 'Success' | 'Error' | 'Processing' | 'Warning' | 'Default';
        };
  };
}
