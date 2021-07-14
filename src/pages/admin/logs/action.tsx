import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { message, Alert, Button } from 'antd';
import { list, remove, LogType } from '@/services/server/admin/logs';
import { formatDate } from '@/utils/utils';
import BatchAction from '@/components/Tools/Table/Footer/BatchAction';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';
import JsonView from '@/components/Tools/Drawer/JsonView';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [selectedRowKeys, setSelectRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Admin.Action[]>([]);
  const [remark, setRemark] = useState<Admin.ActionRequest>({
    method: 'POST',
    url: '',
    data: {},
  });
  const [jsonVisible, setJsonVisible] = useState<boolean>(false);

  const handleRemove = (selectIds: number[]) => {
    remove(selectIds, LogType.Action)
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

  const columns: ProColumns<Admin.Action>[] = [
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
      title: '操作',
      dataIndex: 'action',
      search: false,
      align: 'center',
    },
    {
      title: 'IP',
      dataIndex: 'client_ip',
      search: false,
      align: 'center',
    },
    {
      title: '备注',
      align: 'center',
      render: (_, row) => (
        <Alert
          message={row.remark ? `${row.remark.method}  ${row.remark.url}` : ''}
          type="info"
          style={{ textAlign: 'left' }}
          action={
            <Button
              size="small"
              type="primary"
              onClick={() => {
                if (row.remark) {
                  setRemark(row.remark);
                }
                setJsonVisible(true);
              }}
            >
              请求参数
            </Button>
          }
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
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
      <ProTable<Admin.Action>
        headerTitle="操作日志"
        actionRef={ref}
        rowKey="id"
        bordered
        rowSelection={rowSelection}
        request={(params, sort, filter) => {
          return list({ params, sort, filter }, LogType.Action)
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
      <JsonView
        json={remark.data}
        title="操作日志"
        remark={`${remark.method}  ${remark.url}`}
        visible={jsonVisible}
        onCancel={setJsonVisible}
      />
    </PageContainer>
  );
};

export default ListTable;
