import React, { useState, useEffect } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { map } from 'lodash';
import { generateEditTableId } from '@/utils/utils';

type ParamsProps = {
  values: React.Key[];
  onChange: (values: React.Key[]) => void;
};

type DataSourceType = {
  id: React.Key;
  title?: React.Key;
};

const OptionValuesTable: React.FC<ParamsProps> = (props) => {
  const { values, onChange } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [newRecord, setNewRecord] = useState({
    id: generateEditTableId(),
  });

  useEffect(() => {
    const tmpDataSource: DataSourceType[] = [];
    values.forEach((item, index) => {
      tmpDataSource.push({
        id: index,
        title: item,
      });
    });
    setDataSource(tmpDataSource);
  }, [values]);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '属性值',
      dataIndex: 'title',
      align: 'center',
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (_, record) => [
        <a
          key="delete"
          onClick={() => {
            const tmp = dataSource.filter((item) => item.id !== record.id);
            setDataSource(tmp);
            onChange(map(tmp, 'title') as React.Key[]);
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<DataSourceType>
        rowKey="id"
        bordered
        headerTitle={false}
        maxLength={10}
        columns={columns}
        request={async () => ({
          data: dataSource,
          total: 3,
          success: true,
        })}
        value={dataSource}
        recordCreatorProps={{
          record: newRecord,
          creatorButtonText: '新增',
        }}
        onChange={(value) => {
          setDataSource(value);
          onChange(map(value, 'title') as React.Key[]);
        }}
        editable={{
          editableKeys,
          onSave: async () => {
            setNewRecord({
              id: generateEditTableId(),
            });
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default OptionValuesTable;
