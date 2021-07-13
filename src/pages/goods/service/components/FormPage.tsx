import React, { useState } from 'react';
import ProForm, { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { message } from 'antd';
import { initializesObjectData } from '@/utils/utils';
import { create, update } from '@/services/server/goods/service';
import FormSotring from '@/components/Tools/Form/sorting';

type ParamsProps = {
  formVisible: boolean;
  detail: Service.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defaultValues: Service.Detail = {
  id: 0,
  name: '',
  description: '',
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { detail, formVisible, onCancel } = props;
  const [defaultDetail] = useState<Service.Detail>(initializesObjectData(detail, defaultValues));

  const handleCreateOrUpdate = (formData: Service.Detail) => {
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
      title={(detail.id ? '编辑' : '创建') + '商品服务'}
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        values.id = detail.id;
        handleCreateOrUpdate(values);
      }}
      initialValues={defaultDetail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProFormText
        width="md"
        name="name"
        label="商品服务"
        placeholder="请输入商品服务名称"
        rules={[{ required: true, type: 'string', max: 20 }]}
      />

      <ProFormTextArea name="description" label="描述" />

      <FormSotring />
    </DrawerForm>
  );
};

export default FormPage;
