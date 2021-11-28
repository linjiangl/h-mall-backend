import React, { useRef, useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, message, Space } from 'antd';
import { Link } from 'umi';
import { paginate, remove } from '@/services/server/goods/parameter';
import { formatDate } from '@/utils/utils';
import { PlusOutlined } from '@ant-design/icons';
import FromPage from './components/ParameterForm';
import ConfirmDelete from '@/components/Tools/Modal/confirm/delete';
import Tips from '@/components/Tools/Table/Tips';

const ListTable: React.FC = () => {
  const ref = useRef<ActionType>();
  const [formVisible, setFormVisible] = useState<boolean>(false);
  const [detail, setDetail] = useState<Parameter.Detail>({});
  const [loding, setLoding] = useState<boolean>(true);
  const [tipsMessages] = useState<string[]>([
    '属性模板用在商品添加编辑中',
    '商品属性，例如蔬菜、水果、数码等',
  ]);

  const beforeCreated = () => {
    setDetail({});
    setFormVisible(true);
  };

  const beforeUpdated = (item: Parameter.Detail) => {
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

  const columns: ProColumns<Parameter.Detail>[] = [
    {
      title: '主键',
      dataIndex: 'id',
      search: false,
      align: 'center',
    },
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '创建时间',
      dataIndex: 'created_time',
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
          <Link to={`/goods/parameter/options?parameter_id=${record.id}`}>
            <Button type="primary">设置</Button>
          </Link>

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
          <Tips list={tipsMessages} />
          <ProTable<Parameter.Detail>
            headerTitle="模版列表"
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
            <FromPage
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
