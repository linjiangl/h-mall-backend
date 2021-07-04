import React from 'react';
import { Button, Space } from 'antd';
import { map } from 'lodash';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

type ParamsProps = {
  key?: string;
  tips?: string;
  data: object[];
  selectKeys: React.Key[];
  onSelectAll: (keys: React.Key[]) => void;
  onBatchRemove?: (keys: React.Key[]) => void;
};

const BatchRemove: React.FC<ParamsProps> = (props) => {
  const { key, tips, data, selectKeys, onSelectAll, onBatchRemove } = props;

  const handleSelectAll = () => {
    const tmpKeys = selectKeys.length ? [] : map(data, key);
    onSelectAll(tmpKeys as React.Key[]);
  };

  const handleRemove = () => {
    if (typeof onBatchRemove === 'function') {
      onSelectAll([]);
      onBatchRemove(selectKeys);
    }
  };

  return (
    <Space>
      <Button type="primary" onClick={handleSelectAll}>
        {selectKeys.length == data.length ? '取消' : '全部'}选择
      </Button>
      <ConfirmDelete
        isBatch={true}
        onOk={handleRemove}
        disabled={selectKeys.length ? false : true}
        tips={tips}
      />
    </Space>
  );
};

BatchRemove.defaultProps = {
  key: 'id',
};

export default BatchRemove;
