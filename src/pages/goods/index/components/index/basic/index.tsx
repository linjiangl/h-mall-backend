import React, { useState } from 'react';
import { Collapse, Divider } from 'antd';
import FormType from './common/type';
import GeneralBase from './general/base';
import GeneralSku from './general/sku';
import GeneralConfig from './general/config';
import VirtualBase from './virtual/base';
import VirtualSku from './virtual/sku';
import VirtualConfig from './virtual/config';
import styles from './index.less';

const { Panel } = Collapse;

enum CollapseType {
  type = 'type',
  base = 'base',
  sku = 'sku',
  config = 'config',
}

type ParamsProps = {
  type: Goods.GoodsType;
  onChange: (type: Goods.GoodsType) => void;
};

const FormBasic: React.FC<ParamsProps> = (props) => {
  const { type, onChange } = props;
  const [goodsType, setGoodsType] = useState<Goods.GoodsType>(type);

  const handleFormComponent = (collapseType: CollapseType): any => {
    let component = <></>;
    switch (goodsType) {
      case 'general':
        switch (collapseType) {
          case CollapseType.base:
            component = <GeneralBase />;
            break;
          case CollapseType.sku:
            component = <GeneralSku />;
            break;
          case CollapseType.config:
            component = <GeneralConfig />;
            break;
        }
        break;
      case 'virtual':
        switch (collapseType) {
          case CollapseType.base:
            component = <VirtualBase />;
            break;
          case CollapseType.sku:
            component = <VirtualSku />;
            break;
          case CollapseType.config:
            component = <VirtualConfig />;
            break;
        }
        break;
    }

    return component;
  };

  return (
    <Collapse
      defaultActiveKey={[
        CollapseType.type,
        CollapseType.base,
        CollapseType.sku,
        CollapseType.config,
      ]}
      ghost
      className={styles.goodsCollapseContent}
    >
      <Panel header="商品类型" key={CollapseType.type}>
        <Divider className={styles.goodsBasicDivider} />
        <FormType
          type={goodsType}
          onChange={(changeType) => {
            setGoodsType(changeType);
            onChange(changeType);
          }}
        />
      </Panel>

      <Panel header="基础信息" key={CollapseType.base}>
        <Divider className={styles.goodsBasicDivider} />
        {handleFormComponent(CollapseType.base)}
      </Panel>
      <Panel header="价格库存" key={CollapseType.sku}>
        <Divider className={styles.goodsBasicDivider} />
        {handleFormComponent(CollapseType.sku)}
      </Panel>
      <Panel header="购买规则" key={CollapseType.config}>
        <Divider className={styles.goodsBasicDivider} />
        {handleFormComponent(CollapseType.config)}
      </Panel>
    </Collapse>
  );
};

export default FormBasic;
