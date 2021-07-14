import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, message, Space, Modal } from 'antd';
import { list, updateStatus, recycle } from '@/services/server/goods';
import { formatDate } from '@/utils/utils';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import BatchAction from '@/components/Tools/Table/Footer/BatchAction';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [selectedRowKeys, setSelectRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<Goods.Detail[]>([]);

  const onSelectChange = (keys: React.Key[]) => {
    setSelectRowKeys(keys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleRemove = (selectIds: number[]) => {
    recycle(selectIds)
      .then(() => {
        setSelectRowKeys([]);
        message.success('删除成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  const handleUpdateStatus = (id: number, status: Goods.GoodsStatus) => {
    updateStatus(id, status)
      .then(() => {
        message.success('修改成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  const handleAction = (id: number, e: any) => {
    switch (e.key) {
      case 'delete':
        Modal.confirm({
          title: '提示',
          content: '确定要删除该商品吗？',
          onOk: () => {
            handleRemove([id]);
          },
        });
        break;

      default:
        break;
    }
  };

  const columns: ProColumns<Goods.Detail>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: '商品信息',
      dataIndex: 'name',
      align: 'center',
      search: false,
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      hideInTable: true,
    },
    {
      title: '销售价格',
      dataIndex: 'sale_price',
      align: 'center',
      search: false,
      sorter: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      align: 'center',
      search: false,
      sorter: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      align: 'center',
      search: false,
      sorter: true,
    },
    {
      title: '商品类型',
      dataIndex: 'type',
      align: 'center',
      hideInTable: true,
      valueEnum: {
        general: { text: '实物商品' },
        virtual: { text: '虚拟商品' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      valueEnum: {
        0: { text: '仓库中', status: 'Error' },
        1: { text: '销售中', status: 'Success' },
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      width: 180,
      render: (_, record) => (
        <Space size={1}>
          <Link to={`/goods/index/edit?id=${record.id}`}>
            <Button type="primary">编辑</Button>
          </Link>

          {record.status === 0 ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatus(record.id as number, 1);
              }}
            >
              上架
            </Button>
          ) : (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatus(record.id as number, 0);
              }}
            >
              下架
            </Button>
          )}

          <Dropdown
            trigger={['click']}
            overlay={
              <Menu
                onClick={(e) => {
                  handleAction(record.id as number, e);
                }}
              >
                <Menu.Item key="history">浏览记录</Menu.Item>
                <Menu.Item key="delete">删除</Menu.Item>
              </Menu>
            }
          >
            <Button type="primary">
              更多 <DownOutlined />
            </Button>
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      <ProTable<Goods.Detail>
        headerTitle="商品列表"
        actionRef={ref}
        rowKey="id"
        bordered
        rowSelection={rowSelection}
        request={(params, sort, filter) => {
          return list({ params, sort, filter })
            .then((res) => {
              setDataSource(res.data);
              return Promise.resolve(res);
            })
            .catch(() => {});
        }}
        search={{ defaultCollapsed: false }}
        columns={columns}
        toolBarRender={() => [
          <Link to={'/goods/index/add'}>
            <Button type="primary" key="created">
              <PlusOutlined /> 添加商品
            </Button>
          </Link>,
        ]}
        footer={() => (
          <BatchAction
            tips="确定要批量删除商品吗？"
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
