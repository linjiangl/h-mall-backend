import React from 'react';
import Editor from '@/components/Tools/Editor';
import { onCallback } from '@/utils/utils';

type ParamsProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const FormContent: React.FC<ParamsProps> = (props) => {
  const { value, onChange } = props;

  return (
    <Editor
      value={value}
      onChange={(v) => {
        onCallback(onChange, [v]);
      }}
    />
  );
};

export default FormContent;
