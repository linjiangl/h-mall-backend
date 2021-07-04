import React from 'react';
import { Modal, Form, Input, message } from 'antd';

type ActionProps = {
  visible: boolean;
  title?: string;
  label?: string;
  onResult?: (remark: string) => void;
  onCancel: (visible: boolean) => void;
};

const ModalConfirm: React.FC<ActionProps> = (props) => {
  const { visible, title, label, onResult, onCancel } = props;
  const [form] = Form.useForm();

  const handleOk = () => {
    const formData = form.getFieldsValue();
    if (!formData.remark) {
      message.error(label);
      return;
    }
    if (typeof onResult === 'function') {
      onResult(formData.remark);
    }
  };

  const handleCancel = () => {
    form.setFieldsValue({
      remark: '',
    });
    onCancel(false);
  };

  return (
    <>
      <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical">
          <Form.Item name="remark" label={label}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

ModalConfirm.defaultProps = {
  title: '确定要执行该操作吗?',
  label: '请输入备注信息',
};

export default ModalConfirm;
