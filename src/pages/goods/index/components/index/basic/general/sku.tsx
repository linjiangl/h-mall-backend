import React, { useState, useContext } from 'react';
import { Switch } from 'antd';
import ProForm from '@ant-design/pro-form';
import GoodsContext from '@/contexts/goods';
import SkuDefault from '../common/sku/Default';
import SkuMultiple from '../common/sku/Multiple';

const FormConfig: React.FC = () => {
  const goodsDetail: Goods.Detail = useContext(GoodsContext);
  const [visible, setVisible] = useState<boolean>(!!goodsDetail.attribute?.is_open_spec);

  return (
    <>
      <ProForm.Item name={['attribute', 'is_open_spec']} label="启用多规格">
        <Switch
          checked={visible}
          checkedChildren="开启"
          unCheckedChildren="关闭"
          onChange={setVisible}
        />
      </ProForm.Item>

      {visible ? <SkuMultiple /> : <SkuDefault />}
    </>
  );
};

export default FormConfig;
