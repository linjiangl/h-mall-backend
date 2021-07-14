import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { remind } from '@/services/server/message';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();

  const columns: ProColumns<Message.Detail>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 120,
      search: false,
      align: 'center',
    },
    {
      title: '发送者',
      width: 120,
      align: 'center',
      render: () => <>系统</>,
    },
    {
      title: '接收者',
      width: 120,
      align: 'center',
      render: (_, record) => <>{record.to?.username}</>,
    },
    {
      title: '类型',
      dataIndex: 'type_text',
      width: 120,
      search: false,
      align: 'center',
    },
    {
      title: '目标类型',
      dataIndex: 'target_type_text',
      search: false,
      align: 'center',
      width: 240,
    },
    {
      title: '阅读状态',
      dataIndex: 'is_read',
      width: 120,
      search: false,
      align: 'center',
      valueEnum: {
        1: { text: '已读', status: 'Success' },
        2: { text: '未读', status: 'Processing' },
      },
    },
    {
      title: '内容',
      ellipsis: true,
      align: 'center',
      render: (_, record) => <>{record.text?.content}</>,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      hideInForm: true,
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      search: false,
      align: 'center',
      width: 160,
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Message.Detail>
        headerTitle="系统通知"
        actionRef={ref}
        rowKey="id"
        request={(params, sort, filter) => remind({ params, sort, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default ListTable;
