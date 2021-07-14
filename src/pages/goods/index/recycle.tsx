import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { Space, Button, Input } from 'antd';

enum batchActinType {
  sale_price = '销售价',
  market_price = '划线价',
  cost_price = '成本价',
  stock = '库存',
  stock_alarm = '库存预警',
  weight = '重量(kg)',
  volume = '体积(m³)',
  sku_no = '商品编码',
}

const TableList: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentActionType, setCurrentActionType] = useState<batchActinType>(
    batchActinType.sale_price,
  );

  const columns: Common.Object[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'left',
    },
    {
      title: 'Other',
      children: [
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
          width: 150,
        },
        {
          title: 'Address',
          children: [
            {
              title: 'Street',
              dataIndex: 'street',
              key: 'street',
              width: 150,
            },
            {
              title: 'Block',
              children: [
                {
                  title: 'Building',
                  dataIndex: 'building',
                  key: 'building',
                  width: 100,
                },
                {
                  title: 'Door No.',
                  dataIndex: 'number',
                  key: 'number',
                  width: 100,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      title: 'Company',
      children: [
        {
          title: 'Company Address',
          dataIndex: 'companyAddress',
          key: 'companyAddress',
          width: 200,
        },
        {
          title: 'Company Name',
          dataIndex: 'companyName',
          key: 'companyName',
        },
      ],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 80,
      fixed: 'right',
    },
  ];

  const data = [];
  for (let i = 0; i < 10; i += 1) {
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

  const handleAction = (type: batchActinType) => {
    setCurrentActionType(type);
    setVisible(true);
  };

  const handleSubmit = () => {
    setVisible(false);
  };

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        dataSource={data}
        bordered
        options={false}
        search={false}
        pagination={false}
        toolBarRender={() => []}
        headerTitle={
          <>
            <span>批量操作:</span>
            {visible ? (
              <Space style={{ marginLeft: 8 }}>
                <Input placeholder={currentActionType} />
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
                    handleAction(batchActinType.sale_price);
                  }}
                >
                  {batchActinType.sale_price}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.market_price);
                  }}
                >
                  {batchActinType.market_price}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.cost_price);
                  }}
                >
                  {batchActinType.cost_price}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.stock);
                  }}
                >
                  {batchActinType.stock}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.stock_alarm);
                  }}
                >
                  {batchActinType.stock_alarm}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.weight);
                  }}
                >
                  {batchActinType.weight}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.volume);
                  }}
                >
                  {batchActinType.volume}
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    handleAction(batchActinType.sku_no);
                  }}
                >
                  {batchActinType.sku_no}
                </Button>
              </Space>
            )}
          </>
        }
      />
    </PageContainer>
  );
};

export default TableList;
