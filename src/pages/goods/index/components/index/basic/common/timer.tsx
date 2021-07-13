import React from 'react';
import { Form, DatePicker } from 'antd';
import type { Rule } from 'antd/lib/form';
import moment from 'moment';

type ParamsProps = {
  name?: any;
  label?: string;
  rules?: Rule[];
};

const FormNumber: React.FC<ParamsProps> = (props) => {
  const { name, rules } = props;

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 4,
        offset: 3,
      },
    },
  };

  return (
    <Form.Item name={name} rules={rules} {...tailFormItemLayout}>
      <DatePicker
        showTime
        inputReadOnly
        secondStep={60}
        minuteStep={10}
        placeholder=""
        disabledDate={(current) => {
          return current && current < moment().startOf('day');
        }}
      />
    </Form.Item>
  );
};

FormNumber.defaultProps = {
  name: 'date',
  rules: [],
};

export default FormNumber;
