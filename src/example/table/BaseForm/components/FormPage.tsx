import React, { useState } from 'react';
import { Drawer, Form, Button, Input, Radio, message } from 'antd';
import { initializesObjectData } from '@/utils/utils';
import { create, update } from '@/services/server/goods/brand';

import ImageSingle from '@/components/Tools/Uploader/Image/Single';

type ParamsProps = {
  formVisible: boolean;
  detail: Brand.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defalutValues: Brand.Detail = {
  id: 0,
  name: '',
  logo: '',
  status: 1,
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = Form.useForm();
  const { detail, formVisible, onCancel } = props;
  const [defaultDetail] = useState<Brand.Detail>(initializesObjectData(detail, defalutValues));

  const handleCreateOrUpdate = (formData: Brand.Detail) => {
    if (formData.id) {
      update(formData)
        .then(() => {
          message.success('修改成功');
          onCancel(false, true);
        })
        .catch(() => {});
    } else {
      create(formData)
        .then(() => {
          message.success('创建成功');
          onCancel(false, true);
        })
        .catch(() => {});
    }
  };

  const onFinish = () => {
    form
      .validateFields()
      .then((values) => {
        let formData: Brand.Detail = values;
        formData.id = detail.id;
        formData = Object.assign(defaultDetail, formData);
        handleCreateOrUpdate(formData);
      })
      .catch(() => {});
  };

  return (
    <Drawer
      title={`${detail.id ? '编辑' : '创建'}品牌`}
      width={720}
      onClose={() => onCancel(false, false)}
      visible={formVisible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={() => onCancel(false, false)} style={{ marginRight: 8 }}>
            取消
          </Button>
          <Button onClick={onFinish} type="primary">
            确认
          </Button>
        </div>
      }
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        initialValues={defaultDetail}
      >
        <Form.Item
          name="name"
          label="品牌名称"
          rules={[{ required: true, type: 'string', max: 20 }]}
        >
          <Input placeholder="请输入品牌名称" />
        </Form.Item>

        <Form.Item
          name="logo"
          label="公司商标"
          help="公司商标大小为128*128px"
          wrapperCol={{ span: 15 }}
          rules={[{ required: true, type: 'url', max: 255 }]}
        >
          <ImageSingle />
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          rules={[{ required: true, type: 'enum', enum: [0, 1] }]}
        >
          <Radio.Group optionType="button" buttonStyle="solid">
            <Radio.Button value={0}>禁用</Radio.Button>
            <Radio.Button value={1}>启用</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormPage;
