import React, { useState } from 'react';
import { message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { initializesObjectData } from '@/utils/utils';
import { update } from '@/services/server/user';
import ImageSingle from '@/components/Tools/Uploader/Image/Single';

type ParamsProps = {
  formVisible: boolean;
  detail: User.Detail;
  onCancel: (visible: boolean, reload: boolean) => void;
};

const defaultValues: User.Detail = { status: 1 };
const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { detail, formVisible, onCancel } = props;
  const [defaultDetail] = useState<User.Detail>(initializesObjectData(detail, defaultValues));

  const handleFormData = (formData: User.Detail) => {
    if (formData.id) {
      update(formData)
        .then(() => {
          message.success('修改成功');
          onCancel(false, true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title="编辑用户信息"
      onVisibleChange={(visible) => {
        onCancel(visible, false);
      }}
      onFinish={async (values) => {
        handleFormData({
          ...values,
          id: detail.id,
        });
      }}
      initialValues={defaultDetail}
      layout="horizontal"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
    >
      <ProFormText width="md" name="username" label="用户名" disabled />

      <ProFormText
        width="md"
        name="nickname"
        label="用户昵称"
        placeholder="请输入用户昵称"
        rules={[{ required: true, type: 'string', max: 30 }]}
      />

      <ProForm.Item name="avatar" label="头像" help="头像大小为128*128px">
        <ImageSingle crop={{ modalWidth: 720 }} />
      </ProForm.Item>

      <ProFormRadio.Group
        name="status"
        label="状态"
        rules={[{ required: true, type: 'enum', enum: [0, 1, 2] }]}
        options={[
          {
            label: '待审核',
            value: 0,
          },
          {
            label: '已审核',
            value: 1,
          },
          {
            label: '已禁用',
            value: 2,
          },
        ]}
      />
    </DrawerForm>
  );
};

export default FormPage;
