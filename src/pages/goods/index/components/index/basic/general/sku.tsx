import React, { useState } from 'react';
import { Switch } from 'antd';
import ProForm from '@ant-design/pro-form';
import SkuDefault from '../common/sku/Default';
import SkuMultiple from '../common/sku/Multiple';

type ParamsProps = {};

const FormConfig: React.FC<ParamsProps> = (props) => {
  const {} = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <ProForm.Item label="启用多规格">
        <Switch onChange={setVisible} />
      </ProForm.Item>

      {visible ? <SkuMultiple /> : <SkuDefault />}
    </>
  );
};

export default FormConfig;
