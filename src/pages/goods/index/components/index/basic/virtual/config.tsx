import React from 'react';
import { ProFormText, ProFormRadio } from '@ant-design/pro-form';
import FormNumber from '@/components/Tools/Form/number';
import FormStatus from '../common/status';

type ParamsProps = {
  //
};

const FormConfig: React.FC<ParamsProps> = () => {

  return (
    <>
      <ProFormRadio.Group
        name="recommend_way"
        label="推荐方式"
        options={[
          {
            label: '无',
            value: 0,
          },
          {
            label: '新品',
            value: 1,
          },
          {
            label: '精品',
            value: 2,
          },
          {
            label: '推荐',
            value: 3,
          },
        ]}
      />

      <FormNumber name="virtual_stock" label="虚拟销量" unit="件" help="该设置不计入商品统计数据" />

      <FormNumber name="max_buy" label="限购件数" unit="件" help="该限购为终身限购，0为不限购" />

      <FormNumber
        name="max_buy"
        label="起售件数"
        unit="件"
        help="起售数量超出商品库存时，买家无法购买该商品"
      />

      <ProFormText name="unit" label="单位" width="xs" />

      <FormStatus />

      <ProFormRadio.Group
        name="is_consume_discount"
        label="是否参与会员等级折扣"
        help="按照默认会员等级折扣优惠"
        options={[
          {
            label: '不参与',
            value: 0,
          },
          {
            label: '参与',
            value: 1,
          },
        ]}
      />
    </>
  );
};

export default FormConfig;
