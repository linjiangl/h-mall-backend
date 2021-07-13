import React, { useState } from 'react';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { message } from 'antd';
import { initializesObjectData } from '@/utils/utils';
import { create, update } from '@/services/goods/ParameterOptions';
import OptionValues from './ParameterOptionValues';
import FormSotring from '@/components/Tools/Form/sorting';

type ParamsProps = {
  formVisible: boolean;
  parameterId: number;
  detail: Parameter.Options;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defaultValues: Parameter.Options = {
  id: 0,
    type: 0,
    option: '',
    values: [],
    sorting: 0,
}

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { formVisible, parameterId, detail, onCancel } = props;
  const [defaultDetail] = useState<Parameter.Options>(initializesObjectData(detail, defaultValues));

  const handleCreateOrUpdate = (formData: Parameter.Options) => {
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

  const setFormData = (obj: object) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...obj,
    });
  };

  return (
    <DrawerForm
      visible={formVisible}
      title={(detail.id ? '编辑' : '创建') + '属性'}
      form={form}
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        values.id = detail.id;
        values.parameter_id = parameterId;
        handleCreateOrUpdate(values);
      }}
      initialValues={defaultDetail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProFormText
        width="md"
        name="option"
        label="属性名称"
        rules={[{ required: true, type: 'string', max: 100 }]}
      />

      <ProFormRadio.Group
        name="type"
        label="属性类型"
        tooltip="属性类型不可更改，输入不参与筛选"
        options={[
          {
            label: '单选',
            value: 0,
          },
          {
            label: '多选',
            value: 1,
            disabled: true,
          },
          {
            label: '输入',
            value: 2,
            disabled: true,
          },
        ]}
      />

      <FormSotring />

      <ProForm.Item name="values" label="属性值" rules={[{ required: true }]}>
        <OptionValues values={detail.values || []} onChange={(values) => setFormData({ values })} />
      </ProForm.Item>
    </DrawerForm>
  );
};

export default FormPage;
