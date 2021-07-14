import React, { useState } from 'react';
import { message } from 'antd';
import ProForm, { DrawerForm, ProFormText } from '@ant-design/pro-form';
import { initializesObjectData } from '@/utils/utils';
import { create, update } from '@/services/server/goods/parameter';

type ParamsProps = {
  formVisible: boolean;
  detail: Parameter.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defaultValues: Parameter.Detail = {
  id: 0,
  shop_id: 0,
  name: '',
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { detail, formVisible, onCancel } = props;
  const [defaultDetail] = useState<Parameter.Detail>(initializesObjectData(detail, defaultValues));

  const handleCreateOrUpdate = (formData: Parameter.Detail) => {
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
      title={`${detail.id ? '编辑' : '创建'}属性模版`}
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
        label="模版名称"
        placeholder="请输入模版名称"
        rules={[{ required: true, type: 'string', max: 100 }]}
      />
    </DrawerForm>
  );
};

export default FormPage;
