import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Space } from 'antd';
import { paginate, remove } from '@/services/server/goods/brand';
import { formatDate } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import FormPage from './components/FormPage';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Brand.Detail>({});
  const [loding, setLoding] = useState<boolean>(true);

  const beforeCreated = () => {
    setDetail({});
    setFormVisible(true);
  };

  const beforeUpdated = (item: Brand.Detail) => {
    setDetail(item);
    setFormVisible(true);
  };

  const handleRemove = (id: number) => {
    remove(id)
      .then(() => {
        message.success('删除成功');
        ref.current?.reload();
      })
      .catch(() => {});
  };

  useEffect(() => {
    setLoding(false);
  }, []);

  const columns: ProColumns<Brand.Detail>[] = [
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
      width: 240,
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              beforeUpdated(record);
            }}
          >
            编辑
          </Button>
          <ConfirmDelete
            onOk={() => {
              handleRemove(record.id as number);
            }}
          />
        </Space>
      ),
    },
  ];

  return (
    <PageContainer title={false}>
      {!loding && (
        <>
          <ProTable<Brand.Detail>
            headerTitle="品牌列表"
            actionRef={ref}
            rowKey="id"
            bordered
            request={(params, sort, filter) => paginate({ params, sort, filter })}
            columns={columns}
            toolBarRender={() => [
              <Button type="primary" key="created" onClick={beforeCreated}>
                <PlusOutlined /> 新建
              </Button>,
            ]}
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
        </>
      )}
    </PageContainer>
  );
};

export default ListTable;
