import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Space } from 'antd';
import { list, remove } from '@/services/server/goods/service';
import { formatDate } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import FormPage from './components/FormPage';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Service.Detail>({});
  const [loding, setLoding] = useState<boolean>(true);

  const beforeCreated = () => {
    setDetail({});
    setFormVisible(true);
  };

  const beforeUpdated = (item: Service.Detail) => {
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

  const columns: ProColumns<Service.Detail>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      width: 100,
      search: false,
      align: 'center',
    },
    {
      title: '服务名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '描述',
      dataIndex: 'description',
      align: 'center',
      search: false,
      ellipsis: true,
      width: 480,
    },
    {
      title: '排序',
      dataIndex: 'sorting',
      align: 'center',
      search: false,
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'created_time[]',
      align: 'center',
      valueType: 'dateRange',
      search: false,
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
          <ProTable<Service.Detail>
            headerTitle="商品服务列表"
            actionRef={ref}
            rowKey="id"
            bordered
            request={(params, sort, filter) => list({ params, sort, filter })}
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
