import React, { useState, useEffect } from 'react';
import { Tabs, message, Form, Space, Button } from 'antd';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProForm from '@ant-design/pro-form';
import { toDatePicker } from '@/utils/utils';
import GoodsContext from '@/contexts/goods';
import FormBasic from './basic';
import FormContent from './content';

const { TabPane } = Tabs;

enum TabKeys {
  basic = 'basic',
  content = 'content',
  parameter = 'parameter',
}

type ParamsProps = {
  //
};

const defaultValues: Form.Goods = {
  id: 0,
  shop_id: 0,
  user_id: 0,
  category_ids: [1, 2],
  brand_id: 0,
  sku_id: 0,
  type: 'general',
  name: '',
  introduction: '',
  keywords: '',
  is_consume_discount: 0,
  is_on_sale: 0,
  recommend_way: 0,
  status: 1,
  attribute: {
    content: '',
    is_spec_open: 1,
    service_ids: [],
  },
  timer: {
    on: 1,
    off: 0,
    on_time: 1612509680,
    extend: {
      on_time: toDatePicker(1612509600),
      off_time: toDatePicker(1612509600),
    },
  },
};

const FormPage: React.FC<ParamsProps> = () => {
  const [form] = ProForm.useForm();
  const [detail] = useState<Goods.Detail>(defaultValues);

  useEffect(() => {}, []);

  return (
    <GoodsContext.Provider value={detail}>
      <ProForm
        form={form}
        submitter={{
          render: (submitProps) => (
            <FooterToolbar>
              <Space>
                <Button type="primary">上一步</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    submitProps.form?.submit?.();
                  }}
                >
                  确认
                </Button>
                <Button type="primary">下一步</Button>
              </Space>
            </FooterToolbar>
          ),
        }}
        onFinish={async (values) => {
          console.log({
            ...values,
            type: defaultValues.type,
          });
          message.success('提交成功');
        }}
        initialValues={detail}
        layout="horizontal"
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 18 }}
      >
        <Tabs defaultActiveKey={TabKeys.basic}>
          <TabPane tab="基础设置" key={TabKeys.basic}>
            <FormBasic
              type={detail.type as Goods.GoodsType}
              onChange={(type) => {
                defaultValues.type = type;
              }}
            />
          </TabPane>
          <TabPane tab="商品详情" key={TabKeys.content} forceRender>
            <Form.Item name={['attribute', 'content']} label="商品详情">
              <FormContent />
            </Form.Item>
          </TabPane>
          <TabPane tab="商品属性" key={TabKeys.parameter} forceRender>
            商品属性
          </TabPane>
        </Tabs>
      </ProForm>
    </GoodsContext.Provider>
  );
};

export default FormPage;
