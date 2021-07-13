import React, { useState } from 'react';
import { Select, Switch, message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { create } from '@/services/server/message';

const { Option } = Select;

type ParamsProps = {
  formVisible: boolean;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const SendMessage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { formVisible, onCancel } = props;
  const [checked, setChecked] = useState<boolean>(false);

  const setFormData = (obj: object) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...obj,
    });
  };

  const handleCreateOrUpdate = (formData: Message.Detail) => {
    create(formData)
      .then(() => {
        message.success('创建成功');
        onCancel(false, true);
      })
      .catch(() => {});
  };

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title="新建系统公告"
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        handleCreateOrUpdate({
          ...values,
          type: 'announce',
          module_url: values.module_url || '',
          is_force_push: values.is_force_push,
        });
      }}
      initialValues={{}}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProForm.Item name="target_type" label="公告类型" rules={[{ required: true }]}>
        <Select
          style={{ width: 160 }}
          placeholder="请选择公告类型"
          onChange={(value) => setFormData({ target_type: value })}
        >
          <Option value="announce_system">系统公告</Option>
        </Select>
      </ProForm.Item>

      <ProFormText
        name="title"
        label="公告标题"
        placeholder="请输入公告的标题"
        rules={[{ required: true, type: 'string', max: 100 }]}
      />

      <ProFormTextArea
        name="content"
        label="公告内容"
        placeholder="请输入公告的内容"
        rules={[{ required: true, type: 'string' }]}
      />

      <ProFormText
        name="module_url"
        label="目标网址"
        placeholder="请输入目标网址"
        rules={[{ max: 255, type: 'url' }]}
      />

      <ProForm.Item name="is_force_push" label="强制推送">
        <Switch
          checked={checked}
          onChange={(checked) => {
            setChecked(checked);
            setFormData({ is_force_push: checked });
          }}
        />
      </ProForm.Item>
    </DrawerForm>
  );
};

export default SendMessage;
