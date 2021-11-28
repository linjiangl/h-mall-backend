import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Avatar } from 'antd';
import { paginate } from '@/services/server/user';
import { formatDate } from '@/utils/utils';
import { bcadd } from '@/utils/math';
import DefaultAvatar from '@/assets/default/avatar.png';
import FormPage from './components/FormPage';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<User.Detail>({});

  const beforeUpdated = (item: User.Detail) => {
    setDetail(item);
    setFormVisible(true);
  };

  const columns: ProColumns<User.Detail>[] = [
    {
      title: '序号',
      dataIndex: 'id',
      width: 100,
      sorter: true,
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      search: false,
      width: 100,
      align: 'center',
      render: (_, row) => (
        <Avatar src={row.avatar ? row.avatar : DefaultAvatar} size="large" shape="square" />
      ),
    },
    {
      title: '用户名',
      dataIndex: 'username',
      copyable: true,
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      search: false,
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      align: 'center',
      search: false,
      valueEnum: {
        '0': { text: '待审核', status: 'Processing' },
        '1': { text: '已审核', status: 'Success' },
        '2': { text: '已禁用', status: 'Error' },
      },
    },
    {
      title: '账户金额',
      align: 'center',
      width: 160,
      search: false,
      render: (_, row) => (
        <>￥{row.wallet ? bcadd(row.wallet.balance, row.wallet.freeze_balance, 2) : 0}</>
      ),
    },
    {
      title: '账户积分',
      align: 'center',
      width: 160,
      search: false,
      render: (_, row) => (
        <>{row.wallet ? bcadd(row.wallet.integral, row.wallet.freeze_integral) : 0}</>
      ),
    },
    {
      title: '最后登录时间',
      dataIndex: 'lasted_login_time',
      align: 'center',
      width: 160,
      search: false,
      sorter: true,
      render: (_, row) => <>{formatDate(row.lasted_login_time || 0)}</>,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
      align: 'center',
      valueType: 'dateRange',
      width: 160,
      render: (_, row) => <>{formatDate(row.created_time || 0)}</>,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 120,
      align: 'center',
      render: (_, row) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              beforeUpdated(row);
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
      <ProTable<User.Detail>
        headerTitle="用户列表"
        actionRef={ref}
        rowKey="id"
        request={(params, sort, filter) => paginate({ params, sort, filter })}
        columns={columns}
        bordered
      />
      {formVisible && (
        <FormPage
          onCancel={(visible, reload) => {
            setFormVisible(visible);
            if (reload) {
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
