import React from 'react';
import { message } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { updateText } from '@/services/server/message';

type ParamsProps = {
  formVisible: boolean;
  detail: Message.Text;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const UpdateContent: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { formVisible, detail, onCancel } = props;

  const handleUpdateContent = (formData: Message.Text) => {
    updateText(formData)
      .then(() => {
        message.success('修改成功');
        onCancel(false, true);
      })
      .catch(() => {});
  };

  return (
    <ModalForm
      form={form}
      visible={formVisible}
      title="编辑公告内容"
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        values.id = detail.id;
        handleUpdateContent(values);
      }}
      initialValues={detail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
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
    </ModalForm>
  );
};

export default UpdateContent;
