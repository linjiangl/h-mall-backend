import React from 'react';
import { ProFormText } from '@ant-design/pro-form';
import FormNumber from '@/components/Tools/Form/number';

type ParamsProps = {};

const SkuDefault: React.FC<ParamsProps> = (props) => {
  const {} = props;

  return (
    <>
      <FormNumber
        name="sale_price"
        label="销售价"
        unit="元"
        help="商品没有相关优惠活动的实际卖价"
        rules={[{ required: true, min: 1 }]}
      />

      <FormNumber
        name="market_price"
        label="划线价"
        unit="元"
        help="商品没有优惠活动显示的划线价格，如果商品有折扣等优惠活动划线价显示销售价"
      />

      <FormNumber
        name="cost_price"
        label="成本价"
        unit="元"
        help="成本价将不会对前台会员展示，用于商家统计使用"
      />

      <FormNumber name="weight" label="重量" unit="kg" />

      <FormNumber name="volume" label="体积" unit="m³" />

      <ProFormText name="sku_no" label="商品编码" width="sm" placeholder="请输入商品编码" />

      <FormNumber name="stock" label="库存" unit="件" rules={[{ required: true }]} />

      <FormNumber
        name="stock_alarm"
        label="库存预警"
        unit="件"
        help="商品库存少于预警数量，商品列表库存数量标红显示，0为不预警。"
      />
    </>
  );
};

export default SkuDefault;
