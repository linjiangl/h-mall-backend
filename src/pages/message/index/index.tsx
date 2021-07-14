import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button } from 'antd';
import { announce } from '@/services/server/message';
import { PlusOutlined } from '@ant-design/icons';
import SendMessage from './components/SendMessage';
import UpdateContent from './components/UpdateContent';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [modelVisible, setModelVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Message.Text>({});

  const beforeCreated = () => {
    setFormVisible(true);
  };

  const columns: ProColumns<Message.Detail>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 150,
      search: false,
      align: 'center',
    },
    {
      title: '发送者',
      width: 150,
      align: 'center',
      render: () => <>系统</>,
    },
    {
      title: '接收者',
      width: 150,
      align: 'center',
      render: () => <>所有人</>,
    },
    {
      title: '类型',
      dataIndex: 'type_text',
      width: 150,
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
      title: '标题',
      ellipsis: true,
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            type="text"
            onClick={() => {
              setDetail(record.text as Message.Text);
              setModelVisible(true);
            }}
          >
            {record.text?.title}
          </Button>
        </>
      ),
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
      width: 240,
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Message.Detail>
        headerTitle="系统公告"
        actionRef={ref}
        rowKey="id"
        request={(params, sort, filter) => announce({ params, sort, filter })}
        columns={columns}
        toolBarRender={() => [
          <Button type="primary" key="created" onClick={beforeCreated}>
            <PlusOutlined /> 创建公告
          </Button>,
        ]}
      />
      {formVisible && (
        <SendMessage
          formVisible={formVisible}
          onCancel={(visible, reload) => {
            setFormVisible(visible);
            if (reload) {
              ref.current?.reload();
            }
          }}
        />
      )}

      {modelVisible && (
        <UpdateContent
          formVisible={modelVisible}
          detail={detail}
          onCancel={(visible, reload) => {
            setModelVisible(visible);
            if (reload) {
              ref.current?.reload();
            }
          }}
        />
      )}
    </PageContainer>
  );
};

export default ListTable;
