import React, { useContext, useState } from 'react';
import { Form, Radio } from 'antd';
import { GoodsTimerStatus, GoodsStatus } from '@/services/goods';
import FormTimer from './timer';
import GoodsContext from '@/contexts/goods';

type ParamsProps = {};

const FormStatus: React.FC<ParamsProps> = (props) => {
  const {} = props;
  const goodsDetail: Goods.Detail = useContext(GoodsContext);
  const [statusVisible, setStatusVisible] = useState<boolean>(!goodsDetail.status);
  const [onTimerVisible, setOnTimerVisible] = useState<boolean>(!!goodsDetail.timer?.on);
  const [offTimerVisible, setOffTimerVisible] = useState<boolean>(!!goodsDetail.timer?.off);

  return (
    <>
      <Form.Item name="status" label="是否上架" rules={[{ required: true, type: 'number' }]}>
        <Radio.Group
          onChange={(e) => {
            if (e.target.value === GoodsStatus.ON_SALES) {
              setStatusVisible(false);
            } else {
              setStatusVisible(true);
            }
          }}
          options={[
            {
              label: '立即上架',
              value: GoodsStatus.ON_SALES,
            },
            {
              label: '放入仓库',
              value: GoodsStatus.OFF_SALES,
            },
          ]}
        />
      </Form.Item>

      {statusVisible && (
        <Form.Item
          name={['timer', 'on']}
          label="定时上架"
          help="启用定时上架后，到达设定时间，此商品将自动上架。"
        >
          <Radio.Group
            onChange={(e) => {
              setOnTimerVisible(e.target.value ? true : false);
            }}
            options={[
              {
                label: '启用',
                value: GoodsTimerStatus.ON,
              },
              {
                label: '不启用',
                value: GoodsTimerStatus.OFF,
              },
            ]}
          />
        </Form.Item>
      )}

      {statusVisible && onTimerVisible && <FormTimer name={['timer', 'extend', 'on_time']} />}

      <Form.Item
        name={['timer', 'off']}
        label="定时下架"
        help="启用定时下架后，到达设定时间，此商品将自动下架。"
      >
        <Radio.Group
          onChange={(e) => {
            setOffTimerVisible(e.target.value ? true : false);
          }}
          options={[
            {
              label: '启用',
              value: GoodsTimerStatus.ON,
            },
            {
              label: '不启用',
              value: GoodsTimerStatus.OFF,
            },
          ]}
        />
      </Form.Item>

      {offTimerVisible && <FormTimer name={['timer', 'extend', 'off_time']} />}
    </>
  );
};

export default FormStatus;
