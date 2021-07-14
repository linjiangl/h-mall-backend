import React, { useState } from 'react';
import { message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
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
  const [form] = ProForm.useForm();
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

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title={`${detail.id ? '编辑' : '创建'}品牌`}
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        handleCreateOrUpdate({
          ...values,
          id: detail.id
        });
      }}
      initialValues={defaultDetail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProFormText
        width="md"
        name="name"
        label="品牌名称"
        rules={[{ required: true, type: 'string', max: 20 }]}
      />

      <ProForm.Item
        name="logo"
        label="公司商标"
        help="公司商标大小为128*128px"
        wrapperCol={{ span: 15 }}
        rules={[{ required: true, type: 'url', max: 255 }]}
      >
        <ImageSingle />
      </ProForm.Item>

      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[{ required: true, type: 'enum', enum: [0, 1] }]}
        options={[
          {
            label: '禁用',
            value: 0,
          },
          {
            label: '启用',
            value: 1,
          },
        ]}
      />
    </DrawerForm>
  );
};

export default FormPage;
