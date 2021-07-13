import React, { useState } from 'react';
import { Space, Button, Input } from 'antd';

enum operationType {
  sale_price = '销售价',
  market_price = '划线价',
  cost_price = '成本价',
  stock = '库存',
  stock_alarm = '库存预警',
  weight = '重量(kg)',
  volume = '体积(m³)',
  sku_no = '商品编码',
}

const SkuOperation: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<operationType>(operationType.sale_price);

  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: 'John Brown',
      age: i + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    });
  }

  const handleAction = (type: operationType) => {
    setCurrentType(type);
    setVisible(true);
  };

  const handleSubmit = () => {
    setVisible(false);
  };

  return (
    <>
      {visible ? (
        <Space style={{ marginLeft: 8 }}>
          <Input placeholder={currentType} />
          <Button
            type="primary"
            onClick={() => {
              handleSubmit();
            }}
          >
            确认
          </Button>
          <Button
            type="default"
            onClick={() => {
              setVisible(false);
            }}
          >
            取消
          </Button>
        </Space>
      ) : (
        <Space size={0}>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.sale_price);
            }}
          >
            {operationType.sale_price}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.market_price);
            }}
          >
            {operationType.market_price}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.cost_price);
            }}
          >
            {operationType.cost_price}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.stock);
            }}
          >
            {operationType.stock}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.stock_alarm);
            }}
          >
            {operationType.stock_alarm}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.weight);
            }}
          >
            {operationType.weight}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.volume);
            }}
          >
            {operationType.volume}
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              handleAction(operationType.sku_no);
            }}
          >
            {operationType.sku_no}
          </Button>
        </Space>
      )}
    </>
  );
};

export default SkuOperation;
