import React, { useState, useEffect } from 'react';
import ProCard from '@ant-design/pro-card';

const TypeStyle: React.CSSProperties = {
  cursor: 'pointer',
};

const TypeActiveStyle: React.CSSProperties = {
  ...TypeStyle,
  borderColor: '#1890ff',
};

const TypeHeadStyle: React.CSSProperties = {
  alignItems: 'center',
  justifyContent: 'center',
};

const TypeHeadActiveStyle: React.CSSProperties = {
  ...TypeHeadStyle,
  color: '#1890ff',
};

const TypeBodyStyle: React.CSSProperties = {
  color: '#999',
};

type ParamsProps = {
  type?: Goods.GoodsType;
  onChange?: (type: Goods.GoodsType) => void;
};

const FormType: React.FC<ParamsProps> = (props) => {
  const { type, onChange } = props;

  const [goodsType, setGoodsType] = useState<Goods.GoodsType>(type || 'general');
  const [generalStyle, setGeneralStyle] = useState<React.CSSProperties>(TypeStyle);
  const [generalHeaderStyle, setGeneralHeaderStyle] = useState<React.CSSProperties>(TypeHeadStyle);
  const [virtualStyle, setVirtualStyle] = useState<React.CSSProperties>(TypeStyle);
  const [virtualHeaderStyle, setVirtualHeaderStyle] = useState<React.CSSProperties>(TypeHeadStyle);

  const handleType = (pType: Goods.GoodsType) => {
    setGoodsType(pType);

    if (typeof onChange === 'function') {
      onChange(pType);
    }
  };

  useEffect(() => {
    if (goodsType === 'general') {
      setGeneralStyle(TypeActiveStyle);
      setGeneralHeaderStyle(TypeHeadActiveStyle);
      setVirtualStyle(TypeStyle);
      setVirtualHeaderStyle(TypeHeadStyle);
    } else {
      setGeneralStyle(TypeStyle);
      setGeneralHeaderStyle(TypeHeadStyle);
      setVirtualStyle(TypeActiveStyle);
      setVirtualHeaderStyle(TypeHeadActiveStyle);
    }
  }, [goodsType]);

  return (
    <ProCard size="small" gutter={8} title={false}>
      <ProCard
        title="实物商品"
        colSpan={2}
        bordered
        layout="center"
        style={generalStyle}
        headStyle={generalHeaderStyle}
        bodyStyle={TypeBodyStyle}
        onClick={() => {
          if (goodsType === 'general') {
            return;
          }
          handleType('general');
        }}
      >
        （需要物流）
      </ProCard>
      <ProCard
        title="虚拟商品"
        colSpan={2}
        bordered
        layout="center"
        style={virtualStyle}
        headStyle={virtualHeaderStyle}
        bodyStyle={TypeBodyStyle}
        onClick={() => {
          if (goodsType === 'virtual') {
            return;
          }
          handleType('virtual');
        }}
      >
        （无需物流）
      </ProCard>
    </ProCard>
  );
};

export default FormType;
