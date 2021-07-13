import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { list, remove } from '@/services/server/goods/category';
import { formatDate } from '@/utils/utils';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();

  const handleRemove = (id: number) => {
    remove(id)
      .then(() => {
        message.success('删除成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  const columns: ProColumns<Category.Detail>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      copyable: true,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '启用', status: 'Success' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_time[]',
      align: 'center',
      valueType: 'dateRange',
      render: (_, row) => <>{formatDate(row.created_time || 0)}</>,
    },
    {
      title: '修改时间',
      dataIndex: 'updated_time',
      search: false,
      align: 'center',
      render: (_, row) => <>{formatDate(row.updated_time || 0)}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 180,
      render: (_, record) => (
        <>
          <ConfirmDelete
            onOk={() => {
              handleRemove(record.id as number);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Category.Detail>
        headerTitle="分类列表"
        actionRef={ref}
        rowKey="id"
        bordered
        request={(params, sort, filter) => list({ params, sort, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ListTable;
