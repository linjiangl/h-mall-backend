import React, { useState } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import { Slider } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { create, update, remove, listBySpecId } from '@/services/server/goods/SpecValues';
import { generateEditTableId } from '@/utils/utils';

type ParamsProps = {
  specId: number;
  values: Spec.Value[];
};

const defaultNewRecord: Spec.Value = {
  id: generateEditTableId(),
  spec_id: 0,
  value: '',
  sorting: 0,
};

const OptionValuesTable: React.FC<ParamsProps> = (props) => {
  const { specId, values } = props;
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Spec.Value[]>(values);
  const [newRecord, setNewRecord] = useState<Spec.Value>({
    ...defaultNewRecord,
    spec_id: specId,
  });

  const columns: ProColumns<Spec.Value>[] = [
    {
      title: '规格值',
      dataIndex: 'value',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sorting',
      align: 'center',
      width: 120,
      renderFormItem: (_, { isEditable }) => {
        return isEditable && <Slider min={0} max={100} />;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      width: 200,
      render: (dom, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id as number);
          }}
        >
          编辑
        </a>,
        <a
          key="delete"
          onClick={() => {
            if (record.id && record.id > 0) {
              remove(record.id)
                .then(() => {
                  setDataSource(dataSource.filter((item) => item.id !== record.id));
                })
                .catch(() => {});
            }
          }}
        >
          删除
        </a>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<Spec.Value>
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
          creatorButtonText: '新增规格值',
        }}
        onChange={() => {
          listBySpecId(specId)
            .then(setDataSource)
            .catch(() => {});
        }}
        editable={{
          editableKeys,
          onSave: async (_, row) => {
            setNewRecord({
              ...defaultNewRecord,
              spec_id: specId,
            });
            if ((row.id as number) > 0) {
              update(row).catch(() => {});
            } else {
              create(row).catch(() => {});
            }
          },
          onChange: setEditableRowKeys,
        }}
      />
    </>
  );
};

export default OptionValuesTable;
