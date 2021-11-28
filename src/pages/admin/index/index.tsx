import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType, ColumnsState } from '@ant-design/pro-table';
import { Button, Avatar } from 'antd';
import { formatDate } from '@/utils/utils';
import { paginate } from '@/services/server/admin';
import DefaultAvatar from '@/assets/default/avatar.png';
import FormPage from './components/FormPage';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Admin.Detail>({});
  const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({
    username: {
      show: false,
    },
  });

  const beforeUpdated = (item: Admin.Detail) => {
    setDetail(item);
    setFormVisible(true);
  };

  const columns: ProColumns<Admin.Detail>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 100,
      search: false,
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      search: false,
      width: 120,
      align: 'center',
      render: (_, row) => <Avatar src={row.avatar ? row.avatar : DefaultAvatar} size="large" />,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 120,
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'real_name',
      align: 'center',
    },
    {
      title: '手机号码',
      dataIndex: 'mobile',
      align: 'center',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: { text: '禁用', status: 'Error' },
        1: { text: '正常', status: 'Success' },
      },
      align: 'center',
    },
    {
      title: '最后登录时间',
      align: 'center',
      render: (_, row) => <>{formatDate(row.lasted_login_time || 0)}</>,
    },
    {
      title: '创建时间',
      align: 'center',
      render: (_, row) => <>{formatDate(row.created_time || 0)}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              beforeUpdated(record);
            }}
          >
            编辑
          </Button>
        </>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Role.Admin>
        headerTitle="管理员列表"
        actionRef={ref}
        rowKey="id"
        bordered
        request={(params, sort, filter) => paginate({ params, sort, filter })}
        columns={columns}
        columnsStateMap={columnsStateMap}
        onColumnsStateChange={(map) => setColumnsStateMap(map)}
      />
      {formVisible && (
        <FormPage
          onCancel={(visible, relaod) => {
            setFormVisible(visible);
            if (relaod) {
              ref.current?.reload();
            }
          }}
          formVisible={formVisible}
          detail={detail}
        />
      )}
    </PageContainer>
  );
};

export default ListTable;
