import React from 'react';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import ImageNultiple from '@/components/Tools/Uploader/Image/Multiple';
import FormCategory from '../common/category';

type ParamsProps = {};

const FormBase: React.FC<ParamsProps> = (props) => {
  const {} = props;

  return (
    <>
      <ProForm.Item
        name="category_ids"
        label="商品分类"
        rules={[{ required: true, type: 'array' }]}
      >
        <FormCategory />
      </ProForm.Item>

      <ProFormText
        name="name"
        label="商品名称"
        placeholder="请输入商品名称，不能超过100个字符"
        width="xl"
        rules={[{ required: true, type: 'string', max: 100 }]}
      />

      <ProFormTextArea
        name="introduction"
        label="商品介绍"
        placeholder="请输入商品介绍，不能超过255个字符"
        width="xl"
      />

      <ProForm.Item
        name="images"
        label="商品主图"
        help="第一张图片将作为商品主图，支持同时上传多张图片，多张图片之间可随意调整位置；支持jpg、gif、png格式上传或从图片空间中选择，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片，上传后的图片将会自动保存在图片空间的默认分类中，最多上传10张（至少1张）"
        rules={[{ required: true, type: 'string', max: 255 }]}
      >
        <ImageNultiple max={2} />
      </ProForm.Item>

      <ProFormText
        name="keywords"
        label="关键词"
        placeholder="商品关键词用于SEO搜索，不能超过100个字符"
        width="xl"
        rules={[{ type: 'string', max: 100 }]}
      />
    </>
  );
};

export default FormBase;
