import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import ProForm from '@ant-design/pro-form';
import SkuOperation from './Operation';
import SkuTable from './Table';
import SkuSpec from './Spec';

type ParamsProps = {
  max?: number;
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 3,
    },
  },
};

const SkuMultiple: React.FC<ParamsProps> = (props) => {
  const { max } = props;
  const [reload, setReload] = useState<boolean>(false);
  const [sku, setSku] = useState<object[]>([
    {
      id: 0,
    },
    {
      id: 0,
    },
  ]);

  const handleAddSku = () => {
    const tmp = sku;
    tmp.push({
      id: 1,
    });
    setSku(tmp);
    setReload(!reload);
  };

  useEffect(() => {}, [reload]);

  return (
    <>
      <ProForm.Item {...tailFormItemLayout}>
        <a>创建新规格</a>
      </ProForm.Item>

      {sku.map((item, index) => {
        return (
          <ProForm.Item key={index} label={`规格项${index + 1}`}>
            <SkuSpec />
          </ProForm.Item>
        );
      })}

      {sku.length < (max as number) && (
        <ProForm.Item {...tailFormItemLayout}>
          <Button type="primary" onClick={handleAddSku}>
            添加规格
          </Button>
        </ProForm.Item>
      )}

      <ProForm.Item label="批量操作">
        <SkuOperation />
      </ProForm.Item>

      <ProForm.Item
        {...tailFormItemLayout}
        help="默认展示，是多规格商品在客户访问商品时，默认显示的商品规格"
      >
        <SkuTable />
      </ProForm.Item>
    </>
  );
};

SkuMultiple.defaultProps = {
  max: 3,
};

export default SkuMultiple;
