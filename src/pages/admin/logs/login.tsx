import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { message } from 'antd';
import { list, remove, LogType } from '@/services/server/admin/logs';
import { formatDate } from '@/utils/utils';
import BatchAction from '@/components/Tools/Table/Footer/BatchAction';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [selectedRowKeys, setSelectRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Admin.Login[]>([]);

  const handleRemove = (selectIds: number[]) => {
    remove(selectIds, LogType.Login)
      .then(() => {
        setSelectRowKeys([]);
        message.success('删除成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  const onSelectChange = (keys: React.Key[]) => {
    setSelectRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns: ProColumns<Admin.Login>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: '操作员',
      dataIndex: 'username',
      align: 'center',
    },
    {
      title: 'IP',
      dataIndex: 'client_ip',
      search: false,
      align: 'center',
    },
    {
      title: '客户端',
      dataIndex: 'user_agent',
      search: false,
      align: 'center',
    },
    {
      title: '登录时间',
      dataIndex: 'created_time[]',
      align: 'center',
      valueType: 'dateRange',
      render: (_, row) => <>{formatDate(row.created_time || 0)}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <ConfirmDelete
            onOk={() => {
              handleRemove([record.id as number]);
            }}
          />
        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Admin.Login>
        headerTitle="登录日志"
        actionRef={ref}
        rowKey="id"
        bordered
        rowSelection={rowSelection}
        request={(params, sort, filter) => {
          return list({ params, sort, filter }, LogType.Login)
            .then((res) => {
              setDataSource(res.data);
              return Promise.resolve(res);
            })
            .catch(() => {});
        }}
        columns={columns}
        footer={() => (
          <BatchAction
            data={dataSource}
            selectKeys={selectedRowKeys}
            onSelectAll={(keys) => setSelectRowKeys(keys)}
            onBatchRemove={(keys) => handleRemove(keys as number[])}
          />
        )}
      />
    </PageContainer>
  );
};

export default ListTable;
