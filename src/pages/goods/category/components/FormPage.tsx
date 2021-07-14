import React, { useEffect, useState } from 'react';
import { Form, Select, message } from 'antd';
import ProForm, { DrawerForm, ProFormText, ProFormRadio } from '@ant-design/pro-form';
import { initializesObjectData } from '@/utils/utils';
import { create, update, parent } from '@/services/server/goods/category';
import ImageSingle from '@/components/Tools/Uploader/Image/Single';
import FormSorting from '@/components/Tools/Form/sorting';

const { Option } = Select;

type ParamsProps = {
  formVisible: boolean;
  detail: Category.Detail;
  onCancel: (visible: boolean, reload?: boolean) => void;
};

const defaultValues: Category.Detail = {
  id: 0,
  parent_id: 0,
  sorting: 0,
  status: 1,
};

const FormPage: React.FC<ParamsProps> = (props) => {
  const [form] = ProForm.useForm();
  const { detail, formVisible, onCancel } = props;
  const [parentList, setParentList] = useState<Category.Detail[]>([]);
  const [defaultDetail] = useState<Category.Detail>(initializesObjectData(detail, defaultValues));

  const setFormData = (obj: Common.Object) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...obj,
    });
  };

  const handleCreateOrUpdate = (formData: Category.Detail) => {
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

  useEffect(() => {
    parent()
      .then((res) => {
        setParentList(res);
      })
      .catch(() => {});
  }, []);

  return (
    <DrawerForm
      form={form}
      visible={formVisible}
      title={`${detail.id ? '编辑' : '创建'}分类`}
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
      <Form.Item name="parent_id" label="选择分类" rules={[{ required: true, type: 'number' }]}>
        <Select
          style={{ width: 160 }}
          placeholder="请选择..."
          onChange={(value) => setFormData({ parent_id: value })}
        >
          <Option key={0} value={0}>
            顶级分类
          </Option>
          {parentList.map((item) => (
            <Option key={item.id} value={item.id as number}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <ProFormText
        width="md"
        name="name"
        label="分类名称"
        rules={[{ required: true, type: 'string', max: 100 }]}
        placeholder="请输入分类名称"
      />

      <Form.Item
        name="icon"
        label="图标"
        help="分类图标,大小为128*128px"
        wrapperCol={{ span: 15 }}
        rules={[{ type: 'string', max: 255 }]}
      >
        <ImageSingle />
      </Form.Item>

      <Form.Item
        name="cover"
        label="背景图"
        help="分类背景图,大小为240*320px"
        wrapperCol={{ span: 15 }}
        rules={[{ type: 'string', max: 255 }]}
      >
        <ImageSingle />
      </Form.Item>

      <FormSorting />

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
