/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import { Drawer, Card } from 'antd';
import ProField from '@ant-design/pro-field';

type ParamsProps = {
  visible: boolean;
  json: object;
  title?: string;
  remark?: string;
  onCancel: (visible: boolean) => void;
};

const JsonView: React.FC<ParamsProps> = (props) => {
  const { visible, json, title, remark, onCancel } = props;

  return (
    <Drawer
      title={title}
      width={720}
      onClose={() => onCancel(false)}
      visible={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Card title={remark}>
        <ProField
          fieldProps={{
            style: {
              width: '100%',
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(json)}
        />
      </Card>
    </Drawer>
  );
};

JsonView.defaultProps = {
  visible: false,
  title: 'Json View',
  remark: '',
};

export default JsonView;
