import React from 'react';
import { Input, message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { MobileOutlined, UserOutlined } from '@ant-design/icons';
import { getPattern } from '@/utils/pattern';
import { update } from '@/services/server/admin';
import ImageSingle from '@/components/Tools/Uploader/Image/Single';

type ParamsProps = {
  formVisible: boolean;
  detail: Admin.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { formVisible, detail, onCancel } = props;

  const handleCreateOrUpdate = (formData: Role.Admin) => {
    if (formData.id) {
      update(formData)
        .then(() => {
          message.success('修改成功');
          onCancel(false, true);
        })
        .catch(() => {});
    }
  };

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title="修改管理员信息"
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        values.id = detail.id;
        handleCreateOrUpdate(values);
      }}
      initialValues={detail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProFormText width="md" name="username" label="用户名" disabled />

      <ProForm.Item name="avatar" label="头像" help="头像大小为128*128px" wrapperCol={{ span: 15 }}>
        <ImageSingle crop={{ modalWidth: 720 }} />
      </ProForm.Item>

      <ProForm.Item
        name="real_name"
        label="姓名"
        rules={[{ required: true, type: 'string', max: 20 }]}
      >
        <Input placeholder="请输入姓名" prefix={<UserOutlined />} />
      </ProForm.Item>

      <ProForm.Item
        name="mobile"
        label="手机号码"
        rules={[{ required: true, pattern: getPattern('mobile'), message: '请输入正确的手机号码' }]}
      >
        <Input placeholder="请输入手机号码" prefix={<MobileOutlined />} />
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
