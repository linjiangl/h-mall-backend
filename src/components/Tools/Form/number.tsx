import React from 'react';
import { Form, InputNumber, Space } from 'antd';
import type { Rule } from 'antd/lib/form';

type ParamsProps = {
  value?: number;
  name?: string | string[];
  label?: string;
  min?: number;
  max?: number;
  rules?: Rule[];
  help?: string;
  unit?: string;
  width?: number;
};

const FormNumber: React.FC<ParamsProps> = (props) => {
  const { value, name, label, min, max, rules, help, unit, width } = props;

  return (
    <Form.Item name={name} label={label} rules={rules} help={help}>
      <Space>
        <InputNumber defaultValue={value} min={min} max={max} style={{ width }} />
        <span>{unit}</span>
      </Space>
    </Form.Item>
  );
};

FormNumber.defaultProps = {
  value: 0,
  name: 'stock',
  label: '库存',
  min: 0,
  max: undefined,
  rules: [],
  help: undefined,
  unit: '',
  width: 105,
};

export default FormNumber;
