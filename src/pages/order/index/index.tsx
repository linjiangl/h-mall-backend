import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message } from 'antd';
import { paginate, remove } from '@/services/server/goods/category';

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
      width: 100,
      search: false,
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      search: false,
      align: 'center',
      width: 160,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 240,
      render: (_, record) => (
        <>
          <Button
            type="primary"
            danger
            onClick={() => {
              handleRemove(record.id as number);
            }}
          >
            删除
          </Button>
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
        request={(params, sort, filter) => paginate({ params, sort, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ListTable;
