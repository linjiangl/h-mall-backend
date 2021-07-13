import React, { useState } from 'react';
import { message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { initializesObjectData } from '@/utils/utils';
import SpaceValues from './SpecValues';
import { create, update } from '@/services/goods/spec';

type ParamsProps = {
  formVisible: boolean;
  detail: Spec.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defaultValues: Spec.Detail = {
  id: 0,
  shop_id: 0,
  name: '',
  sorting: 0,
  status: 1,
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { detail, formVisible, onCancel } = props;
  const [defaultDetail, setDefaultDetail] = useState<Spec.Detail>(
    initializesObjectData(detail, defaultValues),
  );

  const handleCreateOrUpdate = (formData: Spec.Detail) => {
    if (formData.id) {
      update(formData)
        .then(() => {
          message.success('修改成功');
          onCancel(false, true);
        })
        .catch(() => {});
    } else {
      create(formData)
        .then((res) => {
          message.success('创建成功');
          setDefaultDetail({
            ...form.getFieldsValue(),
            id: res,
          });
        })
        .catch(() => {});
    }
  };

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title={(detail.id ? '编辑' : '创建') + '规格'}
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        values.id = defaultDetail.id;
        handleCreateOrUpdate(values);
      }}
      initialValues={defaultDetail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      width="780"
    >
      <ProFormText
        width="md"
        name="name"
        label="规格名称"
        placeholder="请输入规格名称"
        rules={[{ required: true, type: 'string', max: 20 }]}
      />

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

      {defaultDetail.id != 0 && (
        <ProForm.Item name="values" label="规格值">
          <SpaceValues specId={defaultDetail.id || 0} values={defaultDetail.values || []} />
        </ProForm.Item>
      )}
    </DrawerForm>
  );
};

export default FormPage;
